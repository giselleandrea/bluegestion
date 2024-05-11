import { buildSchema } from "graphql";

const schema = buildSchema(`

    type User {
        id: ID!
        name: String!
        password: String!
    }    

    type Query {
        getUsers: [User]
        gerUser(id: ID!): User
    }    

    type Mutation {
        createUser(name: String!, password: String!): User
        updateUser(name: String, password: String): User
        deleteUser(id: ID!): ID!
    }
    
`);

export default schema;