import { MongoClient, type Db } from "mongodb";

// Client MongoDB mutualisé : en serverless (Vercel), on réutilise la connexion
// entre invocations via un cache global pour éviter d'ouvrir une connexion par requête.
let clientPromise: Promise<MongoClient> | null = null;

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGO_URL;
  if (!uri) throw new Error("MONGO_URL manquant");
  const g = globalThis as unknown as { _cledidiMongo?: Promise<MongoClient> };
  if (!g._cledidiMongo) {
    g._cledidiMongo = new MongoClient(uri).connect();
  }
  clientPromise = g._cledidiMongo;
  return clientPromise;
}

export async function getDb(name = "cledici"): Promise<Db> {
  const client = await getClient();
  return client.db(name);
}
