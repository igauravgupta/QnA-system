import { db_name } from "@/constants";
import createQuestionCollection from "@/models/question.collection";
import createAnswerCollection from "@/models/answer.collection";
import createCommentCollection from "@/models/comment.collection";
import createVoteCollection from "@/models/vote.collection";
import createStorage from "@/models/storage.setup";

import { db } from "@/dbconfig/server/config";

export default async function getOrCreateDatabase() {
  try {
    await db.get(db_name);
    console.log("Database connected");
  } catch (error) {
    try {
      await db.create(db_name, db_name);
      console.log("database created");
      //create collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collection created");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return db;
}
