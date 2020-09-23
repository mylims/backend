import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: Record<string, unknown> | Record<string, unknown>[];
}












export interface Status {
  __typename?: 'Status';
  kind: Scalars['String'];
  date: Scalars['String'];
  user?: Maybe<User>;
}

export interface StatusInput {
  kind: Scalars['String'];
  date?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
}

export interface Pagination {
  totalCount: Scalars['Int'];
}

export interface Query {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  experiment?: Maybe<Experiment>;
  experiments?: Maybe<ExperimentPage>;
  file?: Maybe<File>;
  files?: Maybe<Array<File>>;
  measurement?: Maybe<Measurement>;
  measurements: MeasurementPage;
  project?: Maybe<Project>;
  projects?: Maybe<ProjectPage>;
  sample?: Maybe<Sample>;
  samples: SamplePage;
  signin?: Maybe<AuthUser>;
  user?: Maybe<User>;
  users: UserPage;
}


export interface QueryExperimentArgs {
  _id: Scalars['String'];
}


export interface QueryExperimentsArgs {
  page: Scalars['Int'];
  filters: ExperimentFilters;
}


export interface QueryFileArgs {
  _id: Scalars['String'];
}


export interface QueryFilesArgs {
  page: Scalars['Int'];
  filters: FileFilters;
}


export interface QueryMeasurementArgs {
  _id: Scalars['String'];
}


export interface QueryMeasurementsArgs {
  page: Scalars['Int'];
  filters: MeasurementFilters;
}


export interface QueryProjectArgs {
  _id: Scalars['String'];
}


export interface QueryProjectsArgs {
  page: Scalars['Int'];
  filters: ProjectFilters;
}


export interface QuerySampleArgs {
  _id: Scalars['String'];
}


export interface QuerySamplesArgs {
  page: Scalars['Int'];
  filters: SampleFilters;
}


export interface QuerySigninArgs {
  email: Scalars['String'];
  password: Scalars['String'];
}


export interface QueryUserArgs {
  _id: Scalars['String'];
}


export interface QueryUsersArgs {
  page: Scalars['Int'];
  filters: UserFilters;
}

export interface Mutation {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  appendExperimentInput?: Maybe<Experiment>;
  appendExperimentOutput?: Maybe<Experiment>;
  appendMeasurementAttachment?: Maybe<File>;
  appendSampleAttachment?: Maybe<File>;
  appendSampleMeasurement?: Maybe<Measurement>;
  appendUserGroup: User;
  createExperiment?: Maybe<Experiment>;
  createFile?: Maybe<File>;
  createMeasurement?: Maybe<Measurement>;
  createProject?: Maybe<Project>;
  createSample?: Maybe<Sample>;
  createUser: AuthUser;
  updateExperiment?: Maybe<Experiment>;
  updateMeasurement?: Maybe<Measurement>;
  updateProject?: Maybe<Project>;
  updateSample?: Maybe<Sample>;
  updateUser: User;
}


export interface MutationAppendExperimentInputArgs {
  sampleId: Scalars['String'];
  experimentId: Scalars['String'];
}


export interface MutationAppendExperimentOutputArgs {
  sampleId: Scalars['String'];
  experimentId: Scalars['String'];
}


export interface MutationAppendMeasurementAttachmentArgs {
  fileId: Scalars['String'];
  measurementId: Scalars['String'];
}


export interface MutationAppendSampleAttachmentArgs {
  fileId: Scalars['String'];
  sampleId: Scalars['String'];
}


export interface MutationAppendSampleMeasurementArgs {
  measurementId: Scalars['String'];
  sampleId: Scalars['String'];
}


export interface MutationAppendUserGroupArgs {
  _id: Scalars['String'];
  group: Scalars['String'];
}


export interface MutationCreateExperimentArgs {
  experiment: ExperimentInput;
}


export interface MutationCreateFileArgs {
  file: FileInput;
}


export interface MutationCreateMeasurementArgs {
  measurement: MeasurementInput;
}


export interface MutationCreateProjectArgs {
  project: ProjectInput;
}


