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

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(size);
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

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(sizes);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
