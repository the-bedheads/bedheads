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
      foreignKey: 'user1_id',
    });
    Thread.belongsTo(models.User, {
      foreignKey: 'user2_id',
    });
    Thread.hasMany(models.Message);
  };

  return Thread;
};
