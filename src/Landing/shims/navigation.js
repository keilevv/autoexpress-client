import { useLocation, useNavigate, useSearchParams as useReactRouterSearchParams } from 'react-router-dom';

export const usePathname = () => {
    const location = useLocation();
    return location.pathname;
};

export const useRouter = () => {
    const navigate = useNavigate();
    return {
        push: (href) => navigate(href),
        replace: (href) => navigate(href, { replace: true }),
        back: () => navigate(-1)
    };
};

export const useSearchParams = () => {
    const [searchParams] = useReactRouterSearchParams();
    return searchParams;
};
