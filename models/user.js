module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },

        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        },

        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    })
}
