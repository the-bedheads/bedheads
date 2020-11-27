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
      foreignKey: 'userId',
    });
    Message.belongsTo(models.Thread, {
      foreignKey: 'threadId',
    });
  };

  return Message;
};
