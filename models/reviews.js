module.exports = function(sequelize, DataTypes){
    var Reviews = sequelize.define("Reviews",{
        review_id: DataTypes.INTEGER,
         rating: DataTypes.INTEGER,
         rated_by: DataTypes.INTEGER,
         comment: DataTypes.STRING
     });
     return Reviews;
}