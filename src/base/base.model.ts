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
export class Base<Model extends WithId> {
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
  public async findById(
    id: string | Model | ObjectID | null | undefined,
  ): Promise<Model | null> {
    if (id) {
      const _id =
        typeof id === 'string' || id instanceof ObjectID ? id : id._id;
      return this.db.findOne({ _id: new ObjectID(_id) });
    } else {
      return Promise.resolve(null);
    }
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
  public async findMany(
    filters: FilterQuery<Model> | Record<string, ObjectID>,
  ): Promise<Model[] | null> {
    return this.db.find<Model>(filters).toArray();
  }

  public async findPaginated<ModelFilter>(
    page: number,
    filters: ModelFilter,
  ): Promise<{ result: Model[] | null; totalCount: number }> {
    const query = this.db.find<Model>(filters);
    return {
      result: await query
        .skip(page * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .toArray(),
      totalCount: await query.count(),
    };
  }

  /**
   * Insert one element
   * @param element - element to be inserted
   */
  public async insertOne<ModelInput>(
    element: ModelInput,
  ): Promise<InsertOneWriteOpResult<Model>> {
    return this.db.insertOne(element);
  }

  public async updateOne<ModelInput>(
    id: string,
    updater: ModelInput,
  ): Promise<FindAndModifyWriteOpResultObject<Model>> {
    const _id = new ObjectID(id);
    return this.db.findOneAndUpdate(
      { _id },
      { $set: updater },
      { returnOriginal: false },
    );
  }

  public async append(
    id: string,
    updater: Record<string, unknown>,
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
