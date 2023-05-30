describe("Reservation Cafe", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/reservations", {
      fixture: "/example.json",
    }).as("reservations");

    cy.visit("http://localhost:3000");
  });

  it("should be able to retrieve data", () => {
    cy.wait("@reservations").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
  });

  it("should have a title", () => {
    cy.get(".app-title").contains("Turing Cafe Reservations");
  });

  it("should load previous reservations", () => {
    cy.get(".reservation-card")
      .first()
      .contains("12/29")
      .contains("7:00")
      .contains("Christie");
  });

  it("should have form values reflet form inputs", () => {
    cy.get("form").find('input[id="name"]').type("Josh");
    cy.get("form").find('input[id="name"]').should("have.value", "Josh");

    cy.get("form").find('input[id="date"]').type("12/20");
    cy.get("form").find('input[id="date"]').should("have.value", "12/20");

    cy.get("form").find('input[id="time"]').type("12:30");
    cy.get("form").find('input[id="time"]').should("have.value", "12:30");

    cy.get("form").find('input[id="number"]').type(8);
    cy.get("form").find('input[id="number"]').should("have.value", "8");
  });

  it("should be able to make a new reservation", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/reservations").as(
      "newReso"
    );

    cy.get("form").find('input[id="name"]').type("Josh");

    cy.get("form").find('input[id="date"]').type("12/20");

    cy.get("form").find('input[id="time"]').type("12:30");

    cy.get("form").find('input[id="number"]').type(8);

    cy.get("button").click();

    cy.wait("@newReso").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.name).to.eq("Josh");
      expect(response.body.date).to.eq("12/20");
      expect(response.body.time).to.eq("12:30");
    });

    cy.get(".reservation-card")
      .last()
      .contains("12/20")
      .contains("12:30")
      .contains("Josh");
  });
});
