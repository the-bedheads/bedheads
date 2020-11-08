module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('surveys', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    q1response: DataTypes.STRING,
    q2response: DataTypes.STRING,
    q3response: DataTypes.STRING,
    q4response: DataTypes.STRING,
    q5response: DataTypes.STRING,
    q6response: DataTypes.STRING,
    q7response: DataTypes.STRING,
    q8response: DataTypes.STRING,
    q9response: DataTypes.STRING,
    q10response: DataTypes.STRING,
  }, { timestamps: false });
  Survey.associate = (models) => {
    Survey.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Survey;
};
