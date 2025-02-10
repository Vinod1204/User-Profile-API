/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import axios from "axios";

const fetchUsers = async (token: string) => {
  try {
    // Attach the token to the request
    const response = await axios.get("http://localhost:5000/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("API Response:", response.data);
  } catch (error) {
    console.error("API Error:", error);
  }
};

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [typedText, setTypedText] = useState("");
  const [loading, setLoading] = useState(false);
  const fullText = "Welcome👋";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetchUsers(session.access_token); 
        router.push("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r animate-gradient from-red-400 via-purple-500 to-blue-600">
      <div className="p-8 bg-black rounded-lg shadow-lg text-center w-96">
        <h1 className="text-2xl mb-4 text-white font-bold h-10">{typedText}</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "black" }} // Set text color to black
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: "black" }} // Set text color to black
            disabled={loading}
          />
          <button
            type="submit"
            className="p-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
