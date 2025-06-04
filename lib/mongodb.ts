import { MongoClient } from "mongodb"
import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

if (!process.env.MONGODB_URI.startsWith('mongodb://') && !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MONGODB_URI: Must start with mongodb:// or mongodb+srv://')
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client
      .connect()
      .then(client => {
        return client.db('portfolio').command({ ping: 1 }).then(() => client)
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB', err)
        throw err
      })
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  const client = new MongoClient(uri, options)
  clientPromise = client
    .connect()
    .then(client => {
      return client.db('portfolio').command({ ping: 1 }).then(() => client)
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err)
      throw err
    })
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// For mongoose connections
const MONGODB_URI = process.env.MONGODB_URI

// Define the type for cached mongoose connection
type CachedMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add mongoose to the NodeJS global type
declare global {
  var mongoose: CachedMongoose;
}

// Initialize or reuse cached connection
if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  }
}

export async function connectToDB() {
  if (global.mongoose.conn) {
    return global.mongoose.conn
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    }

    global.mongoose.promise = mongoose.connect(MONGODB_URI!, opts).then(() => mongoose)
  }

  try {
    global.mongoose.conn = await global.mongoose.promise
  } catch (e) {
    global.mongoose.promise = null
    throw e
  }

  return global.mongoose.conn
}
