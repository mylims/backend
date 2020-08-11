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











export interface Pagination {
  totalCount: Scalars['Int'];
}

export interface Query {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  component?: Maybe<Component>;
  components: ComponentPage;
  experiment?: Maybe<Experiment>;
  experiments?: Maybe<ExperimentPage>;
  file?: Maybe<File>;
  files?: Maybe<Array<File>>;
  kind?: Maybe<Kind>;
  kinds: KindPage;
  measurement?: Maybe<Measurement>;
  measurements: MeasurementPage;
  sample?: Maybe<Sample>;
  samples: SamplePage;
  signin?: Maybe<AuthUser>;
  user?: Maybe<User>;
  users: UserPage;
}


export interface QueryComponentArgs {
  _id: Scalars['String'];
}


export interface QueryComponentsArgs {
  page: Scalars['Int'];
  filters: ComponentFilters;
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


export interface QueryKindArgs {
  _id: Scalars['String'];
}


export interface QueryKindsArgs {
  page: Scalars['Int'];
  filters: KindFilters;
}


export interface QueryMeasurementArgs {
  _id: Scalars['String'];
}


export interface QueryMeasurementsArgs {
  page: Scalars['Int'];
  filters: MeasurementFilters;
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
  appendComponentInput?: Maybe<Component>;
  appendComponentOutput?: Maybe<Component>;
  appendExperimentComponent?: Maybe<Component>;
  appendExperimentInput?: Maybe<Experiment>;
  appendExperimentOutput?: Maybe<Experiment>;
  appendMeasurementComponent?: Maybe<Component>;
  appendSampleComponent?: Maybe<Component>;
  appendSampleMeasurement?: Maybe<Measurement>;
  appendUserGroup: User;
  createComponent?: Maybe<Component>;
  createExperiment?: Maybe<Experiment>;
  createFile?: Maybe<File>;
  createKind: Kind;
  createMeasurement?: Maybe<Measurement>;
  createSample?: Maybe<Sample>;
  createUser: AuthUser;
  removeComponentInput?: Maybe<Component>;
  removeComponentOutput?: Maybe<Component>;
  updateComponent?: Maybe<Component>;
  updateExperiment?: Maybe<Experiment>;
  updateKind: Kind;
  updateMeasurement?: Maybe<Measurement>;
  updateSample?: Maybe<Sample>;
  updateUser: User;
}


export interface MutationAppendComponentInputArgs {
  parentId: Scalars['String'];
  childId: Scalars['String'];
}


export interface MutationAppendComponentOutputArgs {
  parentId: Scalars['String'];
  childId: Scalars['String'];
}


export interface MutationAppendExperimentComponentArgs {
  componentId: Scalars['String'];
  experimentId: Scalars['String'];
}


export interface MutationAppendExperimentInputArgs {
  sampleId: Scalars['String'];
  experimentId: Scalars['String'];
}


export interface MutationAppendExperimentOutputArgs {
  sampleId: Scalars['String'];
  experimentId: Scalars['String'];
}


export interface MutationAppendMeasurementComponentArgs {
  componentId: Scalars['String'];
  measurementId: Scalars['String'];
}


export interface MutationAppendSampleComponentArgs {
  componentId: Scalars['String'];
  sampleId: Scalars['String'];
}


export interface MutationAppendSampleMeasurementArgs {
  measurementId: Scalars['String'];
  sampleId: Scalars['String'];
}


export interface MutationAppendUserGroupArgs {
  _id: Scalars['String'];
  group: GroupInput;
}


export interface MutationCreateComponentArgs {
  component: ComponentInput;
}


export interface MutationCreateExperimentArgs {
  experiment: ExperimentInput;
}


export interface MutationCreateFileArgs {
  file: FileInput;
}


export interface MutationCreateKindArgs {
  kind: KindInput;
}


export interface MutationCreateMeasurementArgs {
  measurement: MeasurementInput;
}


export interface MutationCreateSampleArgs {
  sample: SampleInput;
}


export interface MutationCreateUserArgs {
  user: UserInput;
}


export interface MutationRemoveComponentInputArgs {
  parentId: Scalars['String'];
  childId: Scalars['String'];
}


export interface MutationRemoveComponentOutputArgs {
  parentId: Scalars['String'];
  childId: Scalars['String'];
}


export interface MutationUpdateComponentArgs {
  _id: Scalars['String'];
  component: ComponentInput;
}


export interface MutationUpdateExperimentArgs {
  _id: Scalars['String'];
  experiment: ExperimentInput;
}


export interface MutationUpdateKindArgs {
  _id: Scalars['String'];
  kind: KindInput;
}


export interface MutationUpdateMeasurementArgs {
  _id: Scalars['String'];
  measurement: MeasurementInput;
}


export interface MutationUpdateSampleArgs {
  _id: Scalars['String'];
  sample: SampleInput;
}


export interface MutationUpdateUserArgs {
  _id: Scalars['String'];
  user: UserInput;
}

export interface Component {
  __typename?: 'Component';
  _id: Scalars['String'];
  kind?: Maybe<Kind>;
  parent?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['JSON']>;
  input?: Maybe<Array<Component>>;
  output?: Maybe<Array<Component>>;
}

export interface ComponentInput {
  parent?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['JSON']>;
}

export interface ComponentFilters {
  kind: Scalars['String'];
}

export interface ComponentPage extends Pagination {
  __typename?: 'ComponentPage';
  result?: Maybe<Array<Component>>;
  totalCount: Scalars['Int'];
}

export interface Status {
  __typename?: 'Status';
  kind: Scalars['String'];
  date?: Maybe<Scalars['String']>;
}

export interface StatusInput {
  kind: Scalars['String'];
  date: Scalars['String'];
}

export interface Experiment {
  __typename?: 'Experiment';
  _id: Scalars['String'];
  codeId: Scalars['String'];
  owners?: Maybe<Array<User>>;
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  creationDate: Scalars['String'];
  lastModificationDate?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Status>>;
  meta?: Maybe<Scalars['JSON']>;
  input?: Maybe<Array<Sample>>;
  output?: Maybe<Array<Sample>>;
  components?: Maybe<Array<Component>>;
}

export interface ExperimentInput {
  codeId?: Maybe<Scalars['String']>;
  owners?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['String']>;
  lastModificationDate?: Maybe<Scalars['String']>;
  status?: Maybe<StatusInput>;
  meta?: Maybe<Scalars['JSON']>;
}

export interface ExperimentFilters {
  owners?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['String']>;
  lastModificationDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
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

export interface Kind {
  __typename?: 'Kind';
  _id: Scalars['String'];
  name: Scalars['String'];
  path?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  schema?: Maybe<Scalars['JSON']>;
}

export interface KindInput {
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  schema?: Maybe<Scalars['JSON']>;
}

export interface KindFilters {
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}

export interface KindPage extends Pagination {
  __typename?: 'KindPage';
  result?: Maybe<Array<Kind>>;
  totalCount: Scalars['Int'];
}

export interface Measurement {
  __typename?: 'Measurement';
  _id: Scalars['String'];
  sample?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Status>>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['JSON']>;
  components?: Maybe<Array<Component>>;
}

export interface MeasurementInput {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<StatusInput>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['JSON']>;
}

export interface MeasurementFilters {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
}

export interface MeasurementPage extends Pagination {
  __typename?: 'MeasurementPage';
  result?: Maybe<Array<Measurement>>;
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
  components?: Maybe<Array<Component>>;
  measurements?: Maybe<Array<Measurement>>;
}

export interface SampleInput {
  title?: Maybe<Scalars['String']>;
  status?: Maybe<StatusInput>;
  description?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<SampleCommentInput>>;
  summary?: Maybe<Array<SampleSummaryInput>>;
}

export interface SampleFilters {
  title?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
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

export enum Permissions {
  Read = 'READ',
  Write = 'WRITE'
}

export interface Group {
  __typename?: 'Group';
  name: Scalars['String'];
  permission: Permissions;
}

export interface GroupInput {
  name: Scalars['String'];
  permission: Permissions;
}

export interface User {
  __typename?: 'User';
  _id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  role: Role;
  salt?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Group>>;
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
  Pagination: ResolversTypes['ComponentPage'] | ResolversTypes['ExperimentPage'] | ResolversTypes['KindPage'] | ResolversTypes['MeasurementPage'] | ResolversTypes['SamplePage'] | ResolversTypes['UserPage'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  Component: ResolverTypeWrapper<Component>;
  ComponentInput: ComponentInput;
  ComponentFilters: ComponentFilters;
  ComponentPage: ResolverTypeWrapper<ComponentPage>;
  Status: ResolverTypeWrapper<Status>;
  StatusInput: StatusInput;
  Experiment: ResolverTypeWrapper<Experiment>;
  ExperimentInput: ExperimentInput;
  ExperimentFilters: ExperimentFilters;
  ExperimentPage: ResolverTypeWrapper<ExperimentPage>;
  File: ResolverTypeWrapper<File>;
  FileInput: FileInput;
  FileFilters: FileFilters;
  Kind: ResolverTypeWrapper<Kind>;
  KindInput: KindInput;
  KindFilters: KindFilters;
  KindPage: ResolverTypeWrapper<KindPage>;
  Measurement: ResolverTypeWrapper<Measurement>;
  MeasurementInput: MeasurementInput;
  MeasurementFilters: MeasurementFilters;
  MeasurementPage: ResolverTypeWrapper<MeasurementPage>;
  SampleComment: ResolverTypeWrapper<SampleComment>;
  SampleCommentInput: SampleCommentInput;
  SampleSummary: ResolverTypeWrapper<SampleSummary>;
  SampleSummaryInput: SampleSummaryInput;
  Sample: ResolverTypeWrapper<Sample>;
  SampleInput: SampleInput;
  SampleFilters: SampleFilters;
  SamplePage: ResolverTypeWrapper<SamplePage>;
  Role: Role;
  Permissions: Permissions;
  Group: ResolverTypeWrapper<Group>;
  GroupInput: GroupInput;
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
  Pagination: ResolversParentTypes['ComponentPage'] | ResolversParentTypes['ExperimentPage'] | ResolversParentTypes['KindPage'] | ResolversParentTypes['MeasurementPage'] | ResolversParentTypes['SamplePage'] | ResolversParentTypes['UserPage'];
  Int: Scalars['Int'];
  Query: {};
  String: Scalars['String'];
  Mutation: {};
  Component: Component;
  ComponentInput: ComponentInput;
  ComponentFilters: ComponentFilters;
  ComponentPage: ComponentPage;
  Status: Status;
  StatusInput: StatusInput;
  Experiment: Experiment;
  ExperimentInput: ExperimentInput;
  ExperimentFilters: ExperimentFilters;
  ExperimentPage: ExperimentPage;
  File: File;
  FileInput: FileInput;
  FileFilters: FileFilters;
  Kind: Kind;
  KindInput: KindInput;
  KindFilters: KindFilters;
  KindPage: KindPage;
  Measurement: Measurement;
  MeasurementInput: MeasurementInput;
  MeasurementFilters: MeasurementFilters;
  MeasurementPage: MeasurementPage;
  SampleComment: SampleComment;
  SampleCommentInput: SampleCommentInput;
  SampleSummary: SampleSummary;
  SampleSummaryInput: SampleSummaryInput;
  Sample: Sample;
  SampleInput: SampleInput;
  SampleFilters: SampleFilters;
  SamplePage: SamplePage;
  Group: Group;
  GroupInput: GroupInput;
  User: User;
  AuthUser: AuthUser;
  UserInput: UserInput;
  UserFilters: UserFilters;
  UserPage: UserPage;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean'];
}>;

export type AuthDirectiveArgs = {   role?: Maybe<Role>; };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ComponentPage' | 'ExperimentPage' | 'KindPage' | 'MeasurementPage' | 'SamplePage' | 'UserPage', ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  component?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<QueryComponentArgs, '_id'>>;
  components?: Resolver<ResolversTypes['ComponentPage'], ParentType, ContextType, RequireFields<QueryComponentsArgs, 'page' | 'filters'>>;
  experiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<QueryExperimentArgs, '_id'>>;
  experiments?: Resolver<Maybe<ResolversTypes['ExperimentPage']>, ParentType, ContextType, RequireFields<QueryExperimentsArgs, 'page' | 'filters'>>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<QueryFileArgs, '_id'>>;
  files?: Resolver<Maybe<Array<ResolversTypes['File']>>, ParentType, ContextType, RequireFields<QueryFilesArgs, 'page' | 'filters'>>;
  kind?: Resolver<Maybe<ResolversTypes['Kind']>, ParentType, ContextType, RequireFields<QueryKindArgs, '_id'>>;
  kinds?: Resolver<ResolversTypes['KindPage'], ParentType, ContextType, RequireFields<QueryKindsArgs, 'page' | 'filters'>>;
  measurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<QueryMeasurementArgs, '_id'>>;
  measurements?: Resolver<ResolversTypes['MeasurementPage'], ParentType, ContextType, RequireFields<QueryMeasurementsArgs, 'page' | 'filters'>>;
  sample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<QuerySampleArgs, '_id'>>;
  samples?: Resolver<ResolversTypes['SamplePage'], ParentType, ContextType, RequireFields<QuerySamplesArgs, 'page' | 'filters'>>;
  signin?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<QuerySigninArgs, 'email' | 'password'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
  users?: Resolver<ResolversTypes['UserPage'], ParentType, ContextType, RequireFields<QueryUsersArgs, 'page' | 'filters'>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  appendComponentInput?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationAppendComponentInputArgs, 'parentId' | 'childId'>>;
  appendComponentOutput?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationAppendComponentOutputArgs, 'parentId' | 'childId'>>;
  appendExperimentComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationAppendExperimentComponentArgs, 'componentId' | 'experimentId'>>;
  appendExperimentInput?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationAppendExperimentInputArgs, 'sampleId' | 'experimentId'>>;
  appendExperimentOutput?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationAppendExperimentOutputArgs, 'sampleId' | 'experimentId'>>;
  appendMeasurementComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationAppendMeasurementComponentArgs, 'componentId' | 'measurementId'>>;
  appendSampleComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationAppendSampleComponentArgs, 'componentId' | 'sampleId'>>;
  appendSampleMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationAppendSampleMeasurementArgs, 'measurementId' | 'sampleId'>>;
  appendUserGroup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAppendUserGroupArgs, '_id' | 'group'>>;
  createComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationCreateComponentArgs, 'component'>>;
  createExperiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationCreateExperimentArgs, 'experiment'>>;
  createFile?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<MutationCreateFileArgs, 'file'>>;
  createKind?: Resolver<ResolversTypes['Kind'], ParentType, ContextType, RequireFields<MutationCreateKindArgs, 'kind'>>;
  createMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationCreateMeasurementArgs, 'measurement'>>;
  createSample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<MutationCreateSampleArgs, 'sample'>>;
  createUser?: Resolver<ResolversTypes['AuthUser'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  removeComponentInput?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationRemoveComponentInputArgs, 'parentId' | 'childId'>>;
  removeComponentOutput?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationRemoveComponentOutputArgs, 'parentId' | 'childId'>>;
  updateComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationUpdateComponentArgs, '_id' | 'component'>>;
  updateExperiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationUpdateExperimentArgs, '_id' | 'experiment'>>;
  updateKind?: Resolver<ResolversTypes['Kind'], ParentType, ContextType, RequireFields<MutationUpdateKindArgs, '_id' | 'kind'>>;
  updateMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationUpdateMeasurementArgs, '_id' | 'measurement'>>;
  updateSample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<MutationUpdateSampleArgs, '_id' | 'sample'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, '_id' | 'user'>>;
}>;

export type ComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Component'] = ResolversParentTypes['Component']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kind?: Resolver<Maybe<ResolversTypes['Kind']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  input?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
  output?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ComponentPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComponentPage'] = ResolversParentTypes['ComponentPage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = ResolversObject<{
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ExperimentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Experiment'] = ResolversParentTypes['Experiment']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModificationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<Array<ResolversTypes['Status']>>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  input?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  output?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type KindResolvers<ContextType = any, ParentType extends ResolversParentTypes['Kind'] = ResolversParentTypes['Kind']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  schema?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type KindPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['KindPage'] = ResolversParentTypes['KindPage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Kind']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MeasurementResolvers<ContextType = any, ParentType extends ResolversParentTypes['Measurement'] = ResolversParentTypes['Measurement']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sample?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<Array<ResolversTypes['Status']>>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MeasurementPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeasurementPage'] = ResolversParentTypes['MeasurementPage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Measurement']>>, ParentType, ContextType>;
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
  components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType>;
  measurements?: Resolver<Maybe<Array<ResolversTypes['Measurement']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SamplePageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SamplePage'] = ResolversParentTypes['SamplePage']> = ResolversObject<{
  result?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Permissions'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  salt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groups?: Resolver<Maybe<Array<ResolversTypes['Group']>>, ParentType, ContextType>;
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
  Pagination?: PaginationResolvers;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Component?: ComponentResolvers<ContextType>;
  ComponentPage?: ComponentPageResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  Experiment?: ExperimentResolvers<ContextType>;
  ExperimentPage?: ExperimentPageResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Kind?: KindResolvers<ContextType>;
  KindPage?: KindPageResolvers<ContextType>;
  Measurement?: MeasurementResolvers<ContextType>;
  MeasurementPage?: MeasurementPageResolvers<ContextType>;
  SampleComment?: SampleCommentResolvers<ContextType>;
  SampleSummary?: SampleSummaryResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
  SamplePage?: SamplePageResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
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
export type ComponentDbObject = {
  _id: ObjectID,
  kind?: Maybe<KindDbObject['_id']>,
  parent?: Maybe<string>,
  content?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
  input?: Maybe<Array<ComponentDbObject['_id']>>,
  output?: Maybe<Array<ComponentDbObject['_id']>>,
};

export type StatusDbObject = {
  kind: string,
  date?: Maybe<string>,
};

export type ExperimentDbObject = {
  _id: ObjectID,
  codeId: string,
  owners?: Maybe<Array<UserDbObject['_id']>>,
  tags?: Maybe<Array<string>>,
  title: string,
  description?: Maybe<string>,
  creationDate: string,
  lastModificationDate?: Maybe<string>,
  status?: Maybe<Array<StatusDbObject>>,
  meta?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
  input?: Maybe<Array<SampleDbObject['_id']>>,
  output?: Maybe<Array<SampleDbObject['_id']>>,
  components?: Maybe<Array<ComponentDbObject['_id']>>,
};

export type FileDbObject = {
  _id: ObjectID,
  filename: string,
  hashname: string,
  mimetype: string,
  creationDate: string,
};

export type KindDbObject = {
  _id: ObjectID,
  name: string,
  path?: Maybe<Array<string>>,
  description?: Maybe<string>,
  schema?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
};

export type MeasurementDbObject = {
  _id: ObjectID,
  sample?: Maybe<string>,
  title: string,
  description?: Maybe<string>,
  status?: Maybe<Array<Status>>,
  startTime?: Maybe<string>,
  endTime?: Maybe<string>,
  content?: Maybe<Record<string, unknown> | Record<string, unknown>[]>,
  components?: Maybe<Array<ComponentDbObject['_id']>>,
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
  components?: Maybe<Array<ComponentDbObject['_id']>>,
  measurements?: Maybe<Array<MeasurementDbObject['_id']>>,
};

export type GroupDbObject = {};

export type UserDbObject = {
  _id: ObjectID,
  name: string,
  email: string,
  role: string,
  salt?: Maybe<string>,
  hash?: Maybe<string>,
  groups?: Maybe<Array<GroupDbObject>>,
};
