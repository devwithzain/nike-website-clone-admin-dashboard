import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function POST(req: Request, { params }: { params: { storeId: string; }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;
      const body = await req.json();
      const { name, categoryId } = body;

      if (!userId) {
         return new NextResponse("Unauthenticated", { status: 401 });
      }

      if (!name) {
         return new NextResponse("Name is required!", { status: 400 });
      }

      if (!categoryId) {
         return new NextResponse("Category Id is required!", { status: 400 });
      }

      if (!params.storeId) {
         return new NextResponse("StoreId is required!", { status: 400 });
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

      const subcategory = await prismadb.subcategory.create({
         data: {
            name,
            storeId: params.storeId,
            categoryId
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Sub Category created successfully!",
         subcategory
      });
   } catch (error) {
      console.log(["POST", error]);
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function GET(req: Request, { params }: { params: { storeId: string; }; }) {
   try {
      if (!params.storeId) {
         return new NextResponse("StoreId is required!", { status: 400 });
      }

      const subcategories = await prismadb.subcategory.findMany({
         where: {
            storeId: params.storeId,
         }
      });

      return NextResponse.json({
         subcategories
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
