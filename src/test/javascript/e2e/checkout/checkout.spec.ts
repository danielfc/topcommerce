import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Checkout e2e test', () => {

    let navBarPage: NavBarPage;
    let checkoutComponentsPage: CheckoutComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('user', 'user');
        browser.waitForAngular();
    });

    it('should load Checkout page with default message', () => {
        navBarPage.goToEntity('checkout');
        expect(checkoutComponentsPage.getTitle()).toMatch(/Checkout/);
        expect(checkoutComponentsPage.getMessage()).toMatch(/There are no products in your basket./)
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CheckoutComponentsPage {
    message = element.all(by.css('p')).first();
    title = element.all(by.css('h2')).first();

    getMessage() {
        return this.message.getText();
    }

    getTitle() {
        return this.title.getText();
    }
}
