import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GoogleAnalytics = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/signin");

    useEffect(() => {
        if (!isAdminRoute && window.gtag) {
            window.gtag("config", "G-WK213FF0FJ", {
                page_path: location.pathname + location.search,
            });
        }
    }, [location, isAdminRoute]);

    if (isAdminRoute) {
        return null;
    }

    return (
        <Helmet>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-WK213FF0FJ" />
            <script id="google-analytics">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WK213FF0FJ');
        `}
            </script>
        </Helmet>
    );
};

export default GoogleAnalytics;
