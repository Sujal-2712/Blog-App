import React, { useState } from 'react';
import Header from '../components/Header';
import { FaCloudUploadAlt } from "react-icons/fa";
import {toast} from 'react-hot-toast';

const UploadBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the blog data to send to the backend
    const blogData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      category: category
    };

    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:3001/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(blogData),
      });


      console.log('Blog created successfully:', response.data);
      setTitle('');
      setContent('');
      setTags('');
      setCategory('');
      toast.success('Sucessfully Blog Uploaded!!')
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Something went wrong');
      // Handle error scenarios, such as displaying an error message to the user
    }
  };

  return (
    <>
      <Header />
      <div className="flex mt-4 min-h-screen justify-center items-center">
        <div className="flex-1 max-w-xl h-fit bg-gray-100 shadow-lg w-full mx-auto p-8 rounded-lg border-2">
          <header className="text-2xl font-bold uppercase mb-6">Upload New Blog</header>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-md font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter blog title"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                rows={8}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter blog content"
                required
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={handleTagsChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., technology, AI, machine learning"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                id="tags"
                type="text"
                value={category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Web Development, Data Science,"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 flex justify-center items-center gap-2 font-bold hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaCloudUploadAlt className='text-2xl'/> Upload Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadBlog;
