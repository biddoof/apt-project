"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startProgram, checkIn } from '../actions';
import { useState } from 'react';
import { content } from '../../content';

export default function DashboardClient({ user, programs }: any) {
  const router = useRouter();
  const [error, setError] = useState('');
  
  const { dashboard } = content;
  const activeProgram = user.progress?.[0];

  const handleStart = async (id: string) => {
    await startProgram(id);
    router.refresh();
  };

  const handleCheckIn = async (progressId: string) => {
    setError('');
    const res = await checkIn(progressId);
    if (res?.error) {
      setError(res.error);
    } else {
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end border-b border-[#33ff00] pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-widest">{dashboard.header}</h1>
          <p className="mt-1 text-sm opacity-80">{dashboard.statusOnline}{user.username.toUpperCase()}</p>
        </div>
        <Link href="/api/auth/signout" className="terminal-btn text-sm border border-[#33ff00] px-4 py-1">
          {dashboard.btnLogout}
        </Link>
      </header>

      {error && (
        <div className="mb-4 p-2 border border-red-500 text-red-500 font-bold uppercase">
          {dashboard.systemWarning}{error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile / Stats Panel */}
        <section className="col-span-1 border border-[#33ff00] p-4">
          <h2 className="text-xl uppercase border-b border-[#33ff00] pb-2 mb-4">{dashboard.vitalsHeader}</h2>
          <div className="space-y-4 font-mono text-sm">
            <p>{dashboard.streakLabel} <span className="font-bold">{user.streak} DAYS</span></p>
            <p>{dashboard.activeProgramLabel} <span className={activeProgram ? "text-[#33ff00]" : "opacity-50"}>
              {activeProgram ? activeProgram.program.name : dashboard.noneLabel}
            </span></p>
            <p>{dashboard.pointsLabel} <span className="font-bold">{user.points}</span></p>
          </div>
          
          {activeProgram && (
            <div className="mt-8 border-t border-[#33ff00] pt-4">
              <h3 className="uppercase font-bold mb-2">{dashboard.protocolProgressHeader}</h3>
              <div style={{ width: '100%', height: '1rem', border: '1px solid #33ff00', backgroundColor: '#000', marginBottom: '0.5rem' }}>
                <div style={{ height: '100%', backgroundColor: '#33ff00', width: `${(activeProgram.day / activeProgram.program.duration) * 100}%`, transition: 'width 0.3s' }}></div>
              </div>
              <p className="text-xs text-right">{dashboard.dayLabel} {activeProgram.day} {dashboard.ofLabel} {activeProgram.program.duration}</p>
              
              <button 
                onClick={() => handleCheckIn(activeProgram.id)}
                className="terminal-btn w-full mt-4 border border-[#33ff00] py-2 uppercase font-bold text-sm"
              >
                {dashboard.btnCompleteDaily}
              </button>
            </div>
          )}
        </section>

        {/* Programs Panel */}
        <section className="col-span-1 md:col-span-2 border border-[#33ff00] p-4">
          <h2 className="text-xl uppercase border-b border-[#33ff00] pb-2 mb-4">
            {dashboard.availableProtocolsHeader}
          </h2>
          
          <div className="space-y-4">
            {programs.map((p: any, i: number) => (
              <div 
                key={p.id} 
                onClick={() => !activeProgram && handleStart(p.id)}
                className={`protocol-card border border-[#33ff00] p-3 transition-colors ${!activeProgram ? 'cursor-pointer hover:bg-[#33ff00] hover:!text-black' : 'opacity-50 cursor-not-allowed'}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="uppercase font-bold">{i + 1}. {p.name}</h3>
                  {!activeProgram && <span className="text-xs border border-[#33ff00] px-2 py-1 uppercase">{dashboard.btnStart}</span>}
                </div>
                <p className="text-sm mt-1 opacity-80">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
