class LoginPage {
  acessarSite() {
    cy.visit('/')
  }

preencherFormulario(checkin, checkout, pessoas, nivel, desconto, nome, email, telefone) {

    if (checkin) cy.get(':nth-child(1) > .w-full').clear().type(checkin);
    if (checkout) cy.get('.mt-4 > :nth-child(2) > .w-full').clear().type(checkout);
    if (pessoas) cy.get('.mt-4 > :nth-child(3) > .w-full').type(`{selectall}${pessoas}`);
    if (nivel) cy.get("select.w-full.rounded-md").select(nivel);
    if (desconto) cy.get('.rounded-lg > .mt-4 > .w-full').type(desconto)
    if (nome) cy.get('.md\\:col-span-2').type(nome);
    if (email) cy.get('[placeholder="E-mail"]').type(email);
    if (telefone) cy.get('[placeholder="Telefone"]').type(telefone);

    cy.get('.bg-slate-900').click()
  }


 
validarReservaRealizada() {
    // Busca o pop-up pelas classes principais e garante que ele está visível na tela
    cy.get('div.fixed.bg-emerald-600')
      .should('be.visible')
      .and('contain.text', 'Reserva confirmada com sucesso!');
}

  validarMensagemErro(mensagemEsperada) {
    // Espera explícita para evitar timing issues
    cy.get('[data-test="error"]', { timeout: 15000 })
      .should('exist')
      .and('be.visible')
      .and('contain.text', mensagemEsperada)
  }

  realizarLogout() {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link')
      .should('be.visible')
      .click()
    cy.url().should('include', '/')
  }
}

export default new LoginPage()
