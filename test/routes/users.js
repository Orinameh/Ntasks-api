import jwt from 'jwt-simple';

describe('Routes: Users', () => {
	const Users = app.db.models.Users;
	const jwtSecret = app.libs.config.jwtSecret;
	let token;

	beforeEach(done => {
		Users
			.destroy({where: {}})
			.then(() => Users.create({
				name: 'Dave',
				email: 'dave@gmail.com',
				password: '12345'
			}))
			.then(user => {
				token = jwt.encode({id: user.id}, jwtSecret);
				done();
			})

	});

	describe('GET /user', () => {
		describe('status 200', () => {
			it('returns an authenticated user', done => {
				request.get('/user')
					.set('Authorization', `JWT ${token}`)
					.expect(200)
					.end((err, res) => {
						expect(res.body.name).to.equal('Dave')
						expect(res.body.email).to.equal('dave@gmail.com');
						done(err);
						
					});

			});
		});
	});

	describe('POST /users', () => {
		describe('status 200', () => {
			it('creates a new user', done => {
				request.post('/users')
					.set('Authorization', `JWT ${token}`)
					.send({ name: 'Cynthia', email: 'cy@yahoo.com', password: '12345'})
					.expect(200)
					.end((err, res) => {
						expect(res.body.name).to.equal('Cynthia');
						expect(res.body.email).to.equal('cy@yahoo.com');
						// expect(res.body.password).to.equal('12345');
						done(err);
					});

			});
		});
	});


	describe('DELETE /user', () => {
		describe('status 204', () => {
			it('removes a user', done => {
					request.delete(`/user`)
					.set('Authorization', `JWT ${token}`)
					.expect(204)
					.end((err, res) => done(err));
			})
		})
	})
});