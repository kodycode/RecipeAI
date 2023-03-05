import { type InferIdType, type Document, type WithId } from 'mongodb';
import { getDatabase } from './mongo';

const collectionName = 'recipes';

/* Inserts a document into MongoDB like the below:
 * {_id: "...", recipe: "...", ingredientPrompt: "..."}
 */
export async function insertRecipe (recipe: Document): Promise<InferIdType<Document> | null> {
  const database = await getDatabase();
  if (database !== null) {
    const { insertedId } = await database.collection(collectionName).insertOne(recipe);
    return insertedId;
  }
  return null;
}
