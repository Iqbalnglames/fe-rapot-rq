import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { Navigation } from "./utilities/router";
import { useEffect, useState } from "react";
import { AuthPage, AuthProvider } from "./assets/Pages/authPage";
import { fetchUser } from "./utilities/fetchUser";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [showSide, setShowSide] = useState(false);

  const token = localStorage.getItem("token");
  const fetchUserData = async () => {
    fetchUser().then((res) => {
      sessionStorage.setItem("classUser", res.data.kelas?.id);
    });
  };
  useEffect(() => {
    fetchUserData();
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
        <div className="flex z-0 lg:h-auto h-screen overflow-scroll">
          <Sidebar showSide={showSide} showSideFunc={() => setShowSide(!showSide)} />
          <div className="flex z-0 flex-col w-full">
            <Navbar showSide={() => setShowSide(!showSide)} />
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
