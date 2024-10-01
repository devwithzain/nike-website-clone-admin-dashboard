import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function PATCH(req: Request, { params }: { params: { storeId: string; }; }) {
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

      if (!params.storeId) {
         return new NextResponse("Store Id is required!", { status: 400 });
      }

      const store = await prismadb.store.updateMany({
         where: {
            id: params.storeId,
            userId,
         },
         data: {
            name,
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Store updated successfully!",
         store
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string; }; }) {
   const currentuser = await currentUser();
   try {
      const userId = currentuser?.id;

      if (!userId) {
         return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!params.storeId) {
         return new NextResponse("Store Id is required!", { status: 400 });
      }

      const store = await prismadb.store.deleteMany({
         where: {
            id: params.storeId,
            userId,
         },

      });

      return NextResponse.json({
         status: 201,
         message: "Store deleted successfully!",
         store
      });

   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
