module.exports = function(sequelize, DataTypes){
    var Categories = sequelize.define("productCategories",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        name: DataTypes.STRING,
    },
    {
    timestamps: false
    });
    return Categories;
}