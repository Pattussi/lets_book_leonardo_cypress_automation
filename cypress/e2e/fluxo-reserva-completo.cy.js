import BookingPage from '../pages/BookingPage';

describe('US-002 - Fluxo de Integração de Compra Ponta a Ponta', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  context('Módulo: Portal de Reservas & Painel CRM', () => {

    it('Deve realizar o cadastro completo de uma reserva e validar sua listagem no Painel CRM', () => {
      BookingPage.acessarSite();
      BookingPage.preencherFormulario("2026-11-13", "2026-11-15", "3", 2, "", "Maria Oliveira", "maria@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();

      cy.visit('https://lets-teste-qa.lovable.app/crm');
      cy.get('table').should('be.visible');
      
      cy.get('input[placeholder*="Buscar por nome"]').first().clear({ force: true });
      cy.get('input[placeholder*="Buscar por nome"]').first().type('Maria Oliveira', { force: true });
      
      cy.get('table').should('contain', 'Maria Oliveira');
    });

  });
});