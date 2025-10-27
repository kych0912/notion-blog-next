"use server";

import { getPostDetail as getPostDetailFromDB } from "@/app/lib/postData/postDB";
import { isDescendantOfStoredPage } from "@/app/lib/notion-api";
import { auth } from "@/auth";
import { AuthError, BaseServerResposne } from "@/app/types/base";

interface GetPostDetailResponse {
  id: string;
  isAuthor: boolean;
  isChild: boolean;
}

export async function getPostDetailServer(
  id: string,
  user: string
): Promise<BaseServerResposne<GetPostDetailResponse>> {
  const session = await auth();
  const viewerName = session?.user?.name;

  const decodedViewerName = decodeURIComponent(viewerName ?? "");
  const decodedUserName = decodeURIComponent(user ?? "");
  let isAuthor = false;
  if (decodedViewerName && decodedViewerName === decodedUserName) {
    isAuthor = true;
  }
  const res = await getPostDetailFromDB(id, decodedUserName);

  if (!Array.isArray(res) || res.length === 0) {
    const isChildPage = await isDescendantOfStoredPage(id);

    if (!isChildPage) {
      throw new Error("NOT_FOUND");
    }

    return {
      data: { id, isAuthor, isChild: true },
      isSuccess: true,
    };
  }

  return {
    data: { id, isAuthor, isChild: false },
    isSuccess: true,
  };
}

// export async function updatePostServer(
//   id: string,
//   user: string,
//   notionId: string
// ) {
//   const session = await auth();
//   const viewerName = session?.user?.name;

//   const decodedViewerName = decodeURIComponent(viewerName ?? "");
//   const decodedUserName = decodeURIComponent(user ?? "");
//   let isAuthor = false;
//   if (decodedViewerName && decodedViewerName !== decodedUserName) {
//     return {
//       message: "You are not the author of this post",
//       isSuccess: false,
//     };
//   }
// }
