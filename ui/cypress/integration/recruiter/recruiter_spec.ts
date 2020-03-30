context("Recruiter", () => {
	beforeEach(() => {});

	it("lists applications", () => {
		cy.visit("/recruiter");
		//cy.wait(["@apiRequests"]);

		let totalCount = 0;

		cy.wait(1500).then(() => {
			const countEl = cy.get(".applications-length").first();

			countEl.invoke("text").then(count => {
				cy.get(".application").should($p => {
					totalCount = parseInt(count);
					expect($p).to.have.length(totalCount);
				});
			});
		});
	});
});
