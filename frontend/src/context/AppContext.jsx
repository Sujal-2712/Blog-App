import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';
import Cookies from "js-cookie";

export const AppContext = createContext();
const apiUrl = `http://localhost:3001/api/get-blogs`;
const userUrl = `http://localhost:3001`;

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [tag, setTag] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in on page load
    checkLoginStatus();
  }, []);

  async function checkLoginStatus() {
    const jwtToken = Cookies.get('jwt');
    if (jwtToken) {
      try {
        const response = await fetch(userUrl + "/user/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          setIsLogin(true);
        } else {
          // If fetching user data fails, redirect to login
          setIsLogin(false);
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLogin(false);
        navigate('/');
      }
    } else {
      setIsLogin(false);
      navigate('/');
    }
  }


  async function fetchData(page, tag = null, category = null) {
    setLoading(true);
    try {
      let url = `${apiUrl}?page=${page}`;
      if (tag) {
        url += `&tag=${tag}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      const result = await fetch(url);
      const data = await result.json();
      setPage(data.page);
      setPosts(data.posts);
      setAllPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error.message);
      setPage(1);
      setTotalPages(null);
    }
    setLoading(false);
  }

  

  async function fetchUserBlogs(userId) {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs?userId=${userId}`);
      const textResponse = await response.json();
      console.log(textResponse);
      setBlogs(textResponse);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(blogId) {
    try {
      await fetch(`http://localhost:3001/api/blogs/${blogId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      toast.success('Successfully Deleted!!');
    } catch (err) {
      toast.error('Something went wrong!!');
      console.error(err);
    }
  }

  async function handleUpdate(blogId, updatedBlog) {
    try {
      console.log(blogId, updatedBlog)
      const response = await fetch(`http://localhost:3001/api/blogs?id=${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updatedBlog)
      });
      const data = await response.json();
      
      setBlogs(blogs.map(blog => (blog._id === blogId ? data : blog)));
      toast.success('Successfully Updated');
    } catch (err) {
      toast.error('Something went wrong!!')
      console.error(err);
    }
  }

  function handlePageChange(newPage) {
    navigate({ search: `?page=${newPage}` });
    fetchData(newPage, tag);
  }

  function handleTagChange(newTag) {
    setTag(newTag);
    fetchData(page, newTag);
  }

  function handleSearch(query) {
    if (!query) {
      setPosts(allPosts);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filtered = allPosts.filter(post => {
      return post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.author.toLowerCase().includes(lowerCaseQuery) ||
        post.date.toLowerCase().includes(lowerCaseQuery) ||
        post.category.toLowerCase().includes(lowerCaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
        post.content.toLowerCase().includes(lowerCaseQuery);
    });
    setPosts(filtered);
  }

  const value = {
    loading,
    setLoading,
    posts,
    setPosts,
    page,
    setPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    handleTagChange,
    handleSearch,
    fetchData,
    isLogin,
    setIsLogin,
    user,
    setUser,
    blogs,
    fetchUserBlogs,
    handleDelete,
    handleUpdate,
    checkLoginStatus
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
