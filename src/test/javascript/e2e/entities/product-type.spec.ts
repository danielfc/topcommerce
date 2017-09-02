import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('ProductType e2e test', () => {

    let navBarPage: NavBarPage;
    let productTypeDialogPage: ProductTypeDialogPage;
    let productTypeComponentsPage: ProductTypeComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductTypes', () => {
        navBarPage.goToEntity('product-type');
        productTypeComponentsPage = new ProductTypeComponentsPage();
        expect(productTypeComponentsPage.getTitle()).toMatch(/Product Types/);

    });

    it('should load create ProductType dialog', () => {
        productTypeComponentsPage.clickOnCreateButton();
        productTypeDialogPage = new ProductTypeDialogPage();
        expect(productTypeDialogPage.getModalTitle()).toMatch(/Create or edit a Product Type/);
        productTypeDialogPage.close();
    });

    it('should create and save ProductTypes', () => {
        productTypeComponentsPage.clickOnCreateButton();
        productTypeDialogPage.setNameInput('name');
        expect(productTypeDialogPage.getNameInput()).toMatch('name');
        productTypeDialogPage.save();
        expect(productTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-type div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProductTypeDialogPage {
    modalTitle = element(by.css('h4#myProductTypeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
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
