import { Login } from "./pom/LoginPage";
import { Home } from "./pom/HomePage";

const LoginPage = new Login;
const HomePage = new Home;
const errorMessages = require('./ddt/errorMessages.json');
const environment = require('./ddt/environment.json');
const users = require('./ddt/users.json')
const greenBackgroundColor = 'rgb(61, 220, 145)';
const redBackgroundColor = 'rgb(226, 35, 26)';
const backpackImageSrc = '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg';

describe("Demo", () => {
    beforeEach(() => {
        cy.visit(environment.url);
    });

    it("UI validation", () => {
        cy.get(LoginPage.loginButton).should('have.css', 'background-color', greenBackgroundColor);
        cy.get(LoginPage.loginLogo).should('have.css', 'font-family', '"DM Mono", "sans-serif"').should('have.text', 'Swag Labs');
        cy.get(LoginPage.errorIcon).should('not.exist');
    });

    users.forEach(user => {
        it("Login for " + user.type, () => {
            if (user.username !== "") {
                LoginPage.setUsername(user.username);
            }
            if (user.password !== "") {
                LoginPage.setPassword(user.password);
            }
            LoginPage.clickLoginButton();

            if (user.type === "incorrect_user") {
                cy.get(LoginPage.errorButton).should('have.text', errorMessages.incorrectCredentials)
                cy.get(LoginPage.errorMessageContainer).should('have.css', 'background-color', redBackgroundColor);
                cy.get(LoginPage.username).should('have.css', 'border-bottom-color', redBackgroundColor);
                cy.get(LoginPage.errorIcon).should('exist');
            } else if (user.type === "incorrect_password") {
                cy.get(LoginPage.errorButton).should('have.text', errorMessages.incorrectCredentials)
                cy.get(LoginPage.errorMessageContainer).should('have.css', 'background-color', redBackgroundColor);
                cy.get(LoginPage.username).should('have.css', 'border-bottom-color', redBackgroundColor);
                cy.get(LoginPage.password).should('have.css', 'border-bottom-color', redBackgroundColor);
                cy.get(LoginPage.errorIcon).should('exist');
            } else if (user.type === "empty_username") {
                cy.get(LoginPage.errorButton).should('have.text', errorMessages.requiredUsername)
                cy.get(LoginPage.errorMessageContainer).should('have.css', 'background-color', redBackgroundColor);
            } else if (user.type === "empty_password") {
                cy.get(LoginPage.errorButton).should('have.text', errorMessages.requiredPassword)
                cy.get(LoginPage.errorMessageContainer).should('have.css', 'background-color', redBackgroundColor);
            } else if (user.type === "valid_credentials") {
                cy.get(HomePage.title).should('have.text', 'Swag Labs');
                cy.get(HomePage.backpackImage).should('have.attr', 'src', backpackImageSrc);
            } else if (user.type === "locked_out_user") {
                cy.get(LoginPage.errorButton).should('have.text', errorMessages.lockedOutUser);
            } else if (user.type === "visual_user") {
                cy.get(HomePage.backpackImage).should('have.attr', 'src', backpackImageSrc);
            }
        });
    });

});