const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const maxImageSize = 2 * 1024 * 1024;

export async function POST(request: Request) {
    let formData: FormData;

    try {
        // 1. Get the file sent by the form.
        formData = await request.formData();
    } catch {
        return Response.json({ error: 'Please select an image to upload.' }, { status: 400 });
    }

    const image = formData.get('image');

    if (!(image instanceof File) || image.size === 0) {
        return Response.json({ error: 'Please select an image to upload.' }, { status: 400 });
    }

    if (!allowedImageTypes.has(image.type)) {
        return Response.json(
            { error: 'Please select a JPG, PNG, WebP or GIF image.' },
            { status: 400 },
        );
    }

    if (image.size > maxImageSize) {
        return Response.json(
            { error: 'Your image must be 2 MB or smaller.' },
            { status: 400 },
        );
    }

    // 2. Read the private ImgBB settings on the server.
    const apiKey = process.env.IMGBB_API_KEY;
    const uploadUrl = process.env.IMAGE_UPLOAD_URL;

    if (!apiKey || !uploadUrl) {
        return Response.json(
            { error: 'Image upload is not configured. Please try again later.' },
            { status: 503 },
        );
    }

    // 3. Send only the image file to ImgBB.
    const uploadData = new FormData();
    uploadData.append('image', image);

    try {
        const url = new URL(uploadUrl);
        url.searchParams.set('key', apiKey);

        const response = await fetch(url, {
            method: 'POST',
            body: uploadData,
            signal: AbortSignal.timeout(30_000),
        });
        const result = await response.json();

        if (!response.ok || result.success !== true || typeof result.data?.url !== 'string') {
            return Response.json(
                { error: 'Image upload failed. Please try again.' },
                { status: 502 },
            );
        }

        const imageUrl = new URL(result.data.url);

        if (imageUrl.protocol !== 'https:') {
            return Response.json(
                { error: 'Image upload failed. Please try again.' },
                { status: 502 },
            );
        }

        // 4. Return the hosted URL to the form.
        return Response.json({ imageUrl: imageUrl.href });
    } catch {
        return Response.json(
            { error: 'Unable to upload your image. Please try again.' },
            { status: 502 },
        );
    }
}
