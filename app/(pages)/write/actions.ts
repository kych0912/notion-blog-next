"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Types from "notion-types";
import { parsePageId } from "notion-utils";

import { getPage, getNotionPageContent } from "@/app/lib/notion-api";
import { uploadPost, getPostById } from "@/app/lib/postData/postDB";
import { auth } from "@/auth";
import { getPageBlockContent } from "@/app/utils/NotionApi";
import { PostType } from "@/app/db/schema";

export interface WriteActionState { ok: boolean; message?: string }

export async function writePostAction(
  _prevState: WriteActionState,
  formData: FormData
): Promise<WriteActionState> {
  const pageIdOrUrl = (formData.get("pageId") || formData.get("notionUrl")) as
    | string
    | null;
  const id = parsePageId(pageIdOrUrl ?? "");
  if (!id) return { ok: false, message: "Invalid Notion URL" };

  const session = await auth();
  if (!session?.user) return { ok: false, message: "Token Not Found" };

  const userId = session.user.name;
  const avatar = session.user.image;
  if (!userId || !avatar) return { ok: false, message: "Invalid Token" };

  let recordMap: Types.ExtendedRecordMap;
  try {
    recordMap = await getPage(id);
  } catch {
    return { ok: false, message: "Invalid Notion URL" };
  }

  const post = await getPostById(id);
  if (post.length !== 0) return { ok: false, message: "Post Already Exists" };

  const date = new Date();
  const notionContent = await getNotionPageContent(id);
  const keys = Object.keys(recordMap?.block || {});
  const description = getPageBlockContent(recordMap, keys);

  await uploadPost({
    id,
    author: userId,
    date,
    image: notionContent.image,
    title: notionContent.title,
    avatar,
    description,
  });

  revalidatePath("/");
  redirect("/");
}
