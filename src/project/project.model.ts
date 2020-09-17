import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { Project as ProjectType } from '../generated/graphql';

export class Project extends Base<ProjectType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'project');
  }
}
