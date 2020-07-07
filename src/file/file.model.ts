import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { File as FileType } from '../generated/graphql';

export class File extends Base<FileType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'file');
  }
}
