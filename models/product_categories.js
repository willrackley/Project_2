module.exports = function(sequelize, DataTypes){
    var ProductCategories = sequelize.define("Product Categories",{
        category_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        category_image:DataTypes.STRING //Not sure if this is the right datatype listed for image link
    });
    return ProductCategories;
}