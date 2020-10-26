module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('listing', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    listingAddress: DataTypes.STRING,
    listingTitle: DataTypes.STRING,
    listingDescription: DataTypes.STRING,
    pets: DataTypes.BOOLEAN,
    ada: DataTypes.BOOLEAN,
    smoking: DataTypes.BOOLEAN,
    roommates: DataTypes.BOOLEAN,
    internet: DataTypes.BOOLEAN,
    privateBath: DataTypes.BOOLEAN,
  });

  return Listing;
};
