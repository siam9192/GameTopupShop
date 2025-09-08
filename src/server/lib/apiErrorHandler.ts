
import { NextResponse } from "next/server";
import { GlobalErrorResponse } from "../utils/type";

export function withErrorHandler(
  handler: (req: Request) => Promise<NextResponse<GlobalErrorResponse>>
) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error: any) {
      console.error("API Error:", error);
      return NextResponse.json(
        {
        success:false,
        status:error.status||500,
        message: error.message || "Internal Server Error",
        }
      );
    }
  };
}
