"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError('> ERROR: INVALID CREDENTIALS.');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-md mx-auto flex flex-col justify-center">
      <div className="p-6 border border-[#33ff00] bg-black shadow-[0_0_15px_rgba(51,255,0,0.3)]">
        <h1 className="text-2xl mb-6 uppercase border-b border-[#33ff00] pb-2">&gt; AUTHENTICATION REQUIRED</h1>
        
        {error && <p className="mb-4 text-red-500 font-bold">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="uppercase text-sm">&gt; IDENTIFIER (USERNAME)</label>
            <input 
              type="text" 
              id="username" 
              className="p-2 font-mono uppercase"
              placeholder="_"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="uppercase text-sm">&gt; PASSCODE</label>
            <input 
              type="password" 
              id="password" 
              className="p-2 font-mono"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="terminal-btn w-full py-3 mt-4 border border-[#33ff00] uppercase font-bold tracking-widest transition-colors"
          >
            [ SUBMIT CREDENTIALS ]
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#33ff00] text-center">
          <Link href="/" className="terminal-btn px-4 py-1 text-sm hover:underline opacity-80 border border-transparent">
            &lt; ABORT AND RETURN TO TERMINAL
          </Link>
        </div>
      </div>
    </main>
  );
}
