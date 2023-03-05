import { type Db, MongoClient } from 'mongodb';

let database: Db | null = null;

export async function startDatabase (): Promise<void> {
  let ipAddr = 'localhost';
  if (process.env.IS_DOCKER_ENV === 'y') {
    ipAddr = 'mongo';
  }
  const mongoDBURL = `mongodb://${ipAddr}:27017`;
  const connection = await MongoClient.connect(mongoDBURL);
  database = connection.db();
}

export async function getDatabase (): Promise<Db | null> {
  if (database == null) await startDatabase();
  return database;
}
