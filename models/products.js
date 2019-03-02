module.exports = function(sequelize, DataTypes){
    var Products = sequelize.define("Products",{
        product_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        discount_price: DataTypes.DOUBLE,
        category_id: DataTypes.INTEGER,
        product_image:DataTypes.STRING //Not sure if this is the right datatype listed for image link

        
    });
    return Products;
}