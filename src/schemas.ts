import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

import { baseSchema } from './base/base.schema';
import { componentSchema } from './component/component.schema';
import { experimentSchema } from './experiment/experiment.schema';
import { fileSchema } from './file/file.schema';
import { kindSchema } from './kind/kind.schema';
import { measurementSchema } from './measurement/measurement.schema';
import { sampleSchema } from './sample/sample.schema';
import { userSchema } from './user/user.schema';

export const typeDefs = [
  DIRECTIVES,
  baseSchema,
  componentSchema,
  experimentSchema,
  fileSchema,
  kindSchema,
  measurementSchema,
  sampleSchema,
  userSchema,
];
