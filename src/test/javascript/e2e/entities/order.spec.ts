import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Order e2e test', () => {

    let navBarPage: NavBarPage;
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

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrderComponentsPage {
    title = element.all(by.css('jhi-order div h2 span')).first();

    getTitle() {
        return this.title.getText();
    }
}

export class OrderDialogPage {
    modalTitle = element(by.css('h4#myOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setStatusSelect = function (status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function () {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function () {
        this.statusSelect.all(by.tagName('option')).last().click();
    };

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
