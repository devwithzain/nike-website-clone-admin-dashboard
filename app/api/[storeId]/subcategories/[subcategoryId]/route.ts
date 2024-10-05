import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function GET(req: Request, { params }: { params: { subcategoryId: string, }; }) {
   try {
      if (!params.subcategoryId) {
         return new NextResponse("Sub Category Id is required!", { status: 400 });
      }

      const subcategories = await prismadb.subcategory.findMany({
         where: {
            id: params.subcategoryId
         },
      });

      return NextResponse.json({
         subcategories
      });

   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function PATCH(req: Request, { params }: { params: { subcategoryId: string, storeId: string; }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;
      const body = await req.json();
      const { name } = body;

      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!name) {
         return new NextResponse("Name is required!", { status: 400 });
      }

      if (!params.subcategoryId) {
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

      const subcategory = await prismadb.subcategory.updateMany({
         where: {
            id: params.subcategoryId,
         },
         data: {
            name,
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Sub Category updated successfully!",
         subcategory
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; subcategoryId: string, }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;

      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!params.subcategoryId) {
         return new NextResponse("Sub Category Id is required!", { status: 400 });
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

      const subcategory = await prismadb.subcategory.deleteMany({
         where: {
            id: params.subcategoryId
         },

      });

      return NextResponse.json({
         status: 201,
         message: "Category deleted successfully!",
         subcategory
      });

   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
