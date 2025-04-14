import { fetchConfigs } from "../../../lib/fetchConfigs";

export async function GET() {
  const configs = await fetchConfigs();

  return new Response(JSON.stringify(configs), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}