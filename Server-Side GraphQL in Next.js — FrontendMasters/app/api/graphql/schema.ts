const schema = `#graphql

    union SearchResult = Tweet | Profile

    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Tweet {
        id: ID!
        text: String!
        author: User!
    }

    type Profile {
        id: ID!
        bio: String
        avatarUrl: String
    }

    interface Character {
        name: String!
        age: Int!
        height: Float!
    }

    type Person implements Character {
        name: String!
        age: Int!
        height: Float!
        backgroundStory: String!
    }

    type Droid implements Character {
        name: String!
        age: Int!
        height: Float!
        primaryFunction: String!
    }

    type Query {
        me: Person!
        characters: [Character!]! # Non-nullable list of non-nullable Character
        search: [SearchResult!]!
    }
`;

export default schema;
