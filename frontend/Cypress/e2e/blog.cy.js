import users from "./../fixtures/users.json";
import blogs from "./../fixtures/blogs.json";
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    users.forEach((user) => {
      cy.createUser(user);
    });
  });

  it("Login form is shown", function () {
    cy.contains("LOGIN INTO BLOGLIST APP");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "test", password: "test" });
      cy.contains("Superuser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("label", "Username:").type("mluukkai");
      cy.contains("label", "Password:").type("wrong");
      cy.contains("button", "Login").click();
      cy.contains("Login unsuccessful: invalid username or password");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login(users[0]);
    });

    it("A blog can be created", function () {
      const { title, author, url } = blogs[0];
      cy.contains("button", "Create new Blog").click();
      cy.contains("label", "Title").type(title);
      cy.contains("label", "Author").type(author);
      cy.contains("label", "URL").type(url);
      cy.get("#createBtn").click();
      cy.get(".blogs .blog")
        .should("be.visible")
        .and("contain", `${title} by ${author}`);
    });

    describe("and there is a blog from that user", function () {
      beforeEach(function () {
        const blog = blogs[0];

        cy.createBlog(blog);

        cy.get(".blogs .blog")
          .should("be.visible")
          .and("contain", `${blog.title} by ${blog.author}`);
      });

      it("the blog can be liked", function () {
        const { likes } = blogs[0];

        cy.get(".blogs .blog")
          .contains("button", "View")
          .click();

        cy.contains("button", "like")
          .should("be.visible")
          .click();

        cy.get(".blog-details")
          .should("be.visible")
          .and("contain", `Likes: ${likes + 1}`);
      });

      it("the blog can be deleted", function () {
        cy.get(".blogs .blog")
          .contains("button", "Remove")
          .click();

        cy.get(".blogs .blog").should("not.exist");
      });
    });
    describe("and there is a blog from a different user", function () {
      beforeEach(function () {
        cy.logout();
        cy.login(users[1]);

        const blog = blogs[0];
        cy.createBlog(blog);

        cy.logout();
        cy.login(users[0]);

        cy.get(".blogs .blog")
          .should("be.visible")
          .and("contain", `${blog.title} by ${blog.author}`);
      });

      it("the blog can be liked", function () {
        const { likes } = blogs[0];

        cy.get(".blogs .blog")
          .contains("button", "View")
          .click();

        cy.contains("button", "like")
          .should("be.visible")
          .click();

        cy.get(".blogs .blog")
          .should("be.visible")
          .and("contain", `Likes: ${likes + 1}`);
      });

      it("the blog cannot be deleted", function () {
        cy.get(".blogs .blog")
          .contains("button", "Remove")
          .should("not.exist");
      });
    });
    describe("and there are multiple blogs", function () {
      beforeEach(function () {
        blogs.forEach((blog) => {
          cy.createBlog(blog);

          cy.get(".blogs .blog")
            .should("be.visible")
            .and("contain", `${blog.title} by ${blog.author}`);
        });
      });

      it.only("the blogs are ordered by likes (descending)", function () {
        cy.get(".blogs .blog").eq(0)
          .should("contain", "First Blog");

        cy.get(".blogs .blog").eq(1)
          .should("contain", "Third Blog");
      });
    });
  });

});