import { MongoClient, Collection } from 'mongodb';

export interface KindType {
  _id: string;
  name: string;
  description?: string;
  schema?: object;
}

export class Kind {
  private db: Collection<KindType>;

  public constructor(connection: MongoClient) {
    this.db = connection.db('mylims').collection('kind');
  }

  public async getAll() {
    return this.db.find().toArray();
  }

  public async empty() {
    return this.db.drop();
  }

  public async findById(_id: string) {
    return this.db.findOne({ _id });
  }

  public async findByName(name: string) {
    return this.db.find({ name }).toArray();
  }

  public async insertOne(kind: KindType) {
    return this.db.insertOne(kind);
  }
}
