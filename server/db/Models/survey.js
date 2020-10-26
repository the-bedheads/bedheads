module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('survey', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    q1Response: DataTypes.STRING,
    q2Response: DataTypes.STRING,
    q3Response: DataTypes.STRING,
    q4Response: DataTypes.STRING,
    q5Response: DataTypes.STRING,
    q6Response: DataTypes.STRING,
    q7Response: DataTypes.STRING,
    q8Response: DataTypes.STRING,
    q9Response: DataTypes.STRING,
    q10Response: DataTypes.STRING,
  });
  Survey.associate = (models) => {
    Survey.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Survey;
};
