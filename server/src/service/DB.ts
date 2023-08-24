import { MongoMemoryServer } from 'mongodb-memory-server';
import { Db, MongoClient } from 'mongodb';

export class DB {
  private static instance: Db | null = null;
  private static client: MongoClient | null = null;

  private constructor() {}

  static async getDB(): Promise<Db> {
    if (DB.instance) {
      console.info('Returning existing Db instance');
      return DB.instance;
    }

    console.info('Will create Db');

    const mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    const client = new MongoClient(uri);
    DB.client = client;

    const db = client.db();
    DB.instance = db;

    console.info('Db created');

    return db;
  }

  static async close() {
    if (DB.client) {
      await DB.client.close()
    }
  }
}
