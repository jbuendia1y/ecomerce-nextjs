import { createContext } from "react";

export const AuthContext = createContext<{
  userId: string | null | undefined;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  registerWithEmailAndPassword: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}>({
  userId: undefined,
  loginWithEmailAndPassword: () => Promise.resolve(),
  registerWithEmailAndPassword: () => Promise.resolve(),
});
