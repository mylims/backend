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

const PAGE_SIZE = 10;
export class Base<Model extends WithId, ModelInput, ModelFilter> {
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
    this.db = connection.db(db).collection<Model>(collection);
  }

  /**
   * Get all the elements in the collection
   */
  public async getAll(): Promise<Model[]> {
    return this.db.find<Model>().toArray();
  }

  /**
   * Empty the collection
   */
  public async drop(): Promise<boolean> {
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
  public async findById(id: string): Promise<Model | null> {
    const _id = new ObjectID(id);
    return this.db.findOne({ _id });
  }

  /**
   * Find single occurrence
   * @param query - MongoDB query object
   */
  public async findOne(query: FilterQuery<Model>): Promise<Model | null> {
    return this.db.findOne(query);
  }

  /**
   * Find several occurrences
   * @param filters - MongoDB query object
   */
  public async findMany(filters: FilterQuery<Model>): Promise<Model[] | null> {
    return this.db.find<Model>(filters).toArray();
  }

  public async findPaginated(
    page: number,
    filters: ModelFilter,
  ): Promise<Model[] | null> {
    return this.db
      .find<Model>(filters)
      .skip(page * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray();
  }

  /**
   * Insert one element
   * @param element - element to be inserted
   */
  public async insertOne(
    element: ModelInput,
  ): Promise<InsertOneWriteOpResult<Model>> {
    return this.db.insertOne(element);
  }

  public async updateOne(
    id: string,
    updater: Partial<Model>,
  ): Promise<FindAndModifyWriteOpResultObject<Model>> {
    const _id = new ObjectID(id);

    // remove null values to updater
    let noNulls: Partial<Model> = {};
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

  public async append(
    id: string,
    updater: { [k: string]: string },
  ): Promise<FindAndModifyWriteOpResultObject<Model>> {
    const _id = new ObjectID(id);
    return this.db.findOneAndUpdate(
      { _id },
      { $push: updater },
      { returnOriginal: false },
    );
  }

  public async pop(
    id: string,
    updater: { [k: string]: string },
  ): Promise<FindAndModifyWriteOpResultObject<Model>> {
    const _id = new ObjectID(id);
    return this.db.findOneAndUpdate(
      { _id },
      { $pull: updater },
      { returnOriginal: false },
    );
  }
}
