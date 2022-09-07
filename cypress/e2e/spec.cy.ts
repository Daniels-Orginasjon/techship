import { Pages, navPages } from '../../lib/server/pages';
import fs from 'fs';
import { createVerify } from 'crypto';

context('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should render the home page and with the pages', () => {
    cy.get('nav>div>div>ul>li>a').each((item, index) => {
      cy.wrap(item).should('have.text', navPages[index].name);
    });
  });
});

export {};
