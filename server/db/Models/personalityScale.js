module.exports = (sequelize, DataTypes) => {
  const PersonalityScale = sequelize.define('personalityScales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    openness: DataTypes.FLOAT(3),
    conscientiousness: DataTypes.FLOAT(3),
    extraversion: DataTypes.FLOAT(3),
    agreeableness: DataTypes.FLOAT(3),
    neuroticism: DataTypes.FLOAT(3),
  });

  PersonalityScale.associate = (models) => {
    PersonalityScale.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return PersonalityScale;
};
