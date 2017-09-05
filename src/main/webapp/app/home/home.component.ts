import {Component, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Account, LoginModalService, Principal} from '../shared';
import {Product} from '../entities/product/product.model';
import {ProductService} from '../entities/product/product.service';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';
import {ITEMS_PER_PAGE} from '../shared/constants/pagination.constants';
import {ProductTypeService} from '../entities/product-type/product-type.service';
import {ProductType} from '../entities/product-type/product-type.model';

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
    productTypes: ProductType[] = [];
    itemsPerPage = ITEMS_PER_PAGE;
    links = {
        last: 0
    };
    page = 0;
    totalItems: number;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private productService: ProductService,
        private productTypeService: ProductTypeService,
        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAllProductTypes();
        this.loadAllProducts();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    loadPage(page) {
        this.page = page;
        this.loadAllProducts();
    }

    trackId(index: number, item: Product) {
        return item.id;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    loadAllProductTypes() {
        this.productTypeService.query({
            page: 0,
            size: 999}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, this.productTypes),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadAllProducts() {
        this.productService.query({
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, this.products),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data, headers, array) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        array.push(...data);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
