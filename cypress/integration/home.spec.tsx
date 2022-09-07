/// <reference types="cypress"/>
import { navPages } from '../../lib/server/pages';

context('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should render the home page and with the pages', () => {
    cy.get('ul>li>a').each((item, index) => {
      cy.wrap(item).should('have.text', navPages[index].name);
    });
  });
});

export {};
