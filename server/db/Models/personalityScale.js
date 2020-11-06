module.exports = (sequelize, DataTypes) => {
  const PersonalityScale = sequelize.define('listing', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    openness: DataTypes.float,
    conscientiousness: DataTypes.float,
    extraversion: DataTypes.float,
    agreeableness: DataTypes.float,
    neuroticism: DataTypes.float,
  });

  PersonalityScale.associate = (models) => {
    PersonalityScale.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return PersonalityScale;
};
