// Allow only these image MIME types when checking the uploaded file's type.
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
// File.size is measured in bytes, so convert the 2 MB limit to bytes.
const maxImageSize = 2 * 1024 * 1024;

// Next.js runs this function on the server when the form sends POST /api/upload.
export async function POST(request: Request) {
    let formData: FormData;

    try {
        // Read the multipart/form-data body sent by SignUpForm.
        formData = await request.formData();
    } catch {
        // 400 means the incoming request is invalid and cannot be processed.
        return Response.json({ error: 'Please select an image to upload.' }, { status: 400 });
    }

    // Read the same "image" field that the client added with uploadData.append().
    const image = formData.get('image');

    // Reject missing files, text values and empty files before contacting ImgBB.
    if (!(image instanceof File) || image.size === 0) {
        return Response.json({ error: 'Please select an image to upload.' }, { status: 400 });
    }

    // Check the file's declared MIME type; the browser's accept attribute alone is not validation.
    if (!allowedImageTypes.has(image.type)) {
        return Response.json(
            { error: 'Please select a JPG, PNG, WebP or GIF image.' },
            { status: 400 },
        );
    }

    // Reject files larger than the limit shown beside the upload field.
    if (image.size > maxImageSize) {
        return Response.json(
            { error: 'Your profile photo must be 2 MB or smaller.' },
            { status: 400 },
        );
    }

    // Read the ImgBB key on the server so it is never sent to the browser.
    const apiKey = process.env.IMGBB_API_KEY;

    // 503 tells the client that uploading is unavailable until the server key is configured.
    if (!apiKey) {
        return Response.json(
            { error: 'Image upload is not configured. Please try again later.' },
            { status: 503 },
        );
    }

    // Build a new multipart request containing just the file ImgBB needs.
    // Signup details such as the email and password are not forwarded to ImgBB.
    const uploadData = new FormData();
    uploadData.append('image', image);

    try {
        // IMAGE_UPLOAD_URL is the ImgBB upload endpoint configured in the server environment.
        // Encode the API key so it can safely be included as a query parameter.
        const response = await fetch(
            `${process.env.IMAGE_UPLOAD_URL}?key=${encodeURIComponent(apiKey)}`,
            {
                method: 'POST',
                body: uploadData,
                // Stop waiting after 30 seconds if ImgBB does not respond.
                signal: AbortSignal.timeout(30_000),
            },
        );
        // ImgBB returns the hosted image URL inside result.data.url.
        const result = await response.json();

        // Require a successful HTTP response, ImgBB success flag and an image URL string.
        // 502 tells the client that the external image service did not return a valid result.
        if (!response.ok || result.success !== true || typeof result.data?.url !== 'string') {
            return Response.json(
                { error: 'Image upload failed. Please try again.' },
                { status: 502 },
            );
        }

        // Parse the returned URL. An invalid URL throws an error handled by the catch block.
        const imageUrl = new URL(result.data.url);

        // Only return HTTPS image links for use as profile photos.
        if (imageUrl.protocol !== 'https:') {
            return Response.json(
                { error: 'Image upload failed. Please try again.' },
                { status: 502 },
            );
        }

        // Send only the image URL back to SignUpForm, which passes it to signUp.email().
        return Response.json({ imageUrl: imageUrl.href });
    } catch {
        // Handle connection failures, timeouts, invalid JSON and invalid URLs with one friendly error.
        return Response.json(
            { error: 'Unable to upload your image. Please try again.' },
            { status: 502 },
        );
    }
}
