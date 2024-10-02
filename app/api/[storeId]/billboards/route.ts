import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function POST(req: Request, { params }: { params: { storeId: string; }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;

      const body = await req.json();
      const { label, imageUrl } = body;

      if (!userId) {
         return new NextResponse("Unauthenticated", { status: 401 });
      }

      if (!label) {
         return new NextResponse("Label is required!", { status: 400 });
      }

      if (!imageUrl) {
         return new NextResponse("ImageUrl is required!", { status: 400 });
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

      const billboard = await prismadb.billboard.create({
         data: {
            label,
            imageUrl,
            storeId: params.storeId,
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Billboard created successfully!",
         billboard
      });
   } catch (error) {
      console.log("[BILLBOARDS_POST]", error);
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function GET(req: Request, { params }: { params: { storeId: string; }; }) {
   try {
      if (!params.storeId) {
         return new NextResponse("StoreId is required!", { status: 400 });
      }

      const billboards = await prismadb.billboard.findMany({
         where: {
            storeId: params.storeId,
         }
      });

      return NextResponse.json({
         billboards
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
