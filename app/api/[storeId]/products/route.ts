import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function POST(req: Request, { params }: { params: { storeId: string; }; }) {
  try {
    const currentuser = await currentUser();
    const userId = currentuser?.id;

    const body = await req.json();

    const { name, price, subcategoryId, productColor, productSize, images, isFeatured, isArchived, productCategory } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!subcategoryId) {
      return new NextResponse("Sub Category id is required", { status: 400 });
    }

    if (!productColor || !productColor.length) {
      return new NextResponse("Color is required", { status: 400 });
    }

    if (!productSize || !productSize.length) {
      return new NextResponse("Size is required", { status: 400 });
    }

    if (!productCategory || !productCategory.length) {
      return new NextResponse("Category is required", { status: 400 });
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

    const size = await prismadb.size.findMany({
      where: {
        id: {
          in: [...productSize],
        },
      },
    });
    const color = await prismadb.color.findMany({
      where: {
        id: {
          in: [...productColor],
        },
      },
    });

    const category = await prismadb.category.findMany({
      where: {
        id: {
          in: [...productCategory],
        },
      },
    });

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        subcategoryId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: images.map((image: { url: string; }) => image),
          },
        },
        ProductSize: {
          createMany: {
            data: size.map((size) => ({
              sizeId: size.id,
              name: size.name
            })),
          },
        },
        ProductColor: {
          createMany: {
            data: color.map((color) => ({
              colorId: color.id,
              name: color.name
            })),
          },
        },
        ProductCategory: {
          createMany: {
            data: category.map((category) => ({
              categoryId: category.id,
            })),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string; }; },) {
  try {
    const { searchParams } = new URL(req.url);
    const subcategoryId = searchParams.get('subcategoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        subcategoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        ProductColor: {
          some: {
            colorId,
          },
        },
        ProductSize: {
          some: {
            sizeId,
          },
        },
      },
      include: {
        images: true,
        subcategory: true,
        ProductColor: {
          include: {
            color: true,
          },
        },
        ProductSize: {
          include: {
            size: true,
          },
        },
        ProductCategory: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};