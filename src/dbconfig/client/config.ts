// connection fole for appwrite
import { Client, Account, Databases, Avatars, Storage } from "appwrite";
import env from "../../env";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId);

const account = new Account(client);
const db = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { client, account, db, avatars, storage };
