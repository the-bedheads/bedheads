module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('reviews', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    guestRating: DataTypes.FLOAT,
    hostRating: DataTypes.FLOAT,
    guestComments: DataTypes.STRING(1234),
    hostComments: DataTypes.STRING(1234),
    completed: DataTypes.BOOLEAN,
  });
  Reviews.associate = (models) => {
    Reviews.belongsTo(models.User, { // Reviewee
      foreignKey: 'revieweeId',
    });
    Reviews.belongsTo(models.User, { // Reviewer
      foreignKey: 'reviewerId',
    });
    Reviews.belongsTo(models.Availability, { // The swapped room
      foreignKey: 'availabilityId',
    });
    Reviews.belongsTo(models.Listing, { // The listing profile id
      foreignKey: 'listingId',
    })
  };
  return Reviews;
};
