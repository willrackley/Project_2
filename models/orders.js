module.exports = function(sequelize, DataTypes){
    var Orders = sequelize.define("Orders",{
        order_id: DataTypes.INTEGER,
        order_user_id: DataTypes.INTEGER,
        status: DataTypes.STRING,
        date: DataTypes.DATE,
        comment: DataTypes.STRING
    });
    return Orders;
}