module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User",{
        user_id: DataTypes.INTEGER, 
        balance: DataTypes.DOUBLE,
        username: DataTypes.STRING,
        first_name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        user_group: DataTypes.STRING,
        last_login: DataTypes.DATE

    });
    return User;
}