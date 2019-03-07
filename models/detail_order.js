module.exports = function(sequelize, DataTypes){
    var DetailOrder = sequelize.define("detailOrder", {
        order_id: DataTypes.UUID,
        product_id: DataTypes.UUID,
        quantity: DataTypes.INTEGER,
        total_price: DataTypes.DOUBLE
    });
    return DetailOrder;
}