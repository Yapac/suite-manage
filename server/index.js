import "dotenv/config"; // replaces require('dotenv').config()
import express from "express"; // replaces require('express')
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";

import typeDefs from "./schema/typeDefs.js"; // use .js extension in ES modules
import resolvers from "./schema/resolvers.js";

async function startServer() {
  const app = express();
  app.use(cors());

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
}

startServer();
