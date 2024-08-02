import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import BlogDetails from '../components/BlogDetails';
import { IoMdArrowRoundBack } from "react-icons/io";

const apiUrl = `http://localhost:3001/api/blog`;

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedblogs] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, setLoading } = useContext(AppContext);
    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        console.log(blogId);
        const url = `${apiUrl}?blogId=${blogId}`;

        try {
            console.log(url);
            const result = await fetch(url);
            const data = await result.json();
            setBlog(data.blog);
            setRelatedblogs(data.relatedBlogs);
            console.log(data.relatedBlogs); // Logging the correct data
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname, blogId]);

    return (
        <div className=''>
            <Header />
            <div className='relative top-16'>
                <div className='max-w-4xl mx-auto mb-2'>
                    <button onClick={() => {
                        navigate(-1);
                    }} className='border-gray-500 border-2 py-1 text-gray-800 flex justify-center items-center gap-1 rounded-md px-4'><IoMdArrowRoundBack />
                        Back
                    </button>
                </div>

                {
                    loading ? <Spinner /> : blog ? (
                        <div className='max-w-4xl mx-auto'>
                            <BlogDetails post={blog} />

                            <h2 className='p-1 my-2 text-blue-600 font-extrabold text-center text-3xl'>Related Blogs</h2>

                            {
                                relatedBlogs.map((post) => (
                                    <div key={post.id} className=''>
                                        <BlogDetails post={post} />
                                    </div>
                                ))
                            }

                        </div>
                    ) : (
                        <div><Spinner /></div>
                    )
                }
            </div>

        </div>
    );
}

export default BlogPage;
