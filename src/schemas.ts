import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

import { baseSchema } from './base/base.schema';
import { experimentSchema } from './experiment/experiment.schema';
import { fileSchema } from './file/file.schema';
import { measurementSchema } from './measurement/measurement.schema';
import { projectSchema } from './project/project.schema';
import { sampleSchema } from './sample/sample.schema';
import { userSchema } from './user/user.schema';

export const typeDefs = [
  DIRECTIVES,
  baseSchema,
  experimentSchema,
  fileSchema,
  measurementSchema,
  projectSchema,
  sampleSchema,
  userSchema,
];
