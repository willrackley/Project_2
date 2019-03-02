module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User",{
        balance: DataTypes.DOUBLE,
        first_name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        user_group: DataTypes.STRING,
        last_login: DataTypes.DATE

    });
    return User;
}