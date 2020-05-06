import {
  MongoClient,
  Collection,
  FilterQuery,
  InsertOneWriteOpResult,
  FindAndModifyWriteOpResultObject,
  ObjectID,
} from 'mongodb';

interface WithId {
  _id: string | number | ObjectID;
}

export class Base<T extends WithId> {
  protected db: Collection;
  private names: { db?: string; collection?: string };

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
    this.names = { db, collection };
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
  public async empty(): Promise<boolean> {
    try {
      await this.db.drop();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Search by id key
   * @param id - MongoDB unique id
   */
  public async findById(id: string): Promise<T | null> {
    const _id = new ObjectID(id);
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
  public async insertOne(element: T): Promise<InsertOneWriteOpResult<T>> {
    return this.db.insertOne(element);
  }

  public async updateOne(
    id: string,
    updater: Partial<T>,
  ): Promise<FindAndModifyWriteOpResultObject<T>> {
    const _id = new ObjectID(id);

    // remove null values to updater
    let noNulls: Partial<T> = {};
    for (const prop in updater) {
      if (updater[prop] !== null && updater[prop] !== undefined) {
        noNulls[prop] = updater[prop];
      }
    }
    return this.db.findOneAndUpdate(
      { _id },
      { $set: noNulls },
      { returnOriginal: false },
    );
  }

  public async appendTo(
    id: string,
    updater: { [k: string]: string },
  ): Promise<FindAndModifyWriteOpResultObject<T>> {
    const _id = new ObjectID(id);
    return this.db.findOneAndUpdate(
      { _id },
      { $push: updater },
      { returnOriginal: false },
    );
  }

  public async removeTo(
    id: string,
    updater: { [k: string]: string },
  ): Promise<FindAndModifyWriteOpResultObject<T>> {
    const _id = new ObjectID(id);
    return this.db.findOneAndUpdate(
      { _id },
      { $pull: updater },
      { returnOriginal: false },
    );
  }
}
