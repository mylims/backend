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










export interface Query {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  component?: Maybe<Component>;
  components?: Maybe<Array<Component>>;
  experiment?: Maybe<Experiment>;
  experiments?: Maybe<Array<Experiment>>;
  kind?: Maybe<Kind>;
  kinds?: Maybe<Array<Kind>>;
  measurement?: Maybe<Measurement>;
  measurements?: Maybe<Array<Measurement>>;
  sample?: Maybe<Sample>;
  samples?: Maybe<Array<Sample>>;
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
  createComponent?: Maybe<Component>;
  createExperiment?: Maybe<Experiment>;
  createKind: Kind;
  createMeasurement?: Maybe<Measurement>;
  createSample?: Maybe<Sample>;
  removeComponentInput?: Maybe<Component>;
  removeComponentOutput?: Maybe<Component>;
  updateComponent?: Maybe<Component>;
  updateExperiment?: Maybe<Experiment>;
  updateKind: Kind;
  updateMeasurement?: Maybe<Measurement>;
  updateSample?: Maybe<Sample>;
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


export interface MutationCreateComponentArgs {
  component: ComponentInput;
}


export interface MutationCreateExperimentArgs {
  experiment: ExperimentInput;
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
  content?: Maybe<Scalars['JSON']>;
}

export interface Status {
  __typename?: 'Status';
  kind: Scalars['String'];
  date?: Maybe<Scalars['String']>;
}

export interface StatusInput {
  kind?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
}

export interface Experiment {
  __typename?: 'Experiment';
  _id: Scalars['String'];
  codeId: Scalars['String'];
  owners?: Maybe<Array<Scalars['String']>>;
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
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Component: ResolverTypeWrapper<Component>;
  ComponentInput: ComponentInput;
  ComponentFilters: ComponentFilters;
  Status: ResolverTypeWrapper<Status>;
  StatusInput: StatusInput;
  Experiment: ResolverTypeWrapper<Experiment>;
  ExperimentInput: ExperimentInput;
  ExperimentFilters: ExperimentFilters;
  Kind: ResolverTypeWrapper<Kind>;
  KindInput: KindInput;
  KindFilters: KindFilters;
  Measurement: ResolverTypeWrapper<Measurement>;
  MeasurementInput: MeasurementInput;
  MeasurementFilters: MeasurementFilters;
  SampleComment: ResolverTypeWrapper<SampleComment>;
  SampleCommentInput: SampleCommentInput;
  SampleSummary: ResolverTypeWrapper<SampleSummary>;
  SampleSummaryInput: SampleSummaryInput;
  Sample: ResolverTypeWrapper<Sample>;
  SampleInput: SampleInput;
  SampleFilters: SampleFilters;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  JSON: Scalars['JSON'];
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  Mutation: {};
  Component: Component;
  ComponentInput: ComponentInput;
  ComponentFilters: ComponentFilters;
  Status: Status;
  StatusInput: StatusInput;
  Experiment: Experiment;
  ExperimentInput: ExperimentInput;
  ExperimentFilters: ExperimentFilters;
  Kind: Kind;
  KindInput: KindInput;
  KindFilters: KindFilters;
  Measurement: Measurement;
  MeasurementInput: MeasurementInput;
  MeasurementFilters: MeasurementFilters;
  SampleComment: SampleComment;
  SampleCommentInput: SampleCommentInput;
  SampleSummary: SampleSummary;
  SampleSummaryInput: SampleSummaryInput;
  Sample: Sample;
  SampleInput: SampleInput;
  SampleFilters: SampleFilters;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean'];
}>;

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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  component?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<QueryComponentArgs, '_id'>>;
  components?: Resolver<Maybe<Array<ResolversTypes['Component']>>, ParentType, ContextType, RequireFields<QueryComponentsArgs, 'page' | 'filters'>>;
  experiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<QueryExperimentArgs, '_id'>>;
  experiments?: Resolver<Maybe<Array<ResolversTypes['Experiment']>>, ParentType, ContextType, RequireFields<QueryExperimentsArgs, 'page' | 'filters'>>;
  kind?: Resolver<Maybe<ResolversTypes['Kind']>, ParentType, ContextType, RequireFields<QueryKindArgs, '_id'>>;
  kinds?: Resolver<Maybe<Array<ResolversTypes['Kind']>>, ParentType, ContextType, RequireFields<QueryKindsArgs, 'page' | 'filters'>>;
  measurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<QueryMeasurementArgs, '_id'>>;
  measurements?: Resolver<Maybe<Array<ResolversTypes['Measurement']>>, ParentType, ContextType, RequireFields<QueryMeasurementsArgs, 'page' | 'filters'>>;
  sample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<QuerySampleArgs, '_id'>>;
  samples?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType, RequireFields<QuerySamplesArgs, 'page' | 'filters'>>;
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
  createComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationCreateComponentArgs, 'component'>>;
  createExperiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationCreateExperimentArgs, 'experiment'>>;
  createKind?: Resolver<ResolversTypes['Kind'], ParentType, ContextType, RequireFields<MutationCreateKindArgs, 'kind'>>;
  createMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationCreateMeasurementArgs, 'measurement'>>;
  createSample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<MutationCreateSampleArgs, 'sample'>>;
  removeComponentInput?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationRemoveComponentInputArgs, 'parentId' | 'childId'>>;
  removeComponentOutput?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationRemoveComponentOutputArgs, 'parentId' | 'childId'>>;
  updateComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType, RequireFields<MutationUpdateComponentArgs, '_id' | 'component'>>;
  updateExperiment?: Resolver<Maybe<ResolversTypes['Experiment']>, ParentType, ContextType, RequireFields<MutationUpdateExperimentArgs, '_id' | 'experiment'>>;
  updateKind?: Resolver<ResolversTypes['Kind'], ParentType, ContextType, RequireFields<MutationUpdateKindArgs, '_id' | 'kind'>>;
  updateMeasurement?: Resolver<Maybe<ResolversTypes['Measurement']>, ParentType, ContextType, RequireFields<MutationUpdateMeasurementArgs, '_id' | 'measurement'>>;
  updateSample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<MutationUpdateSampleArgs, '_id' | 'sample'>>;
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

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = ResolversObject<{
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ExperimentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Experiment'] = ResolversParentTypes['Experiment']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
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

export type KindResolvers<ContextType = any, ParentType extends ResolversParentTypes['Kind'] = ResolversParentTypes['Kind']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  schema?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = ResolversObject<{
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Component?: ComponentResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  Experiment?: ExperimentResolvers<ContextType>;
  Kind?: KindResolvers<ContextType>;
  Measurement?: MeasurementResolvers<ContextType>;
  SampleComment?: SampleCommentResolvers<ContextType>;
  SampleSummary?: SampleSummaryResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
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
  owners?: Maybe<Array<string>>,
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