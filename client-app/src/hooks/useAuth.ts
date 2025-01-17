import { useState, useEffect } from "react";


interface User {
  name: string;
  avatarUrl: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    // Simula la verificación de autenticación
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Simula un usuario autenticado
        setUser({
          name: "Usuario Ejemplo",
          avatarUrl: "https://example.com/avatar.jpg",
        });
      }
    };

    checkAuth();
  }, []);

  const login = (username: string, password: string) => {
    if (username === "admin@x.cl" && password === "010203") {
      localStorage.setItem("token", "dummy-token");
      setUser({
        name: "Admin",
        avatarUrl: "https://example.com/avatar.jpg",
      });
    } else {
      alert("Credenciales inválidas");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
};
