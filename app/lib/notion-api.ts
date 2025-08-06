import { NotionAPI } from "notion-client";
import * as types from "notion-types";
import { getPageTitle, getBlockParentPage } from "notion-utils";
import { getPostById } from "./postData/postDB";
import { getNotionImage } from "@/app/utils/NotionApi";

export async function getPage(id: string): Promise<types.ExtendedRecordMap> {
  try {
    const notion = new NotionAPI();

    return await notion.getPage(id);
  } catch (err) {
    if (err instanceof Error) {
      if (
        err.message.includes("invalid notion pageId") ||
        err.message.includes("Request failed with status code 400")
      ) {
        throw new Error("invalid notion pageId");
      }
    }
    console.error("Error in getPage:", err);
    throw err;
  }
}

export async function getNotionPageContent(id: string): Promise<{
  image: string;
  title: string;
}> {
  const recordMap: types.ExtendedRecordMap = await getPage(id);

  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;

  let coverImg = recordMap?.block?.[keys[0]].value.format?.page_cover;

  coverImg = getNotionImage(coverImg, keys, block);

  const title = getPageTitle(recordMap);

  return {
    image: coverImg,
    title: title || "",
  };
}

/**
 * 재귀적으로 위로 올라가며 페이지가 DB에 저장되어 있는지를 확인하는 함수
 * @param id 탐색할 페이지의 id
 * @returns 페이지가 DB에 저장되어 있는지 여부
 */
export async function isDescendantOfStoredPage(
  id: string,
  visitedPages = new Set<string>(),
  maxDepth = 100,
  currentDepth = 0
): Promise<boolean> {
  try {
    // 최대 재귀 깊이에 도달하면 false 반환
    if (currentDepth > maxDepth) {
      console.warn("Max recursion depth reached");
      return false;
    }

    // 이미 방문한 페이지면 false 반환
    if (visitedPages.has(id)) {
      console.warn("Loop detected");
      return false;
    }

    // 현재 페이지를 방문한 페이지로 추가
    visitedPages.add(id);

    // DB에서 포스트 존재 확인
    const page = await getPostById(id);

    // DB에 존재하면 true 반환
    if (Array.isArray(page) && page.length !== 0) {
      return true;
    }

    // 해당 페이지 정보 추출
    const recordMap = await getPage(id);
    const block = recordMap.block[Object.keys(recordMap.block)[0]].value;

    // 부모 페이지 추출
    const parentPage = await getBlockParentPage(block, recordMap);

    // 부모 페이지가 없으면 (루트 페이지) false 반환
    if (!parentPage) {
      return false;
    }

    // 부모 페이지가 있을 경우 재귀적으로 탐색
    return isDescendantOfStoredPage(
      parentPage.id,
      visitedPages,
      maxDepth,
      currentDepth + 1
    );
  } catch (error) {
    console.error("Error in isDescendantOfStoredPage:", error);
    return false; // 에러 발생 시 false 반환
  }
}
