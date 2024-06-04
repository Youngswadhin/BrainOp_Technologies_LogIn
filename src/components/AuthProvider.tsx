import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { authAtom, userAtom } from "../atom/atom";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isLoading, data } = useQuery({
    queryKey: ["userData"],
    initialData: user,
    queryFn: async () => {
      try {
        if (!auth) {
          const data = await axios.get(
            import.meta.env.VITE_SERVER_URL! + "/user",
            { withCredentials: true }
          );
          if (!data.data.success) {
            setAuth(false);
            redirect("/");
            toast(data.data.msg??"error");
          }
          return data.data.data;
        } else {
          return user;
      }
      } catch (error: any) {
        console.log(error);
        toast("Some error happend");
      }
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data);
      setAuth(true);
    }
  }, [data, setUser, setAuth, isLoading]);

  if (isLoading) return "Loading...";

  return <>{children}</>;
};

export default AuthProvider;
