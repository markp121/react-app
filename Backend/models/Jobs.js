module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define("Jobs", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Jobs.associate = (models) => {
    Jobs.belongsToMany(models.Bots, { through: models.JobsBots });
  };
  return Jobs;
};
