import React from 'react';
import { NavLink } from 'react-router-dom';

const BlogDetails = ({ post }) => {
    return (
        <div className="bg-white text-left rounded-2xl p-6 mb-5 border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-4xl mx-auto transform hover:-translate-y-1">
            <NavLink to={`/blog/${post.id}`} className="block mb-4">
                <h2 className="font-extrabold text-2xl md:text-[1.8rem] text-gray-900 leading-tight hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                </h2>
            </NavLink>
            <p className="text-gray-600 mb-2 flex items-center space-x-2">
                <span className="text-blue-500 font-semibold">{post.author}</span>
                <span>&bull;</span>
                <NavLink to={`/categories/${post.category.replaceAll(" ", "-")}`} className="text-blue-500 underline hover:text-blue-600 transition-colors duration-300">
                    {post.category}
                </NavLink>
            </p>
            <p className="text-gray-500 mb-1">Posted on {post.date}</p>
            <p className="text-gray-700 mb-5 leading-relaxed">{post.content}</p>
            <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                    <NavLink key={index} to={`/tags/${tag.replaceAll(" ", "-")}`}>
                        <span className="bg-blue-100 text-sm text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-300">
                            {`#${tag}`}
                        </span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BlogDetails;
