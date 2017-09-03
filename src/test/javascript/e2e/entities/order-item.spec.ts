import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';


describe('OrderItem e2e test', () => {

    let navBarPage: NavBarPage;
    let orderItemDialogPage: OrderItemDialogPage;
    let orderItemComponentsPage: OrderItemComponentsPage;


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderItems', () => {
        navBarPage.goToEntity('order-item');
        orderItemComponentsPage = new OrderItemComponentsPage();
        expect(orderItemComponentsPage.getTitle()).toMatch(/Order Items/);

    });

    it('should load create OrderItem dialog', () => {
        orderItemComponentsPage.clickOnCreateButton();
        orderItemDialogPage = new OrderItemDialogPage();
        expect(orderItemDialogPage.getModalTitle()).toMatch(/Create or edit a Order Item/);
        orderItemDialogPage.close();
    });

    it('should create and save OrderItems', () => {
        orderItemComponentsPage.clickOnCreateButton();
        orderItemDialogPage.orderSelectLastOption();
        orderItemDialogPage.productSelectLastOption();
        orderItemDialogPage.save();
        expect(orderItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrderItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-order-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class OrderItemDialogPage {
    modalTitle = element(by.css('h4#myOrderItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    orderSelect = element(by.css('select#field_order'));
    productSelect = element(by.css('select#field_product'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    orderSelectLastOption = function () {
        this.orderSelect.all(by.tagName('option')).last().click();
    }

    orderSelectOption = function (option) {
        this.orderSelect.sendKeys(option);
    }

    getOrderSelect = function () {
        return this.orderSelect;
    }

    getOrderSelectedOption = function () {
        return this.orderSelect.element(by.css('option:checked')).getText();
    }

    productSelectLastOption = function () {
        this.productSelect.all(by.tagName('option')).last().click();
    }

    productSelectOption = function (option) {
        this.productSelect.sendKeys(option);
    }

    getProductSelect = function () {
        return this.productSelect;
    }

    getProductSelectedOption = function () {
        return this.productSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
