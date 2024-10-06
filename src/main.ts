import type { PageResponse } from "./types/pageResponse.ts";

const base_url = "https://scrapbox.io/api/pages/";

export const CosenseClient = (projectName: string): {
    getPage: (pageTitle: string) => Promise<PageResponse>;
} => {
    const getPage = async (pageTitle: string): Promise<PageResponse> => {
        const res = await fetch(
            `${base_url}${projectName}/${encodeURIComponent(pageTitle)}`,
        );
        if (!res.ok) {
            throw new Error("Failed to fetch page");
        }
        return res.json();
    };

    return {
        getPage,
    };
};
