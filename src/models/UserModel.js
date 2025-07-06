import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  subscription_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'free'
  },
  subscription_expires_at: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  preferences: {
    type: DataTypes.JSONB,
    allowNull: true
  },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default User;
