"use server";

import { Config } from "../types/config";
import client from "./mongodb";

export async function fetchConfigs() {
  const { MONGO_DATABASE, MONGO_CONFIGS_COLLECTION } = process.env;

  if (!MONGO_DATABASE || !MONGO_CONFIGS_COLLECTION) {
    throw new Error("MongoDB env variables missing.");
  }

  try {
    const db = client.db(MONGO_DATABASE);
    const configs = await db
      .collection<Config>(MONGO_CONFIGS_COLLECTION)
      .find({})
      .sort({ date: -1 })
      .toArray();

    configs.forEach((config) => {
      config._id = config._id.toString();
    });

    return configs;
  } catch (e) {
    console.error(e);
    return [];
  }
};