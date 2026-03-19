import { useLocation, useNavigate, useSearchParams as useReactRouterSearchParams } from 'react-router-dom';

export const usePathname = () => {
    const location = useLocation();
    let pathname = location.pathname;
    if (pathname === '/landing') return '/';
    if (pathname.startsWith('/landing/')) return pathname.replace('/landing', '');
    return pathname;
};

export const useRouter = () => {
    const navigate = useNavigate();
    return {
        push: (href) => {
            if (href === '/') navigate('/landing');
            else navigate('/landing' + href);
        },
        replace: (href) => navigate('/landing' + href, { replace: true }),
        back: () => navigate(-1)
    };
};

export const useSearchParams = () => {
    const [searchParams] = useReactRouterSearchParams();
    return searchParams;
};
