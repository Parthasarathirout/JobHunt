import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-8'>
                <div className='w-full max-w-lg'>
                    <form onSubmit={submitHandler} className='card-gradient border-2 border-purple-200 rounded-2xl p-8 shadow-2xl'>
                        <div className='text-center mb-8'>
                            <h1 className='text-3xl font-bold gradient-text mb-2'>Join JobHunt</h1>
                            <p className='text-gray-600'>Create your account to get started</p>
                        </div>
                        
                        <div className='space-y-6'>
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className='mt-1 h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400'
                                />
                            </div>
                            
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="your.email@example.com"
                                    className='mt-1 h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400'
                                />
                            </div>
                            
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
                                    className='mt-1 h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400'
                                />
                            </div>
                            
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Create a strong password"
                                    className='mt-1 h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400'
                                />
                            </div>
                            
                            <div>
                                <Label className='text-sm font-semibold text-gray-700 block mb-3'>I am a</Label>
                                <RadioGroup className="flex gap-6 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4"
                                        />
                                        <Label className="text-sm font-medium text-gray-700">Job Seeker</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4"
                                        />
                                        <Label className="text-sm font-medium text-gray-700">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Profile Picture (Optional)</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="mt-1 h-12 border-purple-200 focus:border-purple-400 cursor-pointer"
                                />
                            </div>
                        </div>
                        
                        {loading ? (
                            <Button className="w-full mt-8 h-12 bg-gradient-to-r from-purple-600 to-blue-600" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Creating Account...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full mt-8 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold">
                                Create Account
                            </Button>
                        )}
                        
                        <p className='text-center text-sm text-gray-600 mt-6'>
                            Already have an account?{' '}
                            <Link to="/login" className='text-purple-600 hover:text-purple-800 font-semibold'>
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup