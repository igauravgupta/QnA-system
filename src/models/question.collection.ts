import { IndexType, Permission } from "node-appwrite";
import { db } from "@/dbconfig/server/config";
import env from "@/env";
import { db_name, questionCollection } from "@/constants";

export default async function createQuestionCollection() {
  const collection = await db.createCollection(
    db_name,
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
    db.createStringAttribute(db_name, questionCollection, "title", 100, true),
    db.createStringAttribute(
      db_name,
      questionCollection,
      "content",
      10000,
      true
    ),
    db.createStringAttribute(db_name, questionCollection, "author", 50, true),
    db.createStringAttribute(
      db_name,
      questionCollection,
      "tags",
      10,
      true,
      undefined,
      true
    ),
    db.createStringAttribute(
      db_name,
      questionCollection,
      "AttachmentId",
      50,
      false
    ),
  ]);
  console.log("question collection attributes created");

  await Promise.all([
    db.createIndex(
      db_name,
      questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["asc"]
    ),
  ]);
}
