import { Client, fetchExchange } from "@urql/core";
import createDataProvider, { createLiveProvider } from "@refinedev/graphql";

import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = import.meta.env.VITE_WS_URL;

export const client = new Client({
  url: API_URL,
  exchanges: [fetchExchange],
  // fetch: fetchWrapper,
  fetchOptions: () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
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

export const dataProvider = createDataProvider(client);
export const liveProvider = wsClient ? createLiveProvider(wsClient) : undefined;
