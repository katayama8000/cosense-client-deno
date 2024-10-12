import type { PageResponse } from "./types/pageResponse.ts";

const base_url = "https://scrapbox.io/api/pages/";

/**
 * A client for interacting with the Scrapbox API to check for page existence and fetch page data.
 *
 * @param {string} projectName - The name of the Scrapbox project.
 * @returns {{
 *   checkPageExist: (pageTitle: string) => Promise<boolean>,
 *   getPage: (pageTitle: string) => Promise<PageResponse>
 * }} - An object with methods to check if a page exists and to get page data.
 */
export const CosenseClient = (projectName: string): {
    checkPageExist: (pageTitle: string) => Promise<boolean>;
    getPage: (pageTitle: string) => Promise<PageResponse>;
} => {
    /**
     * Fetches the details of a page in the Scrapbox project.
     *
     * @param {string} pageTitle - The title of the page to fetch.
     * @returns {Promise<PageResponse>} - A promise that resolves with the page data.
     * @throws {Error} - Throws an error if the page fails to fetch.
     */
    const getPage = async (pageTitle: string): Promise<PageResponse> => {
        const res = await fetch(
            `${base_url}${projectName}/${encodeURIComponent(pageTitle)}`,
        );
        if (!res.ok) {
            throw new Error("Failed to fetch page");
        }
        return res.json();
    };

    /**
     * Checks if a page exists in the Scrapbox project.
     *
     * @param {string} pageTitle - The title of the page to check.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the page exists, otherwise `false`.
     */
    const checkPageExist = async (pageTitle: string): Promise<boolean> => {
        // FIXME: check status code
        try {
            await getPage(pageTitle);
            return true;
        } catch (_) {
            return false;
        }
    };

    return {
        checkPageExist,
        getPage,
    };
};
