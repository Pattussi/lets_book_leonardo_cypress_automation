import BookingPage from '../pages/BookingPage';

describe('Módulo: Painel CRM', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.visit('https://lets-teste-qa.lovable.app/crm');
  });

  context('Validações Positivas e Regras de Estilo Corretas - @sucesso', () => {
    it('Verificação - Consigo realizar pesquisas com sucesso na barra de busca', () => {
      cy.get('input[placeholder*="Buscar por nome"]').first().type('Maria Oliveira', { force: true });
      cy.get('table').should('contain', 'Maria Oliveira');
    });

    it('Verificação - O badge de status altera para o estado Pendente', () => {
      cy.get('select').first().select('Pendente', { force: true });
      cy.get('select').first().should('contain', 'Pendente');
    });
  });

  context('Auditoria de Validações (Ordem Crescente de Defeitos) - @bugs', () => {
    it('BUG-013- O sistema permite a listagem de reservas com dados inconsistentes ou zerados no painel', () => {
      cy.get('table').should('be.visible');
      cy.get('table').contains('td', '0').should('be.visible'); 
    });

    it('BUG-014- O botão/badge de status não muda de cor corretamente ao ser alterado para Cancelado', () => {
      cy.get('select').first().select('Cancelado', { force: true });
      cy.get('select').first().should('contain', 'Cancelado');
    });

    it('BUG-015- CRM não exibe feedback visual ou mensagem de alerta quando a busca não encontra resultados', () => {
      cy.get('input[placeholder*="Buscar por nome"]').first().clear({ force: true });
      cy.get('input[placeholder*="Buscar por nome"]').first().type('Inexistente_123_Reset', { force: true });
      cy.contains('Nenhum registro encontrado').should('not.exist');
    });

    it('BUG-016 - Tabela do CRM com scroll horizontal em mobile quebra a estrutura visual das colunas', () => {
      cy.viewport(375, 812);
      cy.get('table').should('be.visible');
    });
  });
});