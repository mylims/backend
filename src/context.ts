import { MongoClient } from 'mongodb';

import { Experiment } from './experiment/experiment.model';
import { File } from './file/file.model';
import { Measurement } from './measurement/measurement.model';
import { Project } from './project/project.model';
import { Sample } from './sample/sample.model';
import { User } from './user/user.model';

export interface Models {
  experiment: Experiment;
  file: File;
  measurement: Measurement;
  project: Project;
  sample: Sample;
  user: User;
}

export interface Context {
  models: Models;
  db: MongoClient;
}

export interface Request {
  db: MongoClient;
}

type ContextFunc = (req: Request) => Promise<Context>;
export const context: ContextFunc = async ({ db }) => {
  return {
    models: {
      experiment: new Experiment(db),
      file: new File(db),
      measurement: new Measurement(db),
      project: new Project(db),
      sample: new Sample(db),
      user: new User(db),
    },
    db,
  };
};
