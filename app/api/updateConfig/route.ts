import { fetchConfigs } from "../../../lib/fetchConfigs";
import { updateConfig } from "../../../lib/updateConfig";
import { Config } from "../../../types/config";

interface UpdateConfigInput {
  config: Config;
}

export async function POST(request: Request) {
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

  return new Response(JSON.stringify(updatedConfig), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}