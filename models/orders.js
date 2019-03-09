module.exports = function(sequelize, DataTypes){
    var Orders = sequelize.define("Orders",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        order_user_id: DataTypes.UUID,
        order_table: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        total_price: DataTypes.DOUBLE,
        status: DataTypes.STRING,
        comment: DataTypes.STRING
    });

    
    return Orders;
}