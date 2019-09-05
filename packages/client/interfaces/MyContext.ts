import { NextPageContext } from "next"
import { ApolloClient, NormalizedCacheObject } from "apollo-boost"

export interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}
