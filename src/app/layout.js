'use client'

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/rsuite.min.css';
// Bootstrap JS will be loaded dynamically on client side
import "../styles/globals.css";
import "../styles/styles.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientOnly from "../components/ClientOnly";
import { ToastContainer, toast } from 'react-toastify';

const AUTO_LOGOUT_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const Layout = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const isAuthPage = pathname === "/login" || pathname === "/";

  useEffect(() => {
    // Load Bootstrap JS dynamically on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    if (isAuthPage) return;

    const resetSession = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    const checkAutoLogout = () => {
      const lastActivity = parseInt(localStorage.getItem("lastActivity") || "0", 10);
      const currentTime = Date.now();

      if (currentTime - lastActivity > AUTO_LOGOUT_TIME) {
        localStorage.removeItem("lastActivity"); // Clear session
        toast.warning("Session expired. Logging out...");
        router.push("/login"); // Redirect to login
      }
    };

    // Set initial session time on component mount
    resetSession();

    // Listen for user interactions to reset the session timer
    window.addEventListener("mousemove", resetSession);
    window.addEventListener("keydown", resetSession);
    window.addEventListener("click", resetSession);

    // Check auto logout every minute
    const interval = setInterval(checkAutoLogout, 60 * 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetSession);
      window.removeEventListener("keydown", resetSession);
      window.removeEventListener("click", resetSession);
    };
  }, [isAuthPage, router]);

  return (
    <html lang="en">
      <body className="d-flex vh-100">
        <Provider store={store}>
          <ClientOnly>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              limit={5}
            />
          </ClientOnly>

          {/* Show Sidebar and Header for all modules except login & landing page */}
          {!isAuthPage && <Sidebar isFixed={isFixed} setIsFixed={setIsFixed} />}

          <div className={`d-flex flex-column main-content-transition main-content-wrapper ${!isAuthPage && isFixed ? "main-content-expanded" : "main-content-collapsed"} ${isAuthPage ? "ml-unset" : ""}`}>
            {!isAuthPage && <Header />}

            <main className={`flex-grow-1 ${isAuthPage ? "" : "p-4"}`}>
              {children}
            </main>

            {/* Hide Footer for login and landing page */}
            {!isAuthPage && <Footer />}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;