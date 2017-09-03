import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderItem } from './order-item.model';
import { OrderItemPopupService } from './order-item-popup.service';
import { OrderItemService } from './order-item.service';
import { Order, OrderService } from '../order';
import { Product, ProductService } from '../product';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-order-item-dialog',
    templateUrl: './order-item-dialog.component.html'
})
export class OrderItemDialogComponent implements OnInit {

    orderItem: OrderItem;
    isSaving: boolean;

    orders: Order[];

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private orderItemService: OrderItemService,
        private orderService: OrderService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.orderService.query()
            .subscribe((res: ResponseWrapper) => { this.orders = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderItemService.update(this.orderItem));
        } else {
            this.subscribeToSaveResponse(
                this.orderItemService.create(this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrderItem>) {
        result.subscribe((res: OrderItem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: OrderItem) {
        this.eventManager.broadcast({ name: 'orderItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackOrderById(index: number, item: Order) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-item-popup',
    template: ''
})
export class OrderItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderItemPopupService
                    .open(OrderItemDialogComponent as Component, params['id']);
            } else {
                this.orderItemPopupService
                    .open(OrderItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
