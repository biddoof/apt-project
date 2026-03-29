import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col justify-center gap-8">
      <header className="border-b border-[#33ff00] pb-4 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest">[ Apocalypse Personal Trainer ]</h1>
        <p className="mt-2 text-sm opacity-80">> INITIATING SURVIVAL PROTOCOLS...</p>
      </header>

      <section className="space-y-6">
        <div className="p-4 border border-[#33ff00] bg-black shadow-[0_0_10px_rgba(51,255,0,0.2)]">
          <h2 className="text-2xl mb-4 uppercase">> Welcome, Survivor.</h2>
          <p className="mb-4">
            The world has ended, but your training is just beginning. Prepare for the robot apocalypse with tailored programs in:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Fitness & Endurance</li>
            <li>Health & Wellness</li>
            <li>Survival & Combat Skills</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="px-6 py-2 border border-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-colors uppercase font-bold"
          >
            [ Initialize Login ]
          </Link>
          <Link 
            href="/dashboard" 
            className="px-6 py-2 border border-[#33ff00] opacity-50 hover:opacity-100 transition-opacity uppercase font-bold"
          >
            [ Access Dashboard ]
          </Link>
        </div>
      </section>

      <footer className="mt-16 text-xs text-center opacity-60">
        <p>SYSTEM v1.0.0 // HOST: IAMMEAN.COM // APT PROXY ACTIVE</p>
      </footer>
    </main>
  );
}