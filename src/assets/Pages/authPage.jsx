import { createContext, useContext, useState } from "react";
import { Login } from "../../components/login";
import { Register } from "../../components/register";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isRegister,
        setIsRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthPage = () => {
  const { isRegister } = useContext(AuthContext);
  return !isRegister ? <Login /> : <Register />;
};
export { AuthContext };