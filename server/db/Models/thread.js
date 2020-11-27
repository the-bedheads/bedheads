module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('thread', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  Thread.associate = (models) => {
    Thread.belongsTo(models.User, {
      foreignKey: 'user1Id',
    });
    Thread.belongsTo(models.User, {
      foreignKey: 'user2Id',
    });
    Thread.hasMany(models.Message);
  };

  return Thread;
};
