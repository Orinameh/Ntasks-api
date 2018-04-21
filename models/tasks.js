module.exports = (sequelize, DataType) => {

    // sequelize.define("Tasks") creates or changes tables
    // This happens only when Sequelize syncs with the application during boot time (i.e in libs/boot.js)
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        user_id: {
            type: DataType.INTEGER,
            
        }
    }, {
        classMethods: {
            associate: (models) => {
                Tasks.belongsTo(models.Users);
            }
        }
    });
    return Tasks; 
}