module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('listing', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listingAddress: DataTypes.STRING,
    listingCity: DataTypes.STRING,
    listingState: DataTypes.STRING,
    listingZipCode: DataTypes.STRING,
    listingTitle: DataTypes.STRING,
    listingDescription: DataTypes.STRING(1234),
    pets: DataTypes.BOOLEAN,
    ada: DataTypes.BOOLEAN,
    smoking: DataTypes.BOOLEAN,
    roommates: DataTypes.BOOLEAN,
    internet: DataTypes.BOOLEAN,
    privateBath: DataTypes.BOOLEAN,
  });

  Listing.associate = (models) => {
    Listing.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return Listing;
};
