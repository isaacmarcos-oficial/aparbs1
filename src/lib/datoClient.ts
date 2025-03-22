import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('https://graphql.datocms.com/', {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
  },
});