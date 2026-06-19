import {db} from "../name"
import { databases } from "./config"
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
    try {
        await databases.get(db)
        console.log("Database Connected");
    } catch (error) {
        try {
            await databases.create(db, db)
            console.log("Database Created");

            await Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createVoteCollection()
            ]);
        } catch (error) {
            console.error("Error creating database:", error);
        }
    }

    return databases;
}


