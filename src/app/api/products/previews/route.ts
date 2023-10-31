// src/pages/api/products/previews.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Define the API URL to get product media with 'PREVIEW' attachment type
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/store/product-media?attachment_type=preview`;

  try {
    // Fetch the product media data from the backend
    const mediaResponse = await fetch(apiUrl);
    if (!mediaResponse.ok) {
      throw new Error('Unable to fetch product media');
    }

    // Extract the product media items
    const mediaItems = await mediaResponse.json();

    // Return a response with the product media items
    return new NextResponse(JSON.stringify(mediaItems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    let status = 500;
    let message = 'An unexpected error occurred';

    if (typeof error === 'string') {
      // Handle errors thrown as strings
      message = error;
    } else if (error instanceof Error) {
      // Handle errors thrown as Error objects
      message = error.message;
      status = 404; // Assuming that any error here is due to media not being found
    }

    // Return a response with the appropriate error message and status code
    return new NextResponse(message, { status });
  }
}
