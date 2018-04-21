// responsible for connecting sequelize and sqlite3
module.exports = {
	database: "ntask_test",
	username: "",
	password: "",
	params: {
			dialect: "sqlite",
			storage: "ntask.sqlite",
			logging: false, //disables the SQL log output
			define: {
					underscored: true
			} 
	},
	jwtSecret: "NTASK_TEST",  //serves as a base to encode and decode tokens( use complex strings in prod)
	jwtSession: { session: false} //used to inform Passport that the API won’t manage the session.
};