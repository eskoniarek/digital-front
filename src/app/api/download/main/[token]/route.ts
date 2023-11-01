import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.pathname.split('/').pop();
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/store/product-media/${token}`;

  try {
    const fileResponse = await fetch(apiUrl);
    if (!fileResponse.ok) {
      console.error("File response not OK:", fileResponse.status);
      throw new Error('Token is invalid or file not found');
    }

    // Assuming the backend does the redirect, we can just pass this response through.
    console.log("Redirecting to file:", fileResponse.url);
    return NextResponse.rewrite(fileResponse.url);
  } catch (error) {
    console.error("Error:", error);

    let status = 500;
    let message = 'An unexpected error occurred';

    if (typeof error === 'string') {
      message = error;
    } else if (error instanceof Error) {
      message = error.message;
      status = error.message.includes('Token is invalid') ? 401 : 404;
    }

    console.error("Response status:", status);
    console.error("Response message:", message);

    return new NextResponse(message, { status });
  }
}
