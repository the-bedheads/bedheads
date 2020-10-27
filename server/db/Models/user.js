module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    swapCount: DataTypes.INTEGER,
    guestRating: DataTypes.FLOAT,
    hostRating: DataTypes.FLOAT,
    inviteCount: DataTypes.INTEGER,
  });

  return User;
};
