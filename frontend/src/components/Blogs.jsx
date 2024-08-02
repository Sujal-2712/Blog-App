import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
import BlogDetails from './BlogDetails';

const Blogs = () => {
  const { loading, posts } = useContext(AppContext);

  return (
    <div className="flex justify-center min-h-screen p-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-4xl">
          {posts.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">No Posts found</p>
            </div>
          ) : (
            posts.map((post,index) => (
              <BlogDetails key={index} post={post}/>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
