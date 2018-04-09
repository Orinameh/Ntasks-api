import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

module.exports = app =>{
	const Users = app.db.models.Users;
	const cfg = app.libs.config;
	const params = {
		secretOrKey: cfg.jwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
	};

	const strategy = new Strategy(params, (payload, done) => {
		Users.findById(payload.id)
		.then(user => {
			if(user) {
				return done(null, {  //done callback sends the authenticated user's data to the authenticated routes
					id: user.id,      //which receives data(id and email) via req.user object
					email: user.email
				});
			}

			return done(null, false);
		})
		.catch(err => done(err, null));
	});

	passport.use(strategy);
	return {
		initialize: () => {
			return passport.initialize();
		},
		authenticate: () => {
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};

	
};