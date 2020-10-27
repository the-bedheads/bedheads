module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'requester_id',
    });
    Request.belongsTo(models.Availability, {
      foreignKey: 'availability_id',
    });
  };

  return Request;
};
