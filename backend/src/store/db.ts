import { Pool, PoolClient } from 'pg';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../env';
import { Password } from '../services/password';
import { User } from '../models';

const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT || 5432,
});

const createTables = async (client: PoolClient): Promise<void> => {
  try {
    await client.query('BEGIN');
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          sku VARCHAR(50) NOT NULL,
          price INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          user_id INTEGER NOT NULL REFERENCES users(id),
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);
    await client.query('COMMIT');
    console.log('Tables created successfully');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error creating tables', e);
  }
};

const createUserAdmin = async (client: PoolClient) => {
  try {
    const admin = {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
    };
    const hashedPassword = await Password.toHash(admin.password);
    const user = await User.findByEmail(admin.email);
    if (!user) {
      await client.query(
        'INSERT INTO users (email, password, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [admin.email, hashedPassword, admin.role]
      );
    }

    console.log('User admin created');
  } catch (error) {
    console.log(error);
  }
};

export { pool, createTables, createUserAdmin };
