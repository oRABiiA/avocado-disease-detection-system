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
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      router.push('/dashboard'); // ✅ Redirect to dashboard if logged in
    } else {
      setCheckingAuth(false); // Show login page
    }
  }, [router]);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('loggedIn', 'true');
    router.push('/dashboard'); // ✅ After login, route to /dashboard
  };

  if (checkingAuth) return null; // Optional: show spinner/loading

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}
