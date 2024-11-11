import { getPage } from "@/app/lib/notion-api"

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  
  if (!pageId) {
    return Response.json({ error: 'Page ID is required' }, { status: 400 });
  }

  const recordMap = await getPage(pageId);
  return Response.json(recordMap);
} 