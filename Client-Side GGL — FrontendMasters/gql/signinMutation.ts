import { gql } from "@urql/next";

export const SigninMutation = gql`
    mutation Mutation($input: AuthInput!) {
        signin(input: $input) {
            token
        }
    }
`;