export interface MutationCreateSampleArgs {
  sample: SampleInput;
}


export interface MutationCreateUserArgs {
  user: UserInput;
}


export interface MutationUpdateExperimentArgs {
  _id: Scalars['String'];
  experiment: ExperimentInput;
}


export interface MutationUpdateMeasurementArgs {
  _id: Scalars['String'];
  measurement: MeasurementInput;
}


export interface MutationUpdateProjectArgs {
  _id: Scalars['String'];
  project: ProjectInput;
}


export interface MutationUpdateSampleArgs {
  _id: Scalars['String'];
  sample: SampleInput;
}


export interface MutationUpdateUserArgs {
  _id: Scalars['String'];
  user: UserInput;
}

export interface Experiment {
  __typename?: 'Experiment';
  _id: Scalars['String'];
  codeId: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Status>>;
  meta?: Maybe<Scalars['JSON']>;
  input?: Maybe<Array<Sample>>;
  output?: Maybe<Array<Sample>>;
  attachments?: Maybe<Array<File>>;
}

export interface ExperimentInput {
  codeId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<StatusInput>;
  meta?: Maybe<Scalars['JSON']>;
}

export interface ExperimentFilters {
  codeId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  statusDate?: Maybe<Scalars['String']>;
}

export interface ExperimentPage extends Pagination {
  __typename?: 'ExperimentPage';
  result?: Maybe<Array<Experiment>>;
  totalCount: Scalars['Int'];
}

export interface File {
  __typename?: 'File';
  _id: Scalars['String'];
  filename: Scalars['String'];
  hashname: Scalars['String'];
  mimetype: Scalars['String'];
  creationDate: Scalars['String'];
  signedUrl: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
}

export interface FileInput {
  filename: Scalars['String'];
  hashname: Scalars['String'];
  mimetype: Scalars['String'];
}

export interface FileFilters {
  filename?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
}

export interface Measurement {
  __typename?: 'Measurement';
  _id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Status>>;
  content?: Maybe<Scalars['JSON']>;
  attachement?: Maybe<Array<File>>;
  sample?: Maybe<Scalars['String']>;
}

export interface MeasurementInput {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<StatusInput>;
  content?: Maybe<Scalars['JSON']>;
}

export interface MeasurementFilters {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  statusDate?: Maybe<Scalars['String']>;
}

export interface MeasurementPage extends Pagination {
  __typename?: 'MeasurementPage';
  result?: Maybe<Array<Measurement>>;
  totalCount: Scalars['Int'];
}

export interface Project {
  __typename?: 'Project';
  _id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  owners?: Maybe<Array<User>>;
  tags?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<Array<Status>>;
  meta?: Maybe<Scalars['JSON']>;
  view?: Maybe<Scalars['JSON']>;
  experiments?: Maybe<Array<Experiment>>;
  samples?: Maybe<Array<Sample>>;
}

export interface ProjectInput {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<StatusInput>;
  meta?: Maybe<Scalars['JSON']>;
}

export interface ProjectFilters {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<Scalars['String']>;
  statusDate?: Maybe<Scalars['String']>;
}

export interface ProjectPage extends Pagination {
  __typename?: 'ProjectPage';
  result?: Maybe<Array<Project>>;
  totalCount: Scalars['Int'];
}

export interface SampleComment {
  __typename?: 'SampleComment';
  date?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description: Scalars['String'];
  user: Scalars['String'];
}

export interface SampleCommentInput {
  date?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description: Scalars['String'];
  user: Scalars['String'];
}

export interface SampleSummary {
  __typename?: 'SampleSummary';
  name: Scalars['String'];
  value: Scalars['String'];
  units: Scalars['String'];
}

export interface SampleSummaryInput {
  name: Scalars['String'];
  value: Scalars['String'];
  units: Scalars['String'];
}

export interface Sample {
  __typename?: 'Sample';
  _id: Scalars['String'];
  codeId: Scalars['String'];
  title: Scalars['String'];
  status?: Maybe<Array<Status>>;
  description?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<SampleComment>>;
  summary?: Maybe<Array<SampleSummary>>;
  attachments?: Maybe<Array<File>>;
  measurements?: Maybe<Array<Measurement>>;
}

