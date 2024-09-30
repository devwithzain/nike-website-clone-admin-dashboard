import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";

export async function POST(req: Request) {
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

      const store = await prismadb.store.create({
         data: {
            name,
            userId,
         }
      });

      return NextResponse.json({
         status: 201,
         message: "Store created successfully!",
         store
      });
   } catch (error) {
      return new NextResponse("Something went wrong!", { status: 500 });
   }
}
