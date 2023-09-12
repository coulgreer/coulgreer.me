import { NextResponse, NextRequest } from "next/server";
import * as controller from "../../../backend/controller/dictionary";

export async function GET() {
  const words = await controller.getAllWords();
  return NextResponse.json({ words });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { citation, vocabulary } = data;

  try {
    await controller.insertWord(citation, vocabulary);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        word: { citation, vocabulary },
      },
      { status: 500 }
    );
  }
}
