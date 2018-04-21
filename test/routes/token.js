describe('Routes: Token', () => {
	const Users = app.db.models.Users;
	describe('POST /token', () => {
		// Runs before each test
		beforeEach(done => {
			Users
				.destroy({ where: {}}) //cleans the Users table first
				.then(() => Users.create({  //save a single valid user for each test execution
					name: 'Davido',
					email: 'davido@gmail.com',
					password: '12345'
				}))
				.then(() => done());
		});

		describe('status 200', () => {
			it('returns authenticated user token', done => {
				request.post('/token')
				// send function is used to send the credentials to the endpoint /token
					.send({
						email: 'davido@gmail.com',
						password: '12345'
					})
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.include.keys("token");
						done(err);
					});

			});
		});

		describe('status 401', () => {
			it('throws error when password is incorrect', done => {
				request.post('/token')
				// send function is used to send the credentials to the endpoint /token
					.send({
						email: 'davido@gmail.com',
						password: 'WRONG_PASSWORD'
					})
					.expect(401)
					.end((err, res) => {
						done(err);
					});

			});

			it('throws error when email does not exist', done => {
				request.post('/token')
				// send function is used to send the credentials to the endpoint /token
					.send({
						email: 'wrongemail@gmail.com',
						password: '12345'
					})
					.expect(401)
					.end((err, res) => {
						done(err);
					});

			});

			it('throws error when email and password are blank', done => {
				request.post('/token')
					.expect(401)
					.end((err, res) => {
						done(err);
					});

			});

		});
	});
});