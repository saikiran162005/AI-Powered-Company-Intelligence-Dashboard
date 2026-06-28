import { query, queryOne, execute } from './connection';
import { v4 as uuidv4 } from 'uuid';

export interface Company {
  id: string;
  name: string;
  overview?: string;
  industry?: string;
  headquarters?: string;
  founder?: string;
  ceo?: string;
  revenue?: string;
  employees?: number;
  website?: string;
  data: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

export class CompanyRepository {
  async findById(id: string): Promise<Company | null> {
    return queryOne<Company>(
      'SELECT * FROM companies WHERE id = $1',
      [id]
    );
  }

  async findByName(name: string): Promise<Company | null> {
    return queryOne<Company>(
      'SELECT * FROM companies WHERE LOWER(name) = LOWER($1)',
      [name]
    );
  }

  async findAll(limit: number = 10, offset: number = 0): Promise<Company[]> {
    return query<Company>(
      'SELECT * FROM companies ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
  }

  async create(data: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company> {
    const id = uuidv4();
    const now = new Date();
    
    await execute(
      `INSERT INTO companies (id, name, overview, industry, headquarters, founder, ceo, revenue, employees, website, data, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        id,
        data.name,
        data.overview || null,
        data.industry || null,
        data.headquarters || null,
        data.founder || null,
        data.ceo || null,
        data.revenue || null,
        data.employees || null,
        data.website || null,
        JSON.stringify(data.data),
        now,
        now,
      ]
    );

    return {
      id,
      ...data,
      created_at: now,
      updated_at: now,
    };
  }

  async update(id: string, data: Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>): Promise<Company | null> {
    const now = new Date();
    const fields: string[] = [];
    const values: unknown[] = [id];
    let paramCount = 2;

    Object.entries(data).forEach(([key, value]) => {
      fields.push(`${key} = $${paramCount}`);
      values.push(value === undefined ? null : value);
      paramCount++;
    });

    fields.push(`updated_at = $${paramCount}`);
    values.push(now);

    if (fields.length === 1) {
      return this.findById(id);
    }

    await execute(
      `UPDATE companies SET ${fields.join(', ')} WHERE id = $1`,
      values
    );

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const rowsAffected = await execute(
      'DELETE FROM companies WHERE id = $1',
      [id]
    );
    return rowsAffected > 0;
  }

  async count(): Promise<number> {
    const result = await queryOne<{ count: string }>(
      'SELECT COUNT(*) as count FROM companies'
    );
    return result ? parseInt(result.count, 10) : 0;
  }
}

export const companyRepository = new CompanyRepository();
