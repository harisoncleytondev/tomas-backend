import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  ssl: true,
  clientMinMessages: 'notice',
});

export const start = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Sequelize conectado com sucesso!');
    })
    .catch((err) => {
      console.log('Erro ao conectar Sequelize: ' + err);
    });

  sequelize
    .sync()
    .then(() => console.log('Sequelize sicronizou tabelas'))
    .catch((e) =>
      console.log(`Sequelize não conseguiu sicronizar tabelas: ${e}`)
    );
};

export default sequelize;
