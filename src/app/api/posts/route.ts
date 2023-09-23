import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const postPerPage = 2;
  const { searchParams } = new URL(req.url);
  const page =
    Number(searchParams.get("page")) > 0 ? Number(searchParams.get("page")) : 1;
  const cat = searchParams.get("cat");
  const latest = searchParams.get("latest");

  const orderBy: Prisma.PostOrderByWithRelationInput = latest
    ? { createdAt: Prisma.SortOrder.desc }
    : {};

  const query = {
    take: latest ? 5 : postPerPage,
    skip: latest ? 0 : postPerPage * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
    include: {
      user: true,
    },
    orderBy,
  };

  try {
    const [Posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ Posts, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), {
      status: 401,
    });
  } else {
    try {
      const body = await req.json();
      const post = await prisma.post.create({
        data: { ...body, userEmail: session.user?.email },
      });
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
      );
    }
  }
};
