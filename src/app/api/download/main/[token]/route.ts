// src/pages/api/download/[token].ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Extract the token from the request parameters
  const token = req.nextUrl.pathname.split('/').pop();

  // Define the API URL to get the file data associated with the token
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/store/product-media/${token}`;

  try {
    // Fetch the file data from the backend using the token
    const fileResponse = await fetch(apiUrl);
    if (!fileResponse.ok) {
      throw new Error('Token is invalid or file not found');
    }

    const { file, filename, mime_type } = await fileResponse.json();

    // Fetch the actual file using the file URL provided by the backend
    const fileDownloadResponse = await fetch(file);
    if (!fileDownloadResponse.ok) {
      throw new Error('Unable to download file');
    }

    // Get the file content as a buffer
    const fileBuffer = await fileDownloadResponse.arrayBuffer();

    // Define response headers for downloading the file
    const headers = {
      "Content-Type": mime_type,
      "Content-Disposition": `attachment; filename="${filename}"`,
    };

    // Create a NextResponse with the file content and headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
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
      status = error.message.includes('Token is invalid') ? 401 : 404;
    }

    // Return a response with the appropriate error message and status code
    return new NextResponse(message, { status });
  }
}
