module.exports = function(sequelize, DataTypes){
    var Orders = sequelize.define("Orders",{
        order_user_id: DataTypes.INTEGER,
        status: DataTypes.STRING,
        date: DataTypes.DATE,
        comment: DataTypes.STRING
    });

    // Added by GG - 03/07 
    // Testing associations of Orders table

    Orders.associate = function(models){
        //Associate orders with products 
        // one order has many products
        Orders.hasMany(models.Products, {
            onDelete: "cascade"
        });

        //Associate orders to order details
        // one order has only one order detail
        Orders.hasOne(models.DetailedOrder, {
            onDelete: "cascade"
        });
    }; 

    // End of changes 

    
    return Orders;
}