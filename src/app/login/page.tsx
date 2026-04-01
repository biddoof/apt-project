"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { content } from '../../content';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { login } = content;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(login.errorInvalid);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-md mx-auto flex flex-col justify-center">
      <div className="p-6 border border-[#0f380f] bg-transparent shadow-[6px_6px_0px_rgba(15,56,15,0.3)]">
        <h1 className="text-2xl mb-6 uppercase border-b border-[#0f380f] pb-2">{login.header}</h1>
        
        {error && <p className="mb-4 text-red-500 font-bold">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="uppercase text-sm">{login.labelUsername}</label>
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
            <label htmlFor="password" className="uppercase text-sm">{login.labelPassword}</label>
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
            className="terminal-btn w-full py-3 mt-4 border border-[#0f380f] uppercase font-bold tracking-widest transition-colors"
          >
            {login.btnSubmit}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#0f380f] text-center">
          <Link href="/" className="terminal-btn px-4 py-1 text-sm hover:underline opacity-80 border border-transparent">
            {login.btnAbort}
          </Link>
        </div>
      </div>
    </main>
  );
}
