import React from 'react';

const DeleteConfirmationModal = ({ blog, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t bg-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Are you sure?</h3>
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
          <div className="p-4">
            <p className="mb-4 text-gray-900">Do you really want to delete the blog titled "<span className="font-semibold">{blog.title}</span>"? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => onDelete(blog._id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
