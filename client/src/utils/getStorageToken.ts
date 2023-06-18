export default async function getUploadToken(bucketName: string) {
  try {
    const response = await fetch('/api/initiate-upload', {
      method: 'GET',
      body: JSON.stringify({
        bucketName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const { uploadToken } = data;
    console.log('Received upload Token: ' + uploadToken);
    return uploadToken;
  } catch (e) {
    console.log(e);
  }
}
