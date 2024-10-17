import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import { categoryFormSchema } from "@/schemas";

export async function POST(req: Request, { params }: { params: { categoryId: string; storeId: string; }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;

      const body = await req.json();
      const validatedFields = categoryFormSchema.safeParse(body);

      // Handle validation errors
      if (!validatedFields.success) {
         const errors = validatedFields.error.format();
         return new NextResponse(
            JSON.stringify({ message: "Validation failed", errors }),
            { status: 400, headers: { "Content-Type": "application/json" } }
         );
      }

      // Extract validated data
      const { name, billboardId } = validatedFields.data; // Use validated data

      if (!userId) {
         return new NextResponse("Unauthenticated", { status: 401 });
      }

      if (!name) {
         return new NextResponse("Name is required!", { status: 400 });
      }

      if (!billboardId) {
         return new NextResponse("BillboardId is required!", { status: 400 });
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

      const billboard = await prismadb.category.create({
         data: {
            name,
            billboardId,
            storeId: params.storeId
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Category created successfully!",
         billboard
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function GET(req: Request, { params }: { params: { storeId: string; }; }) {
   try {
      if (!params.storeId) {
         return new NextResponse("StoreId is required!", { status: 400 });
      }

      const categories = await prismadb.category.findMany({
         where: {
            storeId: params.storeId,
         },
         include: {
            Subcategory: true
         }
      });

      return NextResponse.json({
         categories
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
