import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "../../../lib/auth0";
import { fetchConfigs } from "../../../lib/fetchConfigs";
import { updateConfig } from "../../../lib/updateConfig";
import { Config } from "../../../types/config";

interface UpdateConfigInput {
  config: Config;
}

export async function POST(request: NextRequest) {
  const session = await auth0.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { config }: UpdateConfigInput = body;

  const configs = await fetchConfigs();

  const updatedConfig = configs.find(c => c._id === config._id);

  if (!updatedConfig) {
    throw new Error("Config not found.");
  }

  if (config.articles) {
    updatedConfig.articles = { ...config.articles };
  }

  if (config.framework) {
    updatedConfig.framework = config.framework;
  }

  if (config.url) {
    updatedConfig.url = config.url;
  }

  if (config.name) {
    updatedConfig.name = config.name;
  }

  if (config.location) {
    updatedConfig.location = config.location;
  }

  if (config.globs) {
    updatedConfig.globs = [...config.globs];
  }

  const result = await updateConfig(updatedConfig);

  if (!result) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Config updated successfully', updatedConfig }, { status: 201 });
}