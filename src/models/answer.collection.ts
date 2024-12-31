import { db_name, answerCollection } from "@/constants";
import { Permission } from "node-appwrite";
import env from "@/env";
import { db } from "@/dbconfig/server/config";

export default async function createAnswerCollection() {
  const collection = await db.createCollection(
    db_name,
    answerCollection,
    answerCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.write("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );
  console.log("answer collection created", collection);

  await Promise.all([
    db.createStringAttribute(db_name, answerCollection, "content", 10000, true),
    db.createStringAttribute(db_name, answerCollection, "questionId", 50, true),
    db.createStringAttribute(db_name, answerCollection, "authorId", 50, true),
  ]);

  console.log("answer collection attributes created");
}
