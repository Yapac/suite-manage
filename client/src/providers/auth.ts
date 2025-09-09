import { AuthProvider } from "@refinedev/core";
import { client } from "./data";

export const authCredentials = {
  email: "michael.scott@yapacdev.com",
  password: "demodemo",
};

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
      role
    }
  }
`;

const ME_QUERY = `
  query Me {
    me {
      id
      name
      email
      phone
      role
      avatarUrl
    }
  }
`;

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const result = await client
      .mutation(LOGIN_MUTATION, { email, password })
      .toPromise();

    if (result.error) {
      return {
        success: false,
        error: {
          name: "AuthenticationError",
          message: result.error.message ?? "Login failed",
        },
      };
    }

    const token = result.data?.login?.accessToken;
    const role = result.data?.login?.role;
    if (!token) {
      return {
        success: false,
        error: {
          name: "AuthenticationError",
          message: "No token returned",
        },
      };
    }

    localStorage.setItem("access_token", token);
    localStorage.setItem("role", role);

    return { success: true, redirectTo: "/" };
  },

  logout: async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    // This will include Authorization automatically via fetchWrapper
    const result = await client.query(ME_QUERY, {}).toPromise();

    if (result.data?.me) {
      return { authenticated: true };
    }

    return { authenticated: false, redirectTo: "/login" };
  },

  getIdentity: async () => {
    const token = localStorage.getItem("access_token");

    if (!token) return undefined;

    const result = await client.query(ME_QUERY, {}).toPromise();
    if (result.error) {
      return undefined;
    }
    return result.data?.me ?? undefined;
  },

  onError: async (error) => {
    // Optional: handle GraphQL UNAUTHENTICATED codes if you attach them
    if ((error as any)?.statusCode === "UNAUTHENTICATED") {
      return { logout: true };
    }
    return { error };
  },
};
