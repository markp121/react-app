module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "JobsBots",
    {},
    {
      timestamps: false,
    },
  );
};
