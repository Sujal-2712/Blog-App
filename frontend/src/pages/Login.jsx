import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {Link} from 'react-router-dom';

const Login = () => {
    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    })

    const { isLogin, setIsLogin } = useContext(AppContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Authenticate();
    }

    const Authenticate = async () => {
        const url = 'http://localhost:3001/user/login';
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginState)
        }).then(response => response.json());


        console.log(result);

        if (!result.error) {
            setIsLogin(true);
            Cookies.set('jwt', result.token);
            toast.success('Successfully Login !!');
            navigate('/');
        }
        else {
            toast.error('Invalid Username or Password');
            document.getElementById('error-msg').innerText = "Invalid Username or Password";
            setLoginState(prevState => ({
                ...prevState,
                password: ''
            }));
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded shadow-md">
                <header className="text-3xl font-bold text-center mb-8">CODEHELP</header>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email ID</label>
                        <input onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            type="text"
                            placeholder="Enter your email"
                            name="email" required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            type="password"
                            placeholder="Enter your password"
                            name="password" required
                        />
                    </div>
                    <p id='error-msg' className='text-red-500 text-sm font-semibold text-center'></p>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="submit"
                    >
                        Sign In
                    </button>

                    <Link to='/signup'>
                    <button
                        className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="submit"
                    >
                        Create Account
                    </button></Link>

                </form>
            </div>
        </div>
    );
};

export default Login;
