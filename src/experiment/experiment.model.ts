import { MongoClient, ObjectID } from 'mongodb';

import { SampleType } from '../sample/sample.model';
import { Base } from '../utils/base.model';
import { Status } from '../utils/types';

export interface ExperimentType {
  _id: string | ObjectID;
  uuid: string;
  codeId: string;
  owners: string[];
  tags: string[];
  title: string;
  description?: string;
  creationDate: string;
  lastModificationDate?: string;
  status?: Status[];
  meta?: object;
  input?: SampleType[];
  output?: SampleType[];
  // components: [Component]
}

export class Experiment extends Base<ExperimentType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'experiment');
  }

  // Unique id searchers
  public async findByCodeId(codeId: string): Promise<ExperimentType | null> {
    return this.findOne({ codeId });
  }
  public async findByUuid(uuid: string): Promise<ExperimentType | null> {
    return this.findOne({ uuid });
  }

  // General searches
  public async findByOwner(owner: string): Promise<ExperimentType[] | null> {
    return this.findMany({ owners: owner });
  }
  public async findByTag(tag: string): Promise<ExperimentType[] | null> {
    return this.findMany({ tags: tag });
  }
  public async findByTitle(title: string): Promise<ExperimentType[] | null> {
    return this.findMany({ title });
  }
}
