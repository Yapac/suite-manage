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

export const dataProvider = createDataProvider(client, {
  getList: {
    dataMapper: (response, params) => {
      // Adjust this to match your actual response structure
      return response.data?.[params.resource] || [];
    },
    getTotalCount: (response, params) => {
      // If you have a total count, extract it here, otherwise return length
      return response.data?.[params.resource]?.length || 0;
    },
  },
});
/*  wsClient ? createLiveProvider(wsClient) : */
export const liveProvider = undefined;
