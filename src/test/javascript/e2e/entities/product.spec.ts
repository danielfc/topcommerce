import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle()).toMatch(/Products/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle()).toMatch(/Create or edit a Product/);
        productDialogPage.close();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setNameInput('name');
        expect(productDialogPage.getNameInput()).toMatch('name');
        productDialogPage.setDescriptionInput('description');
        expect(productDialogPage.getDescriptionInput()).toMatch('description');
        productDialogPage.setPriceInput('5');
        expect(productDialogPage.getPriceInput()).toMatch('5');
        productDialogPage.setCreatedAtInput(12310020012301);
        expect(productDialogPage.getCreatedAtInput()).toMatch('2001-12-31T02:30');
        productDialogPage.setImagePathInput('imagePath');
        expect(productDialogPage.getImagePathInput()).toMatch('imagePath');
        productDialogPage.typeSelectLastOption();
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    priceInput = element(by.css('input#field_price'));
    createdAtInput = element(by.css('input#field_createdAt'));
    imagePathInput = element(by.css('input#field_imagePath'));
    typeSelect = element(by.css('select#field_type'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setPriceInput = function (price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function () {
        return this.priceInput.getAttribute('value');
    }

    setCreatedAtInput = function (createdAt) {
        this.createdAtInput.sendKeys(createdAt);
    }

    getCreatedAtInput = function () {
        return this.createdAtInput.getAttribute('value');
    }

    setImagePathInput = function (imagePath) {
        this.imagePathInput.sendKeys(imagePath);
    }

    getImagePathInput = function () {
        return this.imagePathInput.getAttribute('value');
    }

    typeSelectLastOption = function () {
        this.typeSelect.all(by.tagName('option')).last().click();
    }

    typeSelectOption = function (option) {
        this.typeSelect.sendKeys(option);
    }

    getTypeSelect = function () {
        return this.typeSelect;
    }

    getTypeSelectedOption = function () {
        return this.typeSelect.element(by.css('option:checked')).getText();
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
