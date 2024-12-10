import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";
import env from "@/env";

let client = new Client();

client
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apiKey);

const users = new Users(client);
const db = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { client, users, db, avatars, storage };
