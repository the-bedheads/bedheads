module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('availability', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    accepted: DataTypes.BOOLEAN,
  });

  Availability.associate = (models) => {
    Availability.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
    });
    Availability.belongsTo(models.User, {
      foreignKey: 'guest_id',
    });
    Availability.belongsTo(models.User, {
      foreignKey: 'host_id',
    });
  };

  return Availability;
};
