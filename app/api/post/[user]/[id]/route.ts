export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPostDetail } from "@/app/lib/postData/postDB";
import { decode } from "next-auth/jwt";
import { headers } from "next/headers";
import { isDescendantOfStoredPage } from "@/app/lib/notion-api";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; user: string } }
) {
  const id = params.id;
  const user = params.user;

  //secret 값 default 설정
  const secret = process.env.NEXTAUTH_SECRET || "";

  const headerList = headers();

  //header에서 encoded token을 가져옴
  const rawToken =
    headerList.get("x-next-auth-session-token") ||
    headerList.get("x-next-auth.session-token");

  let isAuthor = false;

  try {
    const res = await getPostDetail(id, user);

    //자식 페이지가 존재하지 않을 때
    //부모 페이지로 올라가며 db에서 id 탐색
    //없으면 404 반환

    //포스트가 존재하지 않을 때
    if (!Array.isArray(res) || res.length === 0) {
      //자식 페이지인지 확인
      const isChildPage = await isDescendantOfStoredPage(id);

      //자식 페이지도 아니면 404
      if (!isChildPage) {
        return NextResponse.json(
          { message: "Post Not Found", isSuccess: false },
          { status: 404 }
        );
      }

      //자식 페이지일 경우 페이지 return
      return NextResponse.json(
        {
          data: {
            id: id,
          },
          isAuthor: isAuthor,
          isChild: true,
          isSuccess: true,
        },
        { status: 200 }
      );
    }

    //토큰 유효성 검사
    if (!rawToken) {
      return NextResponse.json(
        { data: res, isAuthor: isAuthor, isChild: false, isSuccess: true },
        { status: 200 }
      );
    }

    const decodedToken = await decode({
      token: rawToken,
      secret,
      salt: secret,
    });

    //토큰이 유효하지 않을 때
    if (!decodedToken) {
      return NextResponse.json(
        { data: res, isAuthor: isAuthor, isChild: false, isSuccess: true },
        { status: 200 }
      );
    }

    if (decodedToken.name === user) {
      isAuthor = true;
    }

    return NextResponse.json(
      { data: res, isAuthor: isAuthor, isChild: false, isSuccess: true },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("invalid notion pageId")) {
        return NextResponse.json(
          { message: "Not Found", isSuccess: false },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { message: "Internal Server Error", isSuccess: false },
      { status: 500 }
    );
  }
}
