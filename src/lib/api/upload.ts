// Send a file to our upload API and return the ImgBB image URL.
export async function uploadImage(image: File): Promise<string> {
    const uploadData = new FormData();
    uploadData.append('image', image);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
    });

    const result = await response.json();

    if (!response.ok || typeof result.imageUrl !== 'string' || !result.imageUrl) {
        throw new Error(result.error || 'Image upload failed. Please try again.');
    }

    return result.imageUrl;
}
