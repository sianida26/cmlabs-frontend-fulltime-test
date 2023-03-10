export const toTitleCase = (str: string): string => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}

export const convertEmbedLink = (url: string): string => {
    const VIDEO_ID_REGEX = /(?:v=)([\w-]+)/;
    const videoId = url.match(VIDEO_ID_REGEX)?.[1];
    return `https://www.youtube.com/embed/${videoId}`;
}