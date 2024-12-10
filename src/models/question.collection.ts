import { IndexType, Permission } from "node-appwrite";
import { db } from "@/dbconfig/server/config";
import env from "@/env";
import { dbId, questionCollection } from "@/constants";

export default async function createQuestionCollection() {
  const collection = await db.createCollection(
    dbId,
    questionCollection,
    questionCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.write("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );
  console.log("question collection created", collection);

  await Promise.all([
    db.createStringAttribute(dbId, questionCollection, "title", 100, true),
    db.createStringAttribute(dbId, questionCollection, "content", 10000, true),
    db.createStringAttribute(dbId, questionCollection, "author", 50, true),
    db.createStringAttribute(
      dbId,
      questionCollection,
      "tags",
      10,
      true,
      undefined,
      true
    ),
    db.createStringAttribute(
      dbId,
      questionCollection,
      "AttachmentId",
      50,
      false
    ),
  ]);
  console.log("question collection attributes created");

  await Promise.all([
    db.createIndex(
      dbId,
      questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["asc"]
    ),
  ]);
}
