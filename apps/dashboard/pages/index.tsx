import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashboardHome: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/installations');
  }, []);
  return null;
};

export default DashboardHome;
