module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('invite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    verificationCode: DataTypes.STRING,
    sender_id: DataTypes.INTEGER,
    newUserEmail: DataTypes.STRING,
  });

  return Invite;
};
