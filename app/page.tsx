'use client';

import { MEMBER_PAGE } from '@/constants/path';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();
    return router.replace(MEMBER_PAGE);
};
export default Home;
