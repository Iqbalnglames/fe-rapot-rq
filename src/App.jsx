import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { Navigation } from "./utilities/router";
import { useEffect, useState } from "react";
import { AuthPage, AuthProvider } from "./assets/Pages/authPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      {isLogin === false ? (
        <div className="bg-white absolute z-30 w-screen h-full">
          <AuthProvider>
            <AuthPage />
          </AuthProvider>
        </div>
      ) : (
        <div className="flex z-0">
          <Sidebar />
          <div className="flex z-0 flex-col w-full">
            <Navbar />
            <div className="p-8 z-0">
              <Navigation />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
