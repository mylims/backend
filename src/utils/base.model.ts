import { MongoClient, Collection } from 'mongodb';

export class Base {
  protected db: Collection;

  public constructor(
    connection: MongoClient,
    db?: string,
    collection?: string,
  ) {
    this.db = connection.db(db).collection(collection || '');
  }

  public async getAll() {
    return this.db.find().toArray();
  }

  public async empty() {
    return this.db.drop();
  }
}
