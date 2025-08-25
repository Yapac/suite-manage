import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";

import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = import.meta.env.VITE_WS_URL;

export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, option: RequestInit) => {
    try {
      return fetchWrapper(url, option);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

export const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");

          return {
            headers: accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : {},
          };
        },
      })
    : undefined;

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined;
