import { db } from "@/db/drizzle";
import { colleges } from "@/db/schema";
import { asc, isNotNull, and, ne } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Onboarded Colleges | Unstory",
  description: "List of all colleges currently onboarded on Unstory.",
};

export default async function CollegesOnboardedPage() {
  // We only show colleges that actually have an email domain linked for now, 
  // or show all 1350? Let's show all, since that's what's asked.
  const allColleges = await db.query.colleges.findMany({
    orderBy: [asc(colleges.name)],
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Onboarded Colleges</h1>
                <p className="text-muted-foreground mt-2 text-lg">Unstory is exclusively available to students at these {allColleges.length} institutions.</p>
            </div>
            <Link href="/">
                <Button variant="outline" className="border-white/20">Back to Home</Button>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
          {allColleges.map((college) => (
            <Card key={college.id} className="bg-[#09090b] border-white/10 hover:border-white/30 transition-colors">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base line-clamp-2" title={college.name}>{college.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm text-muted-foreground space-y-2 mt-2">
                  <p className="line-clamp-1">{college.location || `${college.district}, ${college.state}`}</p>
                  {college.emailDomain ? (
                      <span className="text-xs font-mono bg-[#FFE500]/10 text-[#FFE500] px-2 py-1 rounded inline-block">@{college.emailDomain}</span>
                  ) : (
                      <span className="text-xs font-mono bg-white/5 text-muted-foreground px-2 py-1 rounded inline-block">Domain unknown</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
