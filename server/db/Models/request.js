module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('requests', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  }, { freezeTableName: true });

  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'requesterId',
    });
    Request.belongsTo(models.Availability, {
      foreignKey: 'availabilityId',
    });
  };

  return Request;
};
