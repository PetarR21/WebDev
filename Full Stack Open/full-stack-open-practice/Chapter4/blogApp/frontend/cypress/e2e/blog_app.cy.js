describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser({ username: 'aiden344', name: 'Aiden Pierce', password: 'seentoomany' });
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aiden344');
      cy.get('#password').type('seentoomany');
      cy.get('#loginBtn').click();

      cy.contains('Aiden Pierce logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('aiden3');
      cy.get('#password').type('seentoo');
      cy.get('#loginBtn').click();

      cy.get('.error').should('contain', 'wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('.error').should('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'aiden344', password: 'seentoomany' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('blog title');
      cy.get('#author').type('blog author');
      cy.get('#url').type('blog url');
      cy.get('#submitBtn').click();

      cy.contains('blog title blog author');
    });

    describe('When blog already exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'blog title', author: 'blog author', url: 'blog url' });
      });

      it('blog can be liked', function () {
        cy.contains('blog title blog author').contains('view').click();
        cy.contains('likes').contains('like').click();
        cy.contains('likes 1');
      });

      it('user who created a blog can delete it', function () {
        cy.contains('blog title blog author').contains('view').click();
        cy.contains('remove').click();
        cy.should('not.contain', 'blog title blog author');
      });

      it('user who did not create a blog can not delete it', function () {
        cy.createUser({ username: 'markH', name: 'Mark Hunt', password: 'helloworld' });
        cy.login({ username: 'markH', password: 'helloworld' });
        cy.contains('blog title blog author').contains('view').click();
        cy.contains('remove').click();
        cy.contains('blog title blog author');
        cy.contains('unauthorized delete operation');
      });
    });

    describe('When multiple blogs already exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'The title with the third most likes', author: 'author', url: 'url', likes: 12 });
        cy.createBlog({ title: 'The title with the most likes', author: 'author', url: 'url', likes: 32 });
        cy.createBlog({ title: 'The title with the second most likes', author: 'author', url: 'url', likes: 22 });
      });

      it('blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes');
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes');
        cy.get('.blog').eq(2).should('contain', 'The title with the third most likes');
      });
    });
  });
});
