module.exports = function(sequelize, DataTypes){
    var Products = sequelize.define("Products",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        category_id: DataTypes.UUID,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        regular_price: DataTypes.DOUBLE,
        discount_price: DataTypes.DOUBLE,
        product_image:DataTypes.STRING
    });
    return Products;
}