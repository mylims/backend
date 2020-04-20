/* eslint-disable no-process-env */
/* istanbul ignore file */
import { MongoClient } from 'mongodb';

const test: string | undefined = process.env.MONGO_URL;
const user: string | undefined = process.env.DB_USER;
const pwd: string | undefined = process.env.DB_PWD;
const host: string = process.env.DB_HOST || 'localhost';
const port: string = process.env.DB_PORT || '27017';

// Database manipulator that should be used in the models
export class DbConnector {
  private connection?: MongoClient;

  /**
   * Connects to the database from the environmental variables
   */
  public async connect() {
    // Only creates a new connection if there wasn't already one
    if (!this.connection) {
      let url = `${host}:${port}`;
      if (user && pwd) {
        url = `${user}:${pwd}@${url}/?authSource=admin`;
      }
      this.connection = await MongoClient.connect(test || `mongodb://${url}`);
    }
    return this.connection;
  }

  /**
   * Finishes the current connection
   */
  public disconnect() {
    if (this.connection) {
      return this.connection.close();
    }
  }

  /**
   * Connects with an specific database
   * @param dbName - Name to the database to connect
   */
  public async db(dbName: string) {
    const connection = await this.connect();
    return connection.db(dbName);
  }

  /**
   * Connect to an specific collection
   * @param dbName - Name of the database to connect
   * @param collection - Name of the collection to connect
   */
  public async collection(dbName: string, collection: string) {
    const db = await this.db(dbName);
    return db.collection(collection);
  }
}
