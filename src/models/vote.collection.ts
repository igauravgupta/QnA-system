import { db_name, voteCollection } from "@/constants";
import { Permission } from "node-appwrite";
import { db } from "@/dbconfig/server/config";

export default async function createVoteCollection() {
  const collection = await db.createCollection(
    db_name,
    voteCollection,
    voteCollection,
    [
      Permission.create("users"),
      Permission.read("any"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );
  console.log("vote collection created", collection);

  await Promise.all([
    db.createEnumAttribute(
      db_name,
      voteCollection,
      "type",
      ["question", "answer"],
      true
    ),
    db.createStringAttribute(db_name, voteCollection, "typeId", 50, true),
    db.createEnumAttribute(
      db_name,
      voteCollection,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),
    db.createStringAttribute(db_name, voteCollection, "votedById", 50, true),
  ]);
  console.log("Vote Attributes Created");
}
