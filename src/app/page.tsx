import Link from 'next/link';
import { content } from '../content';

export default function Home() {
  const { global, landing } = content;

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col justify-center gap-8">
      <header className="border-b border-[#33ff00] pb-4 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest">{global.appTitle}</h1>
        <p className="mt-2 text-sm opacity-80">{landing.subtitle}</p>
      </header>

      <section className="space-y-6">
        <div className="p-4 border border-[#33ff00] bg-black shadow-[0_0_10px_rgba(51,255,0,0.2)]">
          <h2 className="text-2xl mb-4 uppercase">{landing.welcomeHeader}</h2>
          <p className="mb-4">{landing.welcomeBody}</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {landing.welcomeList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="terminal-btn px-6 py-2 border border-[#33ff00] transition-colors uppercase font-bold"
          >
            {landing.btnLogin}
          </Link>
          <Link 
            href="/dashboard" 
            className="terminal-btn px-6 py-2 border border-[#33ff00] opacity-50 hover:opacity-100 transition-opacity uppercase font-bold"
          >
            {landing.btnDashboard}
          </Link>
        </div>
      </section>

      <footer className="mt-16 text-xs text-center opacity-60">
        <p>{global.footer}</p>
      </footer>
    </main>
  );
}