export interface SampleInput {
  codeId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  status?: Maybe<StatusInput>;
  description?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<SampleCommentInput>>;
  summary?: Maybe<Array<SampleSummaryInput>>;
}

export interface SampleFilters {
  codeId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  statusDate?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
}

export interface SamplePage extends Pagination {
  __typename?: 'SamplePage';
  result?: Maybe<Array<Sample>>;
  totalCount: Scalars['Int'];
}

export enum Role {
  Admin = 'ADMIN',
  GroupAdmin = 'GROUP_ADMIN',
  Member = 'MEMBER'
}

export interface User {
  __typename?: 'User';
  _id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  role: Role;
  salt?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Scalars['String']>>;
}

export interface AuthUser {
  __typename?: 'AuthUser';
  token: Scalars['String'];
  user: User;
}

export interface UserInput {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
}

export interface UserFilters {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
}

export interface UserPage extends Pagination {
  __typename?: 'UserPage';
  result?: Maybe<Array<User>>;
  totalCount: Scalars['Int'];
}

export interface AdditionalEntityFields {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Status: ResolverTypeWrapper<Status>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StatusInput: StatusInput;
  Pagination: ResolversTypes['ExperimentPage'] | ResolversTypes['MeasurementPage'] | ResolversTypes['ProjectPage'] | ResolversTypes['SamplePage'] | ResolversTypes['UserPage'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Experiment: ResolverTypeWrapper<Experiment>;
  ExperimentInput: ExperimentInput;
  ExperimentFilters: ExperimentFilters;
  ExperimentPage: ResolverTypeWrapper<ExperimentPage>;
  File: ResolverTypeWrapper<File>;
  FileInput: FileInput;
  FileFilters: FileFilters;
  Measurement: ResolverTypeWrapper<Measurement>;
  MeasurementInput: MeasurementInput;
  MeasurementFilters: MeasurementFilters;
  MeasurementPage: ResolverTypeWrapper<MeasurementPage>;
  Project: ResolverTypeWrapper<Project>;
  ProjectInput: ProjectInput;
  ProjectFilters: ProjectFilters;
  ProjectPage: ResolverTypeWrapper<ProjectPage>;
  SampleComment: ResolverTypeWrapper<SampleComment>;
  SampleCommentInput: SampleCommentInput;
  SampleSummary: ResolverTypeWrapper<SampleSummary>;
  SampleSummaryInput: SampleSummaryInput;
  Sample: ResolverTypeWrapper<Sample>;
  SampleInput: SampleInput;
  SampleFilters: SampleFilters;
  SamplePage: ResolverTypeWrapper<SamplePage>;
  Role: Role;
  User: ResolverTypeWrapper<User>;
  AuthUser: ResolverTypeWrapper<AuthUser>;
  UserInput: UserInput;
  UserFilters: UserFilters;
  UserPage: ResolverTypeWrapper<UserPage>;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  JSON: Scalars['JSON'];
  Status: Status;
  String: Scalars['String'];
  StatusInput: StatusInput;
  Pagination: ResolversParentTypes['ExperimentPage'] | ResolversParentTypes['MeasurementPage'] | ResolversParentTypes['ProjectPage'] | ResolversParentTypes['SamplePage'] | ResolversParentTypes['UserPage'];
  Int: Scalars['Int'];
  Query: {};
  Mutation: {};
  Experiment: Experiment;
  ExperimentInput: ExperimentInput;
  ExperimentFilters: ExperimentFilters;
  ExperimentPage: ExperimentPage;
  File: File;
  FileInput: FileInput;
  FileFilters: FileFilters;
  Measurement: Measurement;
  MeasurementInput: MeasurementInput;
  MeasurementFilters: MeasurementFilters;
  MeasurementPage: MeasurementPage;
  Project: Project;
  ProjectInput: ProjectInput;
  ProjectFilters: ProjectFilters;
  ProjectPage: ProjectPage;
  SampleComment: SampleComment;
  SampleCommentInput: SampleCommentInput;
  SampleSummary: SampleSummary;
  SampleSummaryInput: SampleSummaryInput;
  Sample: Sample;
  SampleInput: SampleInput;
  SampleFilters: SampleFilters;
  SamplePage: SamplePage;
  User: User;
  AuthUser: AuthUser;
  UserInput: UserInput;
  UserFilters: UserFilters;
  UserPage: UserPage;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean'];
}>;

export type AuthDirectiveArgs = {   admin?: Maybe<Scalars['Boolean']>; };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdminDirectiveArgs = {  };

export type AdminDirectiveResolver<Result, Parent, ContextType = any, Args = AdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = ResolversObject<{
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ExperimentPage' | 'MeasurementPage' | 'ProjectPage' | 'SamplePage' | 'UserPage', ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<QueryExperimentArgs, '_id'>>;
  experiments?: Resolver<Maybe<ResolversTypes['ExperimentPage']>, ParentType, ContextType, RequireFields<QueryExperimentsArgs, 'page' | 'filters'>>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<QueryFileArgs, '_id'>>;
  files?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType, RequireFields<QueryFilesArgs, 'page' | 'filters'>>;
  measurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<QueryMeasurementArgs, '_id'>>;
  measurements?: Resolver<ResolversTypes['MeasurementPage'], ParentType, ContextType, RequireFields<QueryMeasurementsArgs, 'page' | 'filters'>>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, '_id'>>;
  projects?: Resolver<Maybe<ResolversTypes['ProjectPage']>, ParentType, ContextType, RequireFields<QueryProjectsArgs, 'page' | 'filters'>>;
  sample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<QuerySampleArgs, '_id'>>;
  samples?: Resolver<ResolversTypes['SamplePage'], ParentType, ContextType, RequireFields<QuerySamplesArgs, 'page' | 'filters'>>;
  signin?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<QuerySigninArgs, 'email' | 'password'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
  users?: Resolver<ResolversTypes['UserPage'], ParentType, ContextType, RequireFields<QueryUsersArgs, 'page' | 'filters'>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  appendExperimentInput?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationAppendExperimentInputArgs, 'sampleId' | 'experimentId'>>;
  appendExperimentOutput?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationAppendExperimentOutputArgs, 'sampleId' | 'experimentId'>>;
  appendMeasurementAttachment?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationAppendMeasurementAttachmentArgs, 'fileId' | 'measurementId'>>;
  appendSampleAttachment?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationAppendSampleAttachmentArgs, 'fileId' | 'sampleId'>>;
  appendSampleMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationAppendSampleMeasurementArgs, 'measurementId' | 'sampleId'>>;
  appendUserGroup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAppendUserGroupArgs, '_id' | 'group'>>;
  createExperiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationCreateExperimentArgs, 'experiment'>>;
  createFile?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationCreateFileArgs, 'file'>>;
  createMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationCreateMeasurementArgs, 'measurement'>>;
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'project'>>;
  createSample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<MutationCreateSampleArgs, 'sample'>>;
  createUser?: Resolver<ResolversTypes['AuthUser'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  updateExperiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationUpdateExperimentArgs, '_id' | 'experiment'>>;
  updateMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationUpdateMeasurementArgs, '_id' | 'measurement'>>;
  updateProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, '_id' | 'project'>>;
  updateSample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<MutationUpdateSampleArgs, '_id' | 'sample'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, '_id' | 'user'>>;
}>;

export type ExperimentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Experiment'] = ResolversParentTypes['Experiment']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<Array<ResolversTypes['Status']>>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  input?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  output?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  attachments?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ExperimentPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExperimentPage'] = ResolversParentTypes['ExperimentPage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Experiment']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hashname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MeasurementResolvers<ContextType = any, ParentType extends ResolversParentTypes['Measurement'] = ResolversParentTypes['Measurement']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<Array<ResolversTypes['Status']>>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  attachement?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType>;
  sample?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MeasurementPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeasurementPage'] = ResolversParentTypes['MeasurementPage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Measurement']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owners?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<Array<ResolversTypes['Status']>>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  view?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  experiments?: Resolver<Maybe<Array<ResolversTypes['Experiment']>>, ParentType, ContextType>;
  samples?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ProjectPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectPage'] = ResolversParentTypes['ProjectPage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SampleCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['SampleComment'] = ResolversParentTypes['SampleComment']> = ResolversObject<{
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SampleSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SampleSummary'] = ResolversParentTypes['SampleSummary']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  units?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SampleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sample'] = ResolversParentTypes['Sample']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<Array<ResolversTypes['Status']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<ResolversTypes['SampleComment']>>, ParentType, ContextType>;
  summary?: Resolver<Maybe<Array<ResolversTypes['SampleSummary']>>, ParentType, ContextType>;
  attachments?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType>;
  measurements?: Resolver<Maybe<Array<ResolversTypes['Measurement']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SamplePageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SamplePage'] = ResolversParentTypes['SamplePage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  salt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groups?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthUser'] = ResolversParentTypes['AuthUser']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPage'] = ResolversParentTypes['UserPage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  JSON?: GraphQLScalarType;
  Status?: StatusResolvers<ContextType>;
  Pagination?: PaginationResolvers;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Experiment?: ExperimentResolvers<ContextType>;
  ExperimentPage?: ExperimentPageResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Measurement?: MeasurementResolvers<ContextType>;
  MeasurementPage?: MeasurementPageResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectPage?: ProjectPageResolvers<ContextType>;
  SampleComment?: SampleCommentResolvers<ContextType>;
  SampleSummary?: SampleSummaryResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
  SamplePage?: SamplePageResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  AuthUser?: AuthUserResolvers<ContextType>;
  UserPage?: UserPageResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  admin?: AdminDirectiveResolver<any, any, ContextType>;
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';
export type StatusDbObject = {
  kind: string,
  date: string,
  user?: Maybe<UserDbObject['_id']>,
};

export type ExperimentDbObject = {
  _id: ObjectID,
  codeId: string,
  title: string,
  description?: Maybe<string>,
  status?: Maybe<Array<StatusDbObject>>,
  meta?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
  input?: Maybe<Array<SampleDbObject['_id']>>,
  output?: Maybe<Array<SampleDbObject['_id']>>,
  attachments?: Maybe<Array<FileDbObject['_id']>>,
};

export type FileDbObject = {
  _id: ObjectID,
  filename: string,
  hashname: string,
  mimetype: string,
  creationDate: string,
};

export type MeasurementDbObject = {
  _id: ObjectID,
  title: string,
  description?: Maybe<string>,
  status?: Maybe<Array<StatusDbObject>>,
  content?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
  attachement?: Maybe<Array<FileDbObject['_id']>>,
  sample?: Maybe<string>,
};

export type ProjectDbObject = {
  _id: ObjectID,
  title: string,
  description?: Maybe<string>,
  owners?: Maybe<Array<UserDbObject['_id']>>,
  tags?: Maybe<Array<string>>,
  status?: Maybe<Array<StatusDbObject>>,
  meta?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
  view?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
  experiments?: Maybe<Array<ExperimentDbObject['_id']>>,
  samples?: Maybe<Array<SampleDbObject['_id']>>,
};

export type SampleCommentDbObject = {
  date?: Maybe<string>,
  title: string,
  description: string,
  user: string,
};

export type SampleSummaryDbObject = {
  name: string,
  value: string,
  units: string,
};

export type SampleDbObject = {
  _id: ObjectID,
  codeId: string,
  title: string,
  status?: Maybe<Array<StatusDbObject>>,
  description?: Maybe<string>,
  comments?: Maybe<Array<SampleCommentDbObject>>,
  summary?: Maybe<Array<SampleSummaryDbObject>>,
  attachments?: Maybe<Array<FileDbObject['_id']>>,
  measurements?: Maybe<Array<MeasurementDbObject['_id']>>,
};

export type UserDbObject = {
  _id: ObjectID,
  name: string,
  email: string,
  role: string,
  salt?: Maybe<string>,
  hash?: Maybe<string>,
  groups?: Maybe<Array<string>>,
};
