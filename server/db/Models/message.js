module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: DataTypes.STRING,
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Message.belongsTo(models.Thread, {
      foreignKey: 'thread_id',
    });
  };

  return Message;
};
