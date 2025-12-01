import { NextResponse, NextRequest } from "next/server";
import { deletePost, getPostById } from "@/app/lib/postData/postDB";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const isPost = await getPostById(id);

    //게시글 존재 확인
    if (!Array.isArray(isPost) || isPost.length === 0) {
      return NextResponse.json(
        { message: "Post Not Found", isSuccess: false },
        { status: 404 }
      );
    }
    const res = await deletePost(id);
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error", isSuccess: false },
      { status: 500 }
    );
  }
}
