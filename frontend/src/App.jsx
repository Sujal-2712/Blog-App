import "./App.css";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import BlogPage from "./pages/BlogPage";
import TagPage from "./pages/TagPage";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import UploadBlog from "./pages/UploadBlog";
import Profile from "./pages/Profile";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';


function App() {
  const { fetchData } = useContext(AppContext);
  const { isAuthenticated } = useAuth();
  const { user } = useContext(AppContext);
  console.log(user);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    if (location.pathname.includes("tags")) {
      const tag = location.pathname.split("/").at(-1).replace("-", " ");
      fetchData(parseInt(page), tag);
    } else if (location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchData(parseInt(page), null, category);
    } else {
      fetchData(parseInt(page));
    }
  }, [location.pathname, location.search]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isAuthenticated ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Navigate to="/login" replace />
        )}

        {isAuthenticated ? (
          <Route path="/addblog" element={<UploadBlog />} />
        ) : (
          <Navigate to="/login" replace />
        )}
      </Routes></>
  );
}

export default App;
