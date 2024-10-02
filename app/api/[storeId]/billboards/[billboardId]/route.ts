import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function GET(req: Request, { params }: { params: { billboardId: string, }; }) {
   try {
      if (!params.billboardId) {
         return new NextResponse("Billboard Id is required!", { status: 400 });
      }

      const billboard = await prismadb.billboard.findMany({
         where: {
            id: params.billboardId
         },
      });

      return NextResponse.json({
         billboard
      });

   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function PATCH(req: Request, { params }: { params: { billboardId: string, storeId: string; }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;
      const body = await req.json();
      const { label, imageUrl } = body;

      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!label) {
         return new NextResponse("Label is required!", { status: 400 });
      }

      if (!imageUrl) {
         return new NextResponse("Image URL is required!", { status: 400 });
      }

      if (!params.billboardId) {
         return new NextResponse("Billboard Id is required!", { status: 400 });
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

      const billboard = await prismadb.billboard.updateMany({
         where: {
            id: params.billboardId,
         },
         data: {
            label,
            imageUrl,
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Billboard updated successfully!",
         billboard
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; billboardId: string, }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;

      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!params.billboardId) {
         return new NextResponse("Billboard Id is required!", { status: 400 });
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

      const billboard = await prismadb.billboard.deleteMany({
         where: {
            id: params.billboardId
         },

      });

      return NextResponse.json({
         status: 201,
         message: "Billboard deleted successfully!",
         billboard
      });

   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
