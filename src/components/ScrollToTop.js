import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// this ensures when navigating to a new page within the website, the page opens from top and isnt scrolled down to previous page's level


export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}