module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    requester_id: DataTypes.INTEGER,
    availability_id: DataTypes.INTEGER,
  });

  return Request;
};
