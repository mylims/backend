import { MongoClient } from 'mongodb';

export interface Status {
  kind: string;
  date?: string;
}

export interface Context {
  db: MongoClient;
}
