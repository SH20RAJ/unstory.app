import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCollegeByDomainOrSlug } from "@/actions/college.actions";
import { CollegeClient } from "@/components/college/CollegeClient";

interface PageProps {
  params: Promise<{ domain: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { domain } = await params;
  const decodeDomain = decodeURIComponent(domain);
  const college = await getCollegeByDomainOrSlug(decodeDomain);

  if (!college) {
    return {
      title: "College Not Found",
    };
  }

  return {
    title: `${college.name} | Unstory`,
    description: `Connect with students from ${college.name}.`,
  };
}

export default async function CollegePage({ params }: PageProps) {
  const { domain } = await params;
  const decodeDomain = decodeURIComponent(domain);

  const college = await getCollegeByDomainOrSlug(decodeDomain);

  if (!college) {
    return notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <CollegeClient college={college as any} />;
}
