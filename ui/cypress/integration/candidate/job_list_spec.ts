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

	it("shows job", () => {
		cy.visit("/");
		//cy.wait(["@apiRequests"]);
		const jobLink = cy.get(".job").first();
		jobLink.invoke("text").then(function(jobTitle) {
			console.log(jobTitle);
			cy.visit("/positions/XScInREAACUAFCii");
			cy.contains(jobTitle);
		});
	});
});
