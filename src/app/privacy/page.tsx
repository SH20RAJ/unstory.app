import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFE500] selection:text-black">
      <header className="flex h-16 items-center justify-between px-6 border-b border-white/10 fixed top-0 w-full bg-black/50 backdrop-blur-md z-50">
        <Link href="/" className="text-xl font-bold tracking-tight">Unistory</Link>
        <Link href="/">
           <Button variant="ghost" className="text-white hover:bg-white/10">Back to Home</Button>
        </Link>
      </header>
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
         <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
         <p className="text-muted-foreground mb-12">Last updated: February 24, 2026</p>

         <div className="space-y-12 text-white/80 leading-relaxed text-lg">
             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">1. Data We Collect</h2>
                 <p>We collect information you provide directly to us (such as profile data) and data we infer from your usage (such as interests and connections).</p>
             </section>

             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Data</h2>
                 <p>We use your data to personalize your feed, suggest connections, and improve the platform experience. We do not sell your personal data to third parties.</p>
             </section>

             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                 <p>We implement appropriate technical measures to protect your personal data against unauthorized access or disclosure.</p>
             </section>

             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
                 <p>You have the right to access, correct, or delete your personal data. You can manage your privacy settings directly from your account dashboard.</p>
             </section>
         </div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} Unistory. Built for students.</p>
      </footer>
    </div>
  );
}
