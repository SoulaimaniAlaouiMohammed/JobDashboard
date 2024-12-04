const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobOpportunity = sequelize.define('JobOpportunity', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  jobLink: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true,
    },
  },

  type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  domain: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  companySize: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = JobOpportunity;
