import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function GET(req: Request, { params }: { params: { storeId: string; slug: string[]; }; }) {
  try {
    const { storeId, slug } = params;

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    let product;
    if (slug.length === 3) {
      const [category, subcategory, productId] = slug;

      product = await prismadb.product.findUnique({
        where: {
          id: productId,
          storeId: storeId,
          subcategory: {
            name: subcategory,
          },
          productCategory: {
            some: {
              category: {
                name: category,
              },
            },
          },
        },
        include: {
          subcategory: true,
          productColor: {
            include: {
              color: {
                include: {
                  images: true,
                },
              },
            },
          },
          productSize: {
            include: {
              size: true,
            },
          },
          productCategory: {
            include: {
              category: true,
            },
          },
        },
      });
    }
    else if (slug.length === 2) {
      const [category, productId] = slug;
      product = await prismadb.product.findUnique({
        where: {
          id: productId,
          storeId: storeId,
          productCategory: {
            some: {
              category: {
                name: category,
              },
            },
          },
        },
        include: {
          subcategory: true,
          productColor: {
            include: {
              color: {
                include: {
                  images: true,
                },
              },
            },
          },
          productSize: {
            include: {
              size: true,
            },
          },
          productCategory: {
            include: {
              category: true,
            },
          },
        },
      });
    }
    else if (slug.length === 1) {
      const productId = slug[0];
      product = await prismadb.product.findUnique({
        where: {
          id: productId,
          storeId: storeId,
        },
        include: {
          subcategory: true,
          productColor: {
            include: {
              color: {
                include: {
                  images: true,
                },
              },
            },
          },
          productSize: {
            include: {
              size: true,
            },
          },
          productCategory: {
            include: {
              category: true,
            },
          },
        },
      });
    } else {
      return new NextResponse("Invalid slug format", { status: 400 });
    }

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; slug: string[]; }; }) {
  try {
    const currentuser = await currentUser();
    const userId = currentuser?.id;

    const productId = params.slug[0];

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!productId) {
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
        id: productId
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(req: Request, { params }: { params: { slug: string[], storeId: string; }; }) {
  try {
    const productId = params.slug[0];
    const currentuser = await currentUser();
    const userId = currentuser?.id;

    const body = await req.json();
    const { name, price, subcategoryId, productColor, productSize, isFeatured, isArchived, productCategory, rating, material, sale } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!sale) {
      return new NextResponse("Sale is required", { status: 400 });
    }
    if (!material) {
      return new NextResponse("Material is required", { status: 400 });
    }
    if (!rating) {
      return new NextResponse("Rating is required", { status: 400 });
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

    const product = await prismadb.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        price,
        subcategoryId,
        productSize: {
          deleteMany: {},
          createMany: {
            data: size.map((size) => ({
              sizeId: size.id,
              name: size.name
            })),
          },
        },
        productColor: {
          deleteMany: {},
          createMany: {
            data: color.map((color) => ({
              colorId: color.id,
              name: color.name
            })),
          },
        },
        productCategory: {
          deleteMany: {},
          createMany: {
            data: category.map((category) => ({
              categoryId: category.id,
              name: category.name
            })),
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};