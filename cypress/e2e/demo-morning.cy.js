/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');

const username = faker.internet.userName();
const password = 'Qwerty!123';

describe('Demoblaze flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Should register the user', () => {
    cy.findById('signin2').click();
    cy.findById('sign-username')
      .should('be.visible', { timeout: 15000 }).type(username);
    cy.findById('sign-password')
      .should('be.visible', { timeout: 15000 }).type(password);

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('[onclick="register()"]').click();
    cy.get('@alertStub')
      .should('have.been.calledWith', 'Sign up successful.');
  });

  it('Should login the user', () => {
    cy.findById('login2').click();
    cy.findById('loginusername', { timeout: 15000 }).type(username);
    cy.findById('loginpassword', { timeout: 15000 }).type(password);
    cy.get('[onclick="logIn()"]').click();
    cy.findById('nameofuser').should('exist');
    cy.contains('#nameofuser', username);
  });

  it('Should add the phone to the Cart', () => {
    cy.get('[onclick="byCat(\'phone\')"]').click();
    cy.get('[href="prod.html?idp_=1"]').first().click();
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('[onclick="addToCart(1)"]').click();
    cy.get('@alertStub')
      .should('have.been.calledWith', 'Product added');
  });
});
