import { QueryResult } from 'pg';
import { pool } from '../store/db';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { Password } from '../services/password';

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

interface CreateUser {
  email: string;
  password: string;
  role: string;
}

export const create = async (user: CreateUser): Promise<User> => {
  try {
    const hashedPassword = await Password.toHash(user.password);

    const result: QueryResult = await pool.query(
      'INSERT INTO users (email, password, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [user.email, hashedPassword, user.role]
    );
    return result.rows[0];
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const find = async (): Promise<User[]> => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const findById = async (id: number): Promise<User | null> => {
  try {
    const result: QueryResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const findByEmail = async (email: string): Promise<User | null> => {
  try {
    const result: QueryResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (result.rowCount === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const remove = async (id: number): Promise<boolean> => {
  try {
    const result: QueryResult = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return result.rowCount > 0;
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};
