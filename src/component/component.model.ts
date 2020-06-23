import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { Component as ComponentType } from '../generated/graphql';

export class Component extends Base<ComponentType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'component');
  }

  public findByParentId(id: string) {
    return this.findMany({ parent: id });
  }
}
