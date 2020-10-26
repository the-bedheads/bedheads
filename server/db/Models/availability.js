module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('availability', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listing_id: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    accepted: DataTypes.BOOLEAN,
    guest_id: DataTypes.INTEGER,
  });

  return Availability;
};
