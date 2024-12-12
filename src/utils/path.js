export const getAssetPath = (path) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return baseUrl.length ? `${baseUrl}${path}` : path;
};
