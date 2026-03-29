import Link from 'next/link';

export default function Login() {
 return (
 <main className="min-h-screen p-8 max-w-md mx-auto flex flex-col justify-center">
 <div className="p-6 border border-[#33ff00] bg-black shadow-[0_0_15px_rgba(51,255,0,0.3)]">
 <h1 className="text-2xl mb-6 uppercase border-b border-[#33ff00] pb-2">&gt; AUTHENTICATION REQUIRED</h1>
 
 <form className="space-y-6">
 <div className="flex flex-col gap-2">
 <label htmlFor="username" className="uppercase text-sm">&gt; IDENTIFIER (USERNAME)</label>
 <input 
 type="text" 
 id="username" 
 className="p-2 font-mono uppercase"
 placeholder="_"
 />
 </div>
 
 <div className="flex flex-col gap-2">
 <label htmlFor="password" className="uppercase text-sm">&gt; PASSCODE</label>
 <input 
 type="password" 
 id="password" 
 className="p-2 font-mono"
 placeholder="**********"
 />
 </div>

 <button 
 type="button"
 className="w-full py-3 mt-4 border border-[#33ff00] terminal-btn uppercase font-bold tracking-widest transition-colors"
 >
 [ SUBMIT CREDENTIALS ]
 </button>
 </form>

 <div className="mt-6 pt-4 border-t border-[#33ff00] text-center">
 <Link href="/" className="text-sm hover:underline opacity-80">
 &lt; ABORT AND RETURN TO TERMINAL
 </Link>
 </div>
 </div>
 </main>
 );
}