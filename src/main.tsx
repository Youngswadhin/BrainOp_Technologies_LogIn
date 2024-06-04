import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import "./index.css";

import Nav from "./components/Nav.tsx";
import App from "./pages/App.tsx";
import Posts from "./pages/Posts.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./components/CreatePost.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <AuthProvider>
                <ToastContainer />
                <Nav />
                <CreatePost />
                <RouterProvider router={router} />
              </AuthProvider>
            </NextThemesProvider>
          </NextUIProvider>
        </QueryClientProvider>
      </RecoilRoot>
  </>
);
