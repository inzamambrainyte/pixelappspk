import { NextRequest, NextResponse } from "next/server";

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

export type RouteHandler = (
  req: NextRequest,
  context?: unknown
) => Promise<NextResponse>;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest, context?: unknown) => {
    try {
      return await handler(req, context);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: error.statusCode }
        );
      }

      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 500 }
      );
    }
  };
}

