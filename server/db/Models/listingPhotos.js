module.exports = (sequelize, DataTypes) => {
  const ListingPhotos = sequelize.define('listingPhotos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: DataTypes.STRING,
  });

  ListingPhotos.associate = (models) => {
    ListingPhotos.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    ListingPhotos.belongsTo(models.Listing, {
      foreignKey: 'listingId',
    });
  };

  return ListingPhotos;
};
