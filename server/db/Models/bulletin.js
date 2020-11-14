module.exports = (sequelize, DataTypes) => {
  const Bulletin = sequelize.define('bulletin', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
  });

  Bulletin.associate = (models) => {
    Bulletin.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });
  };

  return Bulletin;
};
