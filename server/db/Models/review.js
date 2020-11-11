module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('reviews', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        guestRating: DataTypes.FLOAT,
        hostRating: DataTypes.FLOAT,
        guestComments: DataTypes.STRING,
        hostComments: DataTypes.STRING,
        completed: DataTypes.BOOLEAN,
    });
    Reviews.associate = (models) => {
        Reviews.belongsTo(models.User, { // Reviewer
            foreignKey: 'reviewerId',
        });
        Reviews.belongsTo(models.User, { // Reviewer
            foreignKey: 'revieweeId',
        });
        Reviews.belongsTo(models.Availability, { // The swapped room
            foreignKey: 'availabilityId',
        });
    };
    return Reviews;
};