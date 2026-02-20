import { SearchClient } from "@/components/search/SearchClient";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getSearchResults } from "@/actions/search.actions";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const query = typeof sp?.q === 'string' ? sp.q : '';

  const results = await getSearchResults(query);

  return (
    <DashboardLayout>
      <SearchClient initialQuery={query} initialResults={results as any} />
    </DashboardLayout>
  );
}
