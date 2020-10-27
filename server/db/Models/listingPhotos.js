module.exports = (sequelize, DataTypes) => {
  const ListingPhotos = sequelize.define('listingPhotos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listing_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
  });

  ListingPhotos.associate = (models) => {
    ListingPhotos.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return ListingPhotos;
};
