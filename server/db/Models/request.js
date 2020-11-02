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
      foreignKey: 'requester_id',
    });
    Request.belongsTo(models.Availability, {
      foreignKey: 'availability_id',
    });
  };

  return Request;
};
