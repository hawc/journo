"use server";

import { Config } from "../types/config";
import client from "./mongodb";

const { MONGODB_DATABASE, MONGODB_CONFIGS_COLLECTION } = process.env;

export async function fetchConfigs() {
  if (!MONGODB_DATABASE || !MONGODB_CONFIGS_COLLECTION) {
    throw new Error("MongoDB env variables missing.");
  }

  try {
    const db = client.db(MONGODB_DATABASE);
    const configs = await db
      .collection<Config>(MONGODB_CONFIGS_COLLECTION)
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