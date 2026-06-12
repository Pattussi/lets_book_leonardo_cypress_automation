/// <reference types="cypress" />

import BookingPage from '../pages/BookingPage';

describe('Módulo: Portal de Reservas', () => {
  
  beforeEach(() => {
    BookingPage.acessarSite();
  });

  context('Cenários de Sucesso (Happy Path) - @sucesso', () => {
    it('Deve preencher o formulário de cadastro com dados válidos e confirmar a reserva', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-15", "3", 2, "", "Leonardo", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();
    });
  });

  context('Validação de Interface (Componentes Dinâmicos) - @interface', () => {
    it('Deve atualizar dinamicamente o rodapé ao selecionar diferentes níveis de quartos', () => {
      BookingPage.acessarSite();

      cy.get('select.w-full.rounded-md').select(1); 
      cy.contains('Quarto selecionado:').should('be.visible').and('contain', 'Deluxe');

      cy.get('select.w-full.rounded-md').select(2);
      cy.contains('Quarto selecionado:').should('be.visible').and('contain', 'Presidencial'); 
    });
  });

  context('Auditoria de Validações (Ordem Crescente de Defeitos) - @bugs', () => {
    it('BUG-001 - O sistema não barra o envio e não exibe erro ao aplicar um cupom inválido', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-15", "2", 1, "CUPOM_INVALIDO", "Leonardo", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();
    });

    it('BUG-002 - O sistema permite realizar uma reserva com data de check-out anterior ao check-in', () => {
      BookingPage.preencherFormulario("2026-11-15", "2026-11-13", "2", 1, null, "Leonardo", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();    
    });

    it('BUG-003 - O sistema gera um valor total negativo ao inserir data de check-out retroativa', () => {
      BookingPage.preencherFormulario("2026-11-15", "2026-11-13", "2", 0, null, "Leonardo", "teste@gmail.com", "5198716252");
      cy.contains('Valor Total').parent().should('contain', '-');
    });

    it('BUG-004 - O sistema aceita e permite realizar reservas com datas de check-in no passado', () => {
      BookingPage.preencherFormulario("2023-11-13", "2023-11-15", "2", 1, null, "Leonardo", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();
    });

    it('BUG-005 - O sistema permite realizar uma reserva com formato de e-mail inválido', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-15", "2", 1, null, "Leonardo", "email_invalido_sem_arroba", "5198716252");
      BookingPage.validarReservaRealizada();
    });

    it('BUG-006 - O sistema permite realizar uma reserva com quantidade de hóspedes igual a zero ou negativa', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-15", "0", 1, null, "Leonardo", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();
    });

    it('BUG-007 - O sistema permite cadastrar nome contendo apenas números e caracteres especiais', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-15", "2", 1, null, "12345!@#", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();
    });

    it('BUG-008 - O sistema permite aplicar e acumular o mesmo cupom de desconto duas vezes', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-15", "2", 1, "PROMO10", "Leonardo", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();
    });

    it('BUG-009 - O sistema permite criar reserva com 0 noites (Check-in e Check-out na mesma data)', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-13", "2", 1, null, "Leonardo", "teste@gmail.com", "5198716252");
      BookingPage.validarReservaRealizada();
    });

    it('BUG-010 - O sistema ignora a quantidade de hóspedes e não altera o valor total da reserva', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-14", "1", 0, null, "Leonardo", "teste@gmail.com", "5198716252");
      cy.contains('Valor Total').parent().should('contain', '250.00');

      BookingPage.acessarSite(); 
      BookingPage.preencherFormulario("2026-11-13", "2026-11-14", "5", 0, null, "Leonardo", "teste@gmail.com", "5198716252");
      cy.contains('Valor Total').parent().should('contain', '250.00'); 
    });

    it('BUG-011 - O sistema calcula o valor total incorreto para a Suíte Presidencial (R$ 450 em vez de R$ 1200)', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-14", "2", 2, null, "Leonardo", "teste@gmail.com", "5198716252");
      cy.contains('Valor Total').parent().should('contain', '450.00');
    });
    
   it('BUG-012 - O sistema falha no cálculo do cupom VIP20 (Aplica 90% em vez de 20% de desconto, gerando R$ 25.00)', () => {
      BookingPage.preencherFormulario("2026-11-13", "2026-11-14", "2", 0, "VIP20", "Leonardo", "teste@gmail.com", "5198716252");
      
      // Valida o comportamento atual defeituoso para fins de relatório e caracterização
      cy.contains('Valor Total').parent().should('contain', '25.00');
    });
 
  });



});