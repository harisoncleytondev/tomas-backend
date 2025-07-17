import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.js';

const Messages = sequelize.define(
  'Messages',
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    message_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    is_bot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'messages',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Messages;