module.exports = (sequelize, DataTypes) => {
  const Geolocation = sequelize.define('geolocation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    latitude: DataTypes.DECIMAL(5, 3),
    longitude: DataTypes.DECIMAL(5, 3),
  });

  Geolocation.associate = (models) => {
    Geolocation.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
    });
  };

  return Geolocation;
};
