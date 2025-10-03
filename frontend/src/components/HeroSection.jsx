import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search, TrendingUp, Users, Building2, Star } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    // Rotating words animation
    const rotatingWords = ["Dream Job", "Career Growth", "Success Story", "Future"];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { icon: Building2, label: "Companies", value: "500+" },
        { icon: Users, label: "Job Seekers", value: "50K+" },
        { icon: TrendingUp, label: "Success Rate", value: "95%" },
        { icon: Star, label: "User Rating", value: "4.9" }
    ];

    return (
        <div className='relative text-center py-16 px-4 overflow-hidden'>
            {/* Hero Content */}
            <div className='flex flex-col gap-6 my-8 max-w-5xl mx-auto relative z-10'>
                {/* Badge */}
                <motion.span 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='mx-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-semibold border border-purple-200 shadow-lg backdrop-blur-sm'
                >
                    🚀 India's #1 Job Search Platform
                </motion.span>

                {/* Main Heading with Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='relative'
                >
                    <h1 className='text-5xl md:text-7xl font-bold leading-tight mb-6'>
                        Find Your{' '}
                        <span className='relative inline-block pb-3'>
                            <span className='gradient-text'>
                                {rotatingWords[currentWordIndex]}
                            </span>
                            <motion.div
                                key={currentWordIndex}
                                initial={{ width: 0 }}
                                animate={{ width: "90%" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full'
                            />
                        </span>
                    </h1>
                    <h2 className='text-4xl md:text-6xl font-bold gradient-text'>
                        with JobHunt
                    </h2>
                </motion.div>

                {/* Description */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'
                >
                    Connect with top companies, explore thousands of opportunities, and accelerate your career growth. 
                    Join millions of professionals who found their perfect job with us.
                </motion.p>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className='relative flex w-full max-w-3xl shadow-2xl border-2 border-purple-200 rounded-2xl mx-auto bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 group'
                >
                    <div className='flex-1 flex items-center gap-4 pl-6'>
                        <Search className='h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors' />
                        <input
                            type="text"
                            placeholder='Search by job title, company, location, or keywords...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-5 text-lg bg-transparent placeholder:text-gray-400'
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        />
                    </div>
                    <button 
                        onClick={searchJobHandler} 
                        className="p-5 mr-2 my-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    >
                        <Search className='h-5 w-5 text-white group-hover/btn:scale-110 transition-transform' />
                    </button>
                </motion.div>
                {/* Popular Searches */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className='flex gap-4 justify-center items-center flex-wrap mt-6'
                >
                    <span className='text-gray-600 font-medium'>Popular Searches:</span>
                    {['Frontend Developer', 'Data Scientist', 'Product Manager', 'UI/UX Designer', 'DevOps Engineer'].map((term, index) => (
                        <motion.button
                            key={term}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setQuery(term);
                                dispatch(setSearchedQuery(term));
                                navigate("/browse");
                            }}
                            className='px-6 py-3 bg-white/80 border border-gray-200 rounded-full text-sm font-medium hover:border-purple-400 hover:text-purple-600 hover:bg-white hover:shadow-md transition-all duration-300 backdrop-blur-sm'
                        >
                            {term}
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className='mt-16 max-w-6xl mx-auto'
            >
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className='text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300'
                            >
                                <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg'>
                                    <Icon className='w-8 h-8 text-white' />
                                </div>
                                <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-1'>{stat.value}</h3>
                                <p className='text-gray-600 font-medium'>{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className='absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute bottom-20 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-bounce'></div>
            <div className='absolute top-1/2 left-0 w-16 h-16 bg-pink-300/20 rounded-full blur-xl animate-ping'></div>
        </div>
    )
}

export default HeroSection