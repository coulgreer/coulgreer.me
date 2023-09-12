import { NextRequest, NextResponse } from "next/server";
import * as controller from "../../../../backend/controller/dictionary";

export async function GET(
  req: NextRequest, // Returned 500 status when excluding this parameter
  { params }: { params: { word: string } }
) {
  const { word } = params;

  try {
    const id = await controller.getWordId(word);
    const [res] = await controller.getWord(id);

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: "Word does not exist in this dictionary", target: word },
      { status: 404 }
    );
  }
}
