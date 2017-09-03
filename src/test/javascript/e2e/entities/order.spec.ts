import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Order e2e test', () => {

    let navBarPage: NavBarPage;
    let orderDialogPage: OrderDialogPage;
    let orderComponentsPage: OrderComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Orders', () => {
        navBarPage.goToEntity('order');
        orderComponentsPage = new OrderComponentsPage();
        expect(orderComponentsPage.getTitle()).toMatch(/Orders/);

    });

    it('should load create Order dialog', () => {
        orderComponentsPage.clickOnCreateButton();
        orderDialogPage = new OrderDialogPage();
        expect(orderDialogPage.getModalTitle()).toMatch(/Create or edit a Order/);
        orderDialogPage.close();
    });

    it('should create and save Orders', () => {
        orderComponentsPage.clickOnCreateButton();
        orderDialogPage.statusSelectLastOption();
        orderDialogPage.setCreatedAtInput(12310020012301);
        expect(orderDialogPage.getCreatedAtInput()).toMatch('2001-12-31T02:30');
        orderDialogPage.userSelectLastOption();
        orderDialogPage.save();
        expect(orderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-order div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class OrderDialogPage {
    modalTitle = element(by.css('h4#myOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    statusSelect = element(by.css('select#field_status'));
    createdAtInput = element(by.css('input#field_createdAt'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setStatusSelect = function (status) {
        this.statusSelect.sendKeys(status);
    }

    getStatusSelect = function () {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption = function () {
        this.statusSelect.all(by.tagName('option')).last().click();
    }
    setCreatedAtInput = function (createdAt) {
        this.createdAtInput.sendKeys(createdAt);
    }

    getCreatedAtInput = function () {
        return this.createdAtInput.getAttribute('value');
    }

    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function () {
        return this.userSelect;
    }

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
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
