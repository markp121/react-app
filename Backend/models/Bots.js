module.exports = (sequelize, DataTypes) => {
  const Bots = sequelize.define("Bots", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    task: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: "Stopped",
    },
  });
  Bots.associate = (models) => {
    Bots.belongsToMany(models.Jobs, { through: models.JobsBots });
  };
  return Bots;
};
