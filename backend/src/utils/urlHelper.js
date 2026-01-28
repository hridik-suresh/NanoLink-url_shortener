//Cleans and formats a URL string for consistency.
export const formatUrl = (url) => {
  let cleanedUrl = url.trim();

  // Remove trailing slash if it exists (e.g., example.com/ -> example.com)
  if (cleanedUrl.endsWith("/")) {
    cleanedUrl = cleanedUrl.slice(0, -1);
  }

  // If user didn't provide a protocol, default to https
  if (!cleanedUrl.startsWith("http://") && !cleanedUrl.startsWith("https://")) {
    cleanedUrl = `https://${cleanedUrl}`;
  }

  return cleanedUrl;
};
