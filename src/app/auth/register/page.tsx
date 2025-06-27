'use client'

import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function registerpage(){

    const[email,setemail]= useState('');
    const [password,setpassword]= useState('');
    const router = useRouter();

    
    const handleregister = async (e: React.FormEvent) =>{
        e.preventDefault();
    const {error} = await supabase.auth.signUp({
        email,
        password,
        options: {
    emailRedirectTo: 'http://localhost:3001/auth/notes',
  },
    });
    if (error)
    {
        alert("error occured");
    }
    else
    {
        alert("login successful");
        router.push('/auth/login')
    }
}

return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
     style={{ backgroundImage: `url('/photos/bg.jpg')` }}>
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-200 mb-6">Register</h1>
        <form onSubmit={handleregister} className="flex flex-col space-y-4">
          <input 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            className="bg-gray-200 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};