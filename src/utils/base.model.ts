import { MongoClient, Collection, FilterQuery } from 'mongodb';

export class Base<T> {
  protected db: Collection;

  /**
   * Instantiates the collection connection
   * @param connection - Connection with the MongoDB server
   * @param db - Database name
   * @param collection - Collection name
   */
  public constructor(
    connection: MongoClient,
    db?: string,
    collection?: string,
  ) {
    if (!(db && collection)) {
      throw Error('DB and collection names are required');
    }
    this.db = connection.db(db).collection(collection);
  }

  /**
   * Get all the elements in the collection
   */
  public async getAll(): Promise<T[]> {
    return this.db.find().toArray();
  }

  /**
   * Empty the collection
   */
  public async empty() {
    return this.db.drop();
  }

  /**
   * Search by id key
   * @param _id - MongoDB unique id
   */
  public async findById(_id: string): Promise<T | null> {
    return this.db.findOne({ _id });
  }

  /**
   * Find single occurrence
   * @param query - MongoDB query object
   */
  public async findOne(query: FilterQuery<T>): Promise<T | null> {
    return this.db.findOne(query);
  }

  /**
   * Find several occurrences
   * @param query - MongoDB query object
   */
  public async findMany(query: FilterQuery<T>): Promise<T[] | null> {
    return this.db.find(query).toArray();
  }

  /**
   * Insert one element
   * @param element - element to be inserted
   */
  public async insertOne(element: T): Promise<unknown> {
    return this.db.insertOne(element);
  }

  public async updateOne(_id: string, updater: Partial<T>): Promise<unknown> {
    return this.db.updateOne({ _id }, { $set: updater });
  }
}
