"use server"

import { ApolloServer } from "@apollo/server";
import http from 'http';
import cors from 'cors';
import express from 'express';
import UPLOAD_DIRECTORY_URL from './config/UPLOAD_DIRECTORY_URL.js';
import { makeDirectory } from 'make-dir';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { readFile } from "node:fs/promises";

import { getUser } from "./db/user.js";

import { authMiddleware, handleUpload } from "./auth.js";
import { resolvers } from "./resolvers.js";
import dotenv from 'dotenv'
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Ensure the upload directory exists.
await makeDirectory(fileURLToPath(UPLOAD_DIRECTORY_URL));

dotenv.config()

const PORT = 9000;

const app = express();
const httpServer = http.createServer(app);
app.use(cors(), express.json({ limit: "10mb" }), authMiddleware)

const typeDefs = await readFile('./schema.graphql', 'utf-8')

async function getContext({ req }) {
    let context = {}
    if (req.auth) {
        context.user = await getUser(req.auth.sub);
    }
    return context;
}

const wsServer = new WebSocketServer({
    port: 4000, 
    path: "/graphql"
});

const schema = makeExecutableSchema({ typeDefs, resolvers })

const serverCleanup = useServer({schema}, wsServer);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DRIVER);
mongoose.connection.once("open", async () => {
    console.log("Connected to MongoDB");
    // console.log(process.env.MONGO_DRIVER)
});

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    }
                }
            }
        }
    ],
    csrfPrevention: true,
    introspection: true
});


await apolloServer.start()

app.use(graphqlUploadExpress({
    maxFieldSize: 30000000,
    maxFiles: 20,
}))

app.use(express.static("uploads"));

app.use('/graphql', apolloMiddleware(apolloServer, {context: getContext}));

app.post('/graphql/uploads', handleUpload)

app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
})