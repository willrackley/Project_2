module.exports = function(sequelize, DataTypes){
    var DetailedOrder = sequelize.define("DetailedOrder", {
        order_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        total_price: DataTypes.DOUBLE
    });
    return DetailedOrder;
}