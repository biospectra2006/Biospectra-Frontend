const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

let journalTreeCache = null;

export const getCachedJournalTree = () => journalTreeCache;

export const getJournalTree = async () => {
    if (journalTreeCache) return journalTreeCache;
    const response = await fetch(`${API_URL}/journal/tree`);
    if (!response.ok) throw new Error('Failed to fetch journal tree');
    journalTreeCache = await response.json();
    return journalTreeCache;
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
