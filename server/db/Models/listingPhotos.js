module.exports = (sequelize, DataTypes) => {
  const ListingPhotos = sequelize.define('listingPhotos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listing_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  });

  return ListingPhotos;
};
