import prismadb from "@/lib/prisma";
import { NextResponse } from 'next/server';
import { currentUser } from "@/lib/current-user";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string; }; }
) {
  try {
    const currentuser = await currentUser();
    const userId = currentuser?.id;
    const body = await req.json();

    const { name, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        images: {
          createMany: {
            data: images.map((image: { url: string; }) => image),
          },
        },
        storeId: params.storeId
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; }; }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      },
      include: {
        images: true,
      }
    });

    return NextResponse.json(colors);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
