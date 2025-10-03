import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Briefcase } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const isActiveLink = (path) => {
        return location.pathname === path ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600';
    };

    return (
        <nav className='bg-white/95 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50 shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-4'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-2'>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center'>
                        <Briefcase className='w-6 h-6 text-white' />
                    </div>
                    <h1 className='text-2xl font-bold gradient-text'>JobHunt</h1>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-8'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/dashboard" className={`transition-colors ${isActiveLink('/admin/dashboard')}`}>Dashboard</Link></li>
                                    <li><Link to="/admin/companies" className={`transition-colors ${isActiveLink('/admin/companies')}`}>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className={`transition-colors ${isActiveLink('/admin/jobs')}`}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/jobs" className={`transition-colors ${isActiveLink('/jobs')}`}>Jobs</Link></li>
                                    <li><Link to="/browse" className={`transition-colors ${isActiveLink('/browse')}`}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Auth Buttons / User Menu */}
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className="border-purple-200 hover:border-purple-400 hover:text-purple-600">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="cursor-pointer group">
                                        {user?.profile?.profilePhoto ? (
                                            <Avatar className="ring-2 ring-purple-200 hover:ring-purple-400 transition-all">
                                                <AvatarImage src={user.profile.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                        ) : (
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all">
                                                <User2 className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 card-gradient border-purple-200">
                                    <div className='p-2'>
                                        <div className='flex gap-3 items-center mb-4'>
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-lg'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio || 'Welcome back!'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Button variant="ghost" className='justify-start h-auto p-3' asChild>
                                                        <Link to="/profile" className='flex items-center gap-3'>
                                                            <User2 className='w-4 h-4' />
                                                            View Profile
                                                        </Link>
                                                    </Button>
                                                )
                                            }
                                            <Button 
                                                variant="ghost" 
                                                className='justify-start h-auto p-3 text-red-600 hover:text-red-700 hover:bg-red-50' 
                                                onClick={logoutHandler}
                                            >
                                                <LogOut className='w-4 h-4 mr-3' />
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className='lg:hidden p-2'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                </button>

            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='lg:hidden bg-white border-t border-purple-100 p-4'>
                    <ul className='flex flex-col gap-4 mb-4'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/dashboard" className={`block py-2 ${isActiveLink('/admin/dashboard')}`} onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                                    <li><Link to="/admin/companies" className={`block py-2 ${isActiveLink('/admin/companies')}`} onClick={() => setIsMenuOpen(false)}>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className={`block py-2 ${isActiveLink('/admin/jobs')}`} onClick={() => setIsMenuOpen(false)}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/jobs" className={`block py-2 ${isActiveLink('/jobs')}`} onClick={() => setIsMenuOpen(false)}>Jobs</Link></li>
                                    <li><Link to="/browse" className={`block py-2 ${isActiveLink('/browse')}`} onClick={() => setIsMenuOpen(false)}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    
                    {!user && (
                        <div className='flex flex-col gap-3'>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full">Login</Button>
                            </Link>
                            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar