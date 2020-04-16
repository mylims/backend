import merge from 'lodash.merge';

import { authorResolver } from './author';
import { postResolver } from './post';

export const resolvers = merge(authorResolver, postResolver);
