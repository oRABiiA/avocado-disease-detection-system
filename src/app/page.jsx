'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import LoginPage to avoid hydration mismatch
const LoginPage = dynamic(() => import('./(auth)/login/page'));

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      router.push('/dashboard'); // ✅ Let layout + route handle the dashboard page
    } else {
      setCheckingAuth(false); // Show login page
    }
  }, [router]);

  const handleLoginSuccess = () => {
    localStorage.setItem('loggedIn', 'true');
    router.push('/dashboard'); // ✅ After login, route to /dashboard
  };

  if (checkingAuth) return null; // Or show a loading spinner

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}
