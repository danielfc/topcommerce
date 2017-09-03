import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {Product} from '../entities/product/product.model';
import {ProductService} from '../entities/product/product.service';
import {Observable} from 'rxjs/Observable';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';
import {createRequestOption} from '../shared/model/request-util';
import {ITEMS_PER_PAGE} from '../shared/constants/pagination.constants';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    products: Product[] = [];
    itemsPerPage = ITEMS_PER_PAGE;
    links: any;
    page = 0;
    totalItems: number;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private productService: ProductService,
        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAll();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    loadAll() {
        this.productService.query({
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.products.push(data[i]);
        }
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
