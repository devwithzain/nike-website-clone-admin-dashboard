import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function GET(req: Request, { params }: { params: { productId: string; }; }) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        ProductCategory: true,
        subcategory: true,
        ProductColor: true,
        ProductSize: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(req: Request, { params }: { params: { productId: string, storeId: string; }; }) {
  try {
    const currentuser = await currentUser();
    const userId = currentuser?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(req: Request, { params }: { params: { productId: string, storeId: string; }; }) {
  try {
    const currentuser = await currentUser();
    const userId = currentuser?.id;

    const body = await req.json();
    const { name, price, productCategory, subcategoryId, images, productColor, productSize, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!Array.isArray(images) || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (price === undefined || price === null) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!Array.isArray(productCategory) || !productCategory.length) {
      return new NextResponse("Product Category is required", { status: 400 });
    }

    if (!subcategoryId) {
      return new NextResponse("Sub Category id is required", { status: 400 });
    }

    if (!productColor) {
      return new NextResponse("Product Color is required", { status: 400 });
    }

    if (!productSize) {
      return new NextResponse("Product Size is required", { status: 400 });
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

    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        subcategoryId,
        images: {
          deleteMany: {},
          createMany: {
            data: images.map((image: { url: string; }) => image),
          },
        },
        ProductSize: {
          deleteMany: {},
          createMany: {
            data: productSize.map((sizeId: string) => ({ sizeId })),
          },
        },
        ProductColor: {
          deleteMany: {},
          createMany: {
            data: productColor.map((colorId: string) => ({ colorId })),
          },
        },
        ProductCategory: {
          deleteMany: {},
          createMany: {
            data: productCategory.map((categoryId: string) => ({ categoryId })),
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};