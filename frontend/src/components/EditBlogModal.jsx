import React, { useState } from 'react';

const EditBlogModal = ({ blog, onSave, onCancel }) => {
  const [updatedTitle, setUpdatedTitle] = useState(blog.title);
  const [updatedContent, setUpdatedContent] = useState(blog.content);
  const [updatedTags, setUpdatedTags] = useState(blog.tags.join(', '));
  const [updatedCategory, setUpdatedCategory] = useState(blog.category);

  const saveUpdate = () => {
    onSave(blog._id, {
      ...blog,
      title: updatedTitle,
      content: updatedContent,
      tags: updatedTags.split(',').map(tag => tag.trim()),
      category: updatedCategory,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t bg-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Edit Blog</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onCancel}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6m-6-6L1 1m6 6l6-6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input
                  type="text"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <div>
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                <textarea
                  id="content"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  placeholder="Content"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900">Tags (comma separated)</label>
                <input
                  type="text"
                  id="tags"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={updatedTags}
                  onChange={(e) => setUpdatedTags(e.target.value)}
                  placeholder="Tags"
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <input
                  type="text"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  placeholder="Category"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={saveUpdate}
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogModal;
