Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request({
    url: "http://localhost:3001/api/users",
    method: "POST",
    body: { username, name, password }
  });

  cy.visit("http://localhost:3001");
});
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username, password
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
    cy.visit("http://localhost:3001");
  });
});
Cypress.Commands.add("createBlog", ({ title, author,url,likes }) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author,url,likes },
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("loggedBlogAppUser")).token}`
    }
  });

  cy.visit("http://localhost:3001");
});

Cypress.Commands.add("logout", () => {
  window.localStorage.removeItem("loggedBlogAppUser");

  cy.visit("http://localhost:3001");
});