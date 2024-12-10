import { db_name, commentCollection } from "@/constants";
import { Permission } from "node-appwrite";
import env from "@/env";
import { db } from "@/dbconfig/server/config";

export default async function createCommentCollection() {
  const collection = await db.createCollection(
    db_name,
    commentCollection,
    commentCollection,
    [
      Permission.create("users"),
      Permission.read("any"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log("Comment Collection Created");

  // Creating Attributes
  await Promise.all([
    db.createStringAttribute(
      db_name,
      commentCollection,
      "content",
      10000,
      true
    ),
    db.createEnumAttribute(
      db_name,
      commentCollection,
      "type",
      ["answer", "question"],
      true
    ),
    db.createStringAttribute(db_name, commentCollection, "typeId", 50, true),
    db.createStringAttribute(db_name, commentCollection, "authorId", 50, true),
  ]);
  console.log("Comment Attributes Created");
}
