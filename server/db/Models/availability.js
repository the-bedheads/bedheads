module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('availability', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    accepted: DataTypes.BOOLEAN,
  });

  Availability.associate = (models) => {
    Availability.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
    });
    Availability.belongsTo(models.User, {
      foreignKey: 'guest_id',
    });
  };

  return Availability;
};
