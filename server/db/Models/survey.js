module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('survey', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
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

  return Survey;
};
