import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    data: "Trello clone data",
  });
};
export function POST(){
    return NextResponse.json({
        data: "Trello clone data",
      });
}
export function PATCH(){
    return NextResponse.json({
        data: "Trello clone data",
      });
}