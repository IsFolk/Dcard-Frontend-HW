// src/app/page.tsx
"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // 導航到 /blog 路徑
    router.push('/blog');
  }, []);

  return <div>Redirecting to Blog Page...</div>;

};

export default HomePage;