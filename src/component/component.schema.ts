import { gql } from 'apollo-server-fastify';

export const componentSchema = gql`
  type Component @entity {
    _id: String! @id
    kind: Kind @link
    parent: String @link
    content: JSON @column
    input: [Component!] @link
    output: [Component!] @link
  }

  input ComponentInput {
    parent: String
    kind: String
    content: JSON
  }

  input ComponentFilters {
    kind: String!
    content: JSON
  }

  extend type Query {
    component(_id: String!): Component
    components(page: Int!, filters: ComponentFilters!): [Component!]
  }

  extend type Mutation {
    createComponent(component: ComponentInput!): Component
    updateComponent(_id: String!, component: ComponentInput!): Component

    appendComponentInput(parentId: String!, childId: String!): Component
    appendComponentOutput(parentId: String!, childId: String!): Component
    removeComponentInput(parentId: String!, childId: String!): Component
    removeComponentOutput(parentId: String!, childId: String!): Component
  }
`;
