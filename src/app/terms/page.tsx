import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFE500] selection:text-black">
      <header className="flex h-16 items-center justify-between px-6 border-b border-white/10 fixed top-0 w-full bg-black/50 backdrop-blur-md z-50">
        <Link href="/" className="text-xl font-bold tracking-tight">Unistory</Link>
        <Link href="/">
           <Button variant="ghost" className="text-white hover:bg-white/10">Back to Home</Button>
        </Link>
      </header>
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
         <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
         <p className="text-muted-foreground mb-12">Last updated: February 24, 2026</p>

         <div className="space-y-12 text-white/80 leading-relaxed text-lg">
             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                 <p>By accessing or using Unistory, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
             </section>

             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">2. Student Verification</h2>
                 <p>Unistory is exclusive to university students. You must verify your student status via a valid .edu email address. False representation of student status may result in immediate account termination.</p>
             </section>

             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">3. Content Guidelines</h2>
                 <p>We encourage open expression but prohibit hate speech, harassment, or any illegal content. We reserve the right to remove content that violates our Community Guidelines.</p>
             </section>

             <section>
                 <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                 <p>Unistory shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits.</p>
             </section>
         </div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} Unistory. Built for students.</p>
      </footer>
    </div>
  );
}
