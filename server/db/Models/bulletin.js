module.exports = (sequelize, DataTypes) => {
  const Bulletin = sequelize.define('bulletin', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: DataTypes.TEXT,
  });

  Bulletin.associate = (models) => {
    Bulletin.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Bulletin;
};
