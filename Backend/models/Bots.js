module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Bots", {
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
};
