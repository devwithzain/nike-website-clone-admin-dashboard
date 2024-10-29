import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string; }; }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId
      },
      include: {
        images: true,
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string, storeId: string; }; }
) {
  try {
    const currentuser = await currentUser();
    const userId = currentuser?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(req: Request,
  { params }: { params: { colorId: string, storeId: string; }; }) {
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


    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    await prismadb.image.deleteMany({
      where: {
        colorId: params.colorId,
      },
    });

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        images: {
          create: images.map((image) => ({ url: image.url })),
        },
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
