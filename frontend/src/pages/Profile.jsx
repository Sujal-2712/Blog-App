import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import EditBlogModal from '../components/EditBlogModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md'; // Import MdDeleteOutline icon
import { BiEdit } from "react-icons/bi";
 // Import FaRegEdit icon

const Profile = () => {
  const { user, blogs, fetchUserBlogs, handleDelete, handleUpdate, checkLoginStatus } = useContext(AppContext);
  let userId = null;

  if (user != null) userId = user._id;
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserBlogs(userId);
    }
  }, [userId]);

  const startEditing = (blog) => {
    setEditingBlog(blog);
  };

  const startDeleting = (blog) => {
    setDeletingBlog(blog);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen mt-14 bg-gray-100">
        <div className="container max-w-7xl mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold">
                {user && user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user && user.name.toUpperCase()}</h2>
                <p className="text-gray-600 font-semibold"><span className='text-gray-900 font-bold'> Email : </span> {user && user.email}</p>
                <p className='text-gray-600 font-semibold'><span className='text-gray-900 font-bold'>Total Blogs Posted : </span> {blogs.length}</p>
              </div>
            </div>
          </div>
          <p className='text-2xl my-3 mx-1 font-bold'>All Posted Blogs</p>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-7">
            {blogs.length > 0 ? (
              blogs.map(blog => (
                <div key={blog._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{blog.title}</h3>
                  <p className="mb-2 font-medium text-gray-700">
                    <span className='text-gray-900 font-bold'> Content : </span>
                    {blog.content.substring(0, 20)}
                    {blog.content.length > 20 && '... '}
                    {blog.content.length > 20 && (
                      <span className="text-blue-500 cursor-pointer">Read more</span>
                    )}
                  </p>
                  <p className="text-gray-700 font-medium mb-2"><span className='text-gray-900 font-bold'> Tags :</span> {blog.tags.join(', ')}</p>
                  <p className="text-gray-700 font-medium mb-2"><span className='text-gray-900 font-bold'> Category : </span> {blog.category}</p>
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1  flex justify-between gap-1 items-center text-white rounded-lg bg-slate-900 "
                      onClick={() => startEditing(blog)}
                    >
                      <BiEdit className='text-2xl text-green-500' /> Edit
                    </button>
                    <button onClick={() => startDeleting(blog)} className="px-2 py-1 flex justify-center text-white items-center rounded-lg bg-slate-900">
                      <MdDeleteOutline className='text-2xl text-red-500'

                      /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="mx-1 text-gray-600">No blogs Uploaded.</p>
            )}
          </div>
        </div>
      </div>

      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onSave={(id, updatedBlog) => {
            handleUpdate(id, updatedBlog);
            setEditingBlog(null);
          }}
          onCancel={() => setEditingBlog(null)}
        />
      )}

      {deletingBlog && (
        <DeleteConfirmationModal
          blog={deletingBlog}
          onDelete={(id) => {
            handleDelete(id);
            setDeletingBlog(null);
          }}
          onCancel={() => setDeletingBlog(null)}
        />
      )}

      <Link to="/addblog">
        <button className="fixed bottom-4 right-4 px-6 py-3 text-xl bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition">
          Upload Blog
        </button>
      </Link>
    </>
  );
};

export default Profile;
