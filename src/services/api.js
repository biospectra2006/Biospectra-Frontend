const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

let journalTreeCache = null;
const issueCache = {}; // keyed by "year-order"

export const getCachedJournalTree = () => journalTreeCache;

export const getJournalTree = async () => {
    if (journalTreeCache) return journalTreeCache;
    const response = await fetch(`${API_URL}/journal/tree`);
    if (!response.ok) throw new Error('Failed to fetch journal tree');
    journalTreeCache = await response.json();
    return journalTreeCache;
};

// Fetch only a single issue — much faster than loading the entire tree
export const getIssueData = async (year, order) => {
    const cacheKey = `${year}-${order}`;
    if (issueCache[cacheKey]) return issueCache[cacheKey];
    const response = await fetch(`${API_URL}/journal/issue/${year}/${order}`);
    if (!response.ok) throw new Error('Failed to fetch issue data');
    const data = await response.json();
    issueCache[cacheKey] = data;
    return data;
};

export const getArticleById = async (id) => {
    const response = await fetch(`${API_URL}/articles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
};

export const getLatestArticles = async (limit = 10) => {
    const response = await fetch(`${API_URL}/articles/latest?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch latest articles');
    return response.json();
};

export const getArticlesByTopic = async (topicId) => {
    const response = await fetch(`${API_URL}/articles/topic/${topicId}`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
};

export const getYears = async () => {
    const response = await fetch(`${API_URL}/journal/years`);
    if (!response.ok) throw new Error('Failed to fetch years');
    return response.json();
};

export const getIssuesByYear = async (yearId) => {
    const response = await fetch(`${API_URL}/journal/years/${yearId}/issues`);
    if (!response.ok) throw new Error('Failed to fetch issues');
    return response.json();
};

export const getCategoriesByIssue = async (issueId) => {
    const response = await fetch(`${API_URL}/journal/issues/${issueId}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};

export const globalSearch = async (query) => {
    if (!query) return { articles: [], editorial: [] };
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search');
    return response.json();
};

