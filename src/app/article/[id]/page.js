// Server Component
import { getArticleById } from '@/services/api';
import ArticleClient from './ArticleClient';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const article = await getArticleById(id);
    return {
      title: article?.title || 'Article Details',
      description: article?.abstract?.slice(0, 160) || `Read this article in Biospectra Journal.`,
    };
  } catch (e) {
    return { title: 'Article Details' };
  }
}

export default async function Page({ params }) {
  const { id } = await params;
  let article = null;
  try {
    article = await getArticleById(id);
  } catch (error) {
    console.error('Error fetching article:', error);
  }

  return <ArticleClient article={article} />;
}
