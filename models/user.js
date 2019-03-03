module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        balance: DataTypes.DOUBLE,
        first_name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        user_group: DataTypes.STRING,
        last_login: DataTypes.DATE

    });
    return User;
}