describe('Prueba pagina saucedemo', function () {

    it('Tc pagina saucedemo, pagina para hacerle pruebade automatizacion', function () {

        // 1. Navegación inicial
        cy.visit('https://www.saucedemo.com/');

        // Aserción inicial de visibilidad del formulario de login
        cy.get('#login_button_container').should('be.visible');

        // 2. Interacciones de entrada (.type)
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        // 3. Interacción de clic (.click) para iniciar sesión
        cy.get('[data-test="login-button"]').click();

        // 4. Aserciones tras el login (URL y carga del catálogo)
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
        cy.get('.inventory_item').should('have.length.greaterThan', 0);

        // 5. Interacción: Agregar producto al carrito
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Aserción: Validar que el icono del carrito refleje 1 item
        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .and('have.text', '1');

        // 6. Navegación hacia el carrito
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');

        // 7. (Formulario de compra)
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');

        // Llenar datos de envío con .type()
        cy.get('[data-test="firstName"]').type('Santiago');
        cy.get('[data-test="lastName"]').type('Moreno');
        cy.get('[data-test="postalCode"]').type('050034');
        cy.get('[data-test="continue"]').click();

        // 8. Resumen y Finalización de la compra
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.summary_total_label').should('contain', '$');
        cy.get('[data-test="finish"]').click();

        // 9. Aserción final obligatoria: Pantalla de orden completada
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
    });

});



