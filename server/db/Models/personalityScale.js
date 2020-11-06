module.exports = (sequelize, DataTypes) => {
  const PersonalityScale = sequelize.define('personalityScales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    openness: DataTypes.FLOAT,
    conscientiousness: DataTypes.FLOAT,
    extraversion: DataTypes.FLOAT,
    agreeableness: DataTypes.FLOAT,
    neuroticism: DataTypes.FLOAT,
  });

  PersonalityScale.associate = (models) => {
    PersonalityScale.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return PersonalityScale;
};
