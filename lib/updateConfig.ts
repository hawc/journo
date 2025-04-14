"use server";

import { ObjectId } from "mongodb";
import { Config } from "../types/config";
import client from "./mongodb";

const { MONGODB_DATABASE, MONGODB_CONFIGS_COLLECTION } = process.env;

export async function updateConfig(config: Config) {
  if (!MONGODB_DATABASE || !MONGODB_CONFIGS_COLLECTION) {
    throw new Error("MongoDB env variables missing.");
  }

  try {
    const db = client.db(MONGODB_DATABASE);
    const configs = await db.collection(MONGODB_CONFIGS_COLLECTION);

    const { _id, ...updateData } = config;

    const result = await configs.updateOne(
      { _id: new ObjectId(config._id) },
      { $set: updateData }
    );

    return result;
  } catch (e) {
    console.error(e);
    return;
  }
};