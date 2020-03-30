context("JobList", () => {
	beforeEach(() => {});

	it("lists jobs", () => {
		cy.visit("/");
		//cy.wait(["@apiRequests"]);
		cy.contains("Positions");

		cy.get(".job").should($p => {
			expect($p).to.have.length(11);
		});
	});
});
