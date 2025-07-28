module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Profiles", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    }
  });
};