import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function GET(req: Request, { params }: { params: { categoryId: string, }; }) {
   try {
      if (!params.categoryId) {
         return new NextResponse("Category Id is required!", { status: 400 });
      }

      const categories = await prismadb.category.findMany({
         where: {
            id: params.categoryId
         },
         include: {
            billboard: true
         }
      });

      return NextResponse.json({
         categories
      });

   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function PATCH(req: Request, { params }: { params: { categoryId: string, storeId: string; }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;
      const body = await req.json();
      const { name, billboardId } = body;

      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!name) {
         return new NextResponse("Name is required!", { status: 400 });
      }

      if (!billboardId) {
         return new NextResponse("Billboard Id is required!", { status: 400 });
      }

      if (!params.categoryId) {
         return new NextResponse("Category Id is required!", { status: 400 });
      }

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: params.storeId,
            userId
         }
      });

      if (!storeByUserId) {
         return new NextResponse("Unauthorized", { status: 403 });
      }

      const category = await prismadb.category.updateMany({
         where: {
            id: params.categoryId,
         },
         data: {
            name,
            billboardId,
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Category updated successfully!",
         category
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; categoryId: string, }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;

      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!params.categoryId) {
         return new NextResponse("Category Id is required!", { status: 400 });
      }

      const storeByUserId = await prismadb.store.findFirst({
         where: {
            id: params.storeId,
            userId
         }
      });

      if (!storeByUserId) {
         return new NextResponse("Unauthorized", { status: 403 });
      }

      const category = await prismadb.category.deleteMany({
         where: {
            id: params.categoryId
         },

      });

      return NextResponse.json({
         status: 201,
         message: "Category deleted successfully!",
         category
      });

   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
