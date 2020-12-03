module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('invite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    verificationCode: DataTypes.STRING,
    newUserEmail: DataTypes.STRING,
  });

  Invite.associate = (models) => {
    Invite.belongsTo(models.User, {
      foreignKey: 'senderId',
    });
  };

  return Invite;
};
