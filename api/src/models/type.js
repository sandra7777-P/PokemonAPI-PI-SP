const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Configuración de Sequelize

const Type = sequelize.define('Type', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Type;
