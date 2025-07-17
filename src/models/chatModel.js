import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.js';

const Chat = sequelize.define(
  'Chat',
  {
    chat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    chat_title: {
      type: DataTypes.STRING,
      defaultValue: 'Novo chat',
    },

    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'chats',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Chat;