import bcrypt from 'bcrypt';
module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        hooks: {
            beforeCreate: user => {
                // const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password,  bcrypt.genSaltSync(8), null);
            }
        }
    },
    
    {
        classMethods: {
            associate: (models) => {
                Users.hasMany(models.Tasks)
            },

            // isPassword: (password, encodedPassword) => {
            //     return bcrypt.compareSync(password, encodedPassword)
            // }
            
        },

       
    });
    return Users;
}