import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.js';

const Log = sequelize.define(
  'Log',
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    action: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

export default Log;