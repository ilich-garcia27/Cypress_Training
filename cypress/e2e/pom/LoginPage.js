export class Login {
    loginButton = '#login-button';
    loginLogo = '.login_logo';
    errorIcon = '#login_button_container > div > form > div:nth-child(1) > svg';
    username = '#user-name';
    password = '#password';
    errorButton = '[data-test="error"]';
    errorMessageContainer = '.error-message-container';

    setUsername(username) {
        cy.get(this.username).type(username);
    }

    setPassword(password) {
        cy.get(this.password).type(password);
    }

    clickLoginButton() {
        cy.get(this.loginButton).click();
    }
};