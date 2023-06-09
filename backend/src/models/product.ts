import { QueryResult } from 'pg';
import { pool } from '../store/db';
import { DatabaseConnectionError } from '../errors/database-connection-error';

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  createdAt: Date;
}

interface CreateProduct {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  user_id: number;
}

export interface FindParams {
  limit?: number;
  offset?: number;
  minPrice?: number;
  maxPrice?: number;
  key?: string;
  user_id?: number;
}

export const create = async (product: CreateProduct): Promise<Product> => {
  try {
    const result: QueryResult = await pool.query(
      'INSERT INTO products (name, sku, quantity, price, user_id, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [
        product.name,
        product.sku,
        product.quantity,
        product.price,
        product.user_id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const find = async (params?: FindParams): Promise<Product[]> => {
  try {
    const { limit, offset, minPrice, maxPrice, key } = params || {};
    let query = 'SELECT * FROM products';
    const values = [];

    if (minPrice) {
      query += ' WHERE price >= $1';
      values.push(minPrice);
    }

    if (maxPrice) {
      const paramIndex = values.length + 1;
      const operator = minPrice ? 'AND' : 'WHERE';
      query += ` ${operator} price <= $${paramIndex}`;
      values.push(maxPrice);
    }

    if (key) {
      const paramIndex = values.length + 1;
      const operator = minPrice || maxPrice ? 'AND' : 'WHERE';
      query += ` ${operator} (LOWER(sku) = LOWER($${paramIndex}) OR LOWER(name) = LOWER($${paramIndex}))`;
      values.push(key);
    }

    if (limit) {
      const paramIndex = values.length + 1;
      query += ` LIMIT $${paramIndex}`;
      values.push(limit);
    }

    if (offset) {
      const paramIndex = values.length + 1;
      query += ` OFFSET $${paramIndex}`;
      values.push(offset);
    }

    const result: QueryResult = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const findAsAdmin = async (params?: FindParams): Promise<Product[]> => {
  try {
    const { limit, offset, user_id } = params || {};
    let query =
      'SELECT P.id, P.sku, P.name, P.price, P.quantity, U.email FROM products AS P INNER JOIN users AS U ON P.user_id=U.id';
    const values = [];

    if (user_id) {
      query += ' WHERE P.user_id = $1';
      values.push(user_id);
    }

    if (limit) {
      const paramIndex = values.length + 1;
      query += ` LIMIT $${paramIndex}`;
      values.push(limit);
    }

    if (offset) {
      const paramIndex = values.length + 1;
      query += ` OFFSET $${paramIndex}`;
      values.push(offset);
    }

    const result: QueryResult = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const findById = async (id: number): Promise<Product | null> => {
  try {
    const result: QueryResult = await pool.query(
      'SELECT * FROM products WHERE id = $1',
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

export const findBySeller = async (
  user_id: number
): Promise<Product[] | []> => {
  try {
    const result: QueryResult = await pool.query(
      'SELECT * FROM products WHERE user_id = $1',
      [user_id]
    );
    if (result.rowCount === 0) {
      return [];
    } else {
      return result.rows;
    }
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

export const remove = async (id: number): Promise<boolean> => {
  try {
    const result: QueryResult = await pool.query(
      'DELETE FROM products WHERE id = $1',
      [id]
    );
    return result.rowCount > 0;
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};
