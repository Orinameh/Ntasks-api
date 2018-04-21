describe("Routes: Index", () => {
	describe('GET /', () => {
		it('returns the API status', done => {
			request.get('/')  //request is from supertest
				.expect(200)
				.end((err, res) => {
					const expected = {status: "NTASK API"};
					expect(res.body).to.eql(expected);
					done(err); //concludes the test
				});
		});
		
	});
	
});