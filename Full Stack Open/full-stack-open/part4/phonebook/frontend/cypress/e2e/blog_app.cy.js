describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    let user = {
      username: 'johnD',
      password: '123456',
      name: 'John Doe',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    user = {
      username: 'markH',
      password: '123456',
      name: 'Mark Hunt',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login to application');
    cy.contains('username');
    cy.contains('password');
    cy.get('#loginBtn').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('johnD');
      cy.get('#password').type('123456');
      cy.get('#loginBtn').click();

      cy.contains('John Doe loggged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('john');
      cy.get('#password').type('wrong');
      cy.get('#loginBtn').click();

      cy.get('.error').should('contain', 'wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'johnD', password: '123456' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('test title');
      cy.get('#author').type('test author');
      cy.get('#url').type('test title');
      cy.get('#createBtn').click();

      cy.contains(`test title test author`);
    });

    describe('when there is initialy blog in db', function () {
      beforeEach(() => {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url',
        });
      });

      it('blog can be liked by both users', function () {
        cy.get('#viewBtn').click().parent().contains('likes 0');

        cy.get('#likeBtn').click().parent().contains('likes 1');

        cy.login({ username: 'markH', password: '123456' });
        cy.get('#viewBtn').click().parent().contains('likes 1');
        cy.get('#likeBtn').click().parent().contains('likes 2');
      });

      it('blog can be deleted by the user who created it', function () {
        cy.get('#viewBtn').click().parent().contains('remove');
        cy.get('#removeBtn').click();
        cy.contains('test title by test author deleted successfully');
      });

      it('blog can not be deleted by the user who did not create it', function () {
        cy.login({ username: 'markH', password: '123456' });
        cy.get('#viewBtn').click().parent().contains('remove');
        cy.get('#removeBtn').click();
        cy.contains('can not delete blogs from other users');
        cy.contains('test title test author');
      });
    });

    describe('when there is initialy 3 blogs in db', function () {
      beforeEach(() => {
        cy.createBlog({
          title: 'title with second most likes',
          author: 'test author',
          url: 'test url',
          likes: 14,
        });
        cy.createBlog({
          title: 'title with third most likes',
          author: 'test author',
          url: 'test url',
          likes: 2,
        });
        cy.createBlog({
          title: 'title with most likes',
          author: 'test author',
          url: 'test url',
          likes: 40,
        });
      });

      it.only('blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.get('.blog').eq(0).should('contain', 'title with most likes');
        cy.get('.blog').eq(1).should('contain', 'title with second most likes');
        cy.get('.blog').eq(2).should('contain', 'title with third most likes');
      });
    });
  });
});
