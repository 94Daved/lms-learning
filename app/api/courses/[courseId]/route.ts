import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prisma from "@/lib/db";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await prisma.course.delete({
      where: { id: params.courseId },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSES_ID_DELETE]", error);
    return new NextResponse("internal error: ", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedCourse = await prisma.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.log("[COURSES_ID_UPDATE]", error);
    return new NextResponse("internal error: ", { status: 500 });
  }
}
