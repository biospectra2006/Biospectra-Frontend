const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getJournalTree = async () => {
    const response = await fetch(`${API_URL}/journal/tree`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch journal tree');
    return response.json();
};

// Fetch only a single issue — much faster than loading the entire tree
export const getIssueData = async (year, order) => {
    const response = await fetch(`${API_URL}/journal/issue/${year}/${order}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch issue data');
    return response.json();
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

