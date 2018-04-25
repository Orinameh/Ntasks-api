// responsible for connecting sequelize and sqlite3
import logger from './logger';
module.exports = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
            underscored: true
        } 
    },
    jwtSecret: "Nta$k-AP1",  //serves as a base to encode and decode tokens( use complex strings in prod)
    jwtSession: { session: false} //used to inform Passport that the API won’t manage the session.
};