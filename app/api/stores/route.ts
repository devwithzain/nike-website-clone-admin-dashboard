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
         return new NextResponse("Unathurize", { status: 401 });
      }

      if (!name) {
         return new NextResponse("Name is required!", { status: 401 });
      }

      const store = await prismadb.store.create({
         data: {
            name,
            userId,
         }
      });
      return NextResponse.json(store);
   } catch (error) {
      console.log('[STORE_POST]', error);
   }
}