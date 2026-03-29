import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end border-b border-[#33ff00] pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-widest">> APT_DASHBOARD</h1>
          <p className="mt-1 text-sm opacity-80">STATUS: ONLINE // USER: SURVIVOR_001</p>
        </div>
        <Link href="/" className="text-sm hover:underline border border-[#33ff00] px-4 py-1 hover:bg-[#33ff00] hover:text-black">
          [ LOGOUT ]
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile / Stats Panel */}
        <section className="col-span-1 border border-[#33ff00] p-4">
          <h2 className="text-xl uppercase border-b border-[#33ff00] pb-2 mb-4">> VITALS</h2>
          <div className="space-y-4 font-mono text-sm">
            <p>SURVIVAL STREAK: <span className="font-bold">0 DAYS</span></p>
            <p>ACTIVE PROGRAM: <span className="opacity-50">NONE</span></p>
            <p>TOTAL PTS: <span className="font-bold">0</span></p>
          </div>
        </section>

        {/* Programs Panel */}
        <section className="col-span-1 md:col-span-2 border border-[#33ff00] p-4">
          <h2 className="text-xl uppercase border-b border-[#33ff00] pb-2 mb-4">> AVAILABLE PROTOCOLS (14-DAY)</h2>
          
          <div className="space-y-4">
            <div className="border border-[#33ff00] p-3 hover:bg-[#33ff00] hover:text-black transition-colors cursor-pointer">
              <h3 className="uppercase font-bold">1. Fitness & Endurance</h3>
              <p className="text-sm mt-1 opacity-80">Outrun the machines. Build stamina for long-distance evasion.</p>
            </div>
            
            <div className="border border-[#33ff00] p-3 hover:bg-[#33ff00] hover:text-black transition-colors cursor-pointer">
              <h3 className="uppercase font-bold">2. Health & Wellness</h3>
              <p className="text-sm mt-1 opacity-80">Ration management, injury recovery, and psychological fortitude.</p>
            </div>
            
            <div className="border border-[#33ff00] p-3 hover:bg-[#33ff00] hover:text-black transition-colors cursor-pointer">
              <h3 className="uppercase font-bold">3. Survival & Combat</h3>
              <p className="text-sm mt-1 opacity-80">Scavenging techniques, melee defense, and perimeter security.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}