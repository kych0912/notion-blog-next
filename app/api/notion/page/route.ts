export const dynamic = 'force-dynamic';
import { getPage } from "@/app/lib/notion-api"

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (pageId === "undefined" || !pageId) {
    return Response.json({ error: 'Page ID is required' }, { status: 400 });
  }

  try{
    const recordMap = await getPage(pageId);
    
    return Response.json(recordMap);
  } catch(error){
    return Response.json({ error: 'Page not found' }, { status: 404 });
  }
} 