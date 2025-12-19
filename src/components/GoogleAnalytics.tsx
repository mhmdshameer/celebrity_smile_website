import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GoogleAnalytics = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/signin");

    if (isAdminRoute) {
        return null;
    }

    return (
        <Helmet>
            {/* Google tag (gtag.js) */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-WK213FF0FJ"></script>
            <script>
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
