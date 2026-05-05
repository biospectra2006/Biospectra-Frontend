// Server Component
import IssueClient from './IssueClient';

export async function generateMetadata({ params }) {
  const { volume, issue } = await params;
  return {
    title: `Volume ${volume}, Issue ${issue}`,
    description: `Browse scholarly research and scientific articles published in Biospectra, Volume ${volume}, Issue ${issue}.`,
  };
}

export default function Page({ params }) {
  return <IssueClient params={params} />;
}
