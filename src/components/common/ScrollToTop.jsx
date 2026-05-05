'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Small timeout to ensure the DOM has updated and Lenis/Browser can reset
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
