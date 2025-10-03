import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, ArrowRight, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <section className='py-12 px-4 relative overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-blue-50/30'></div>
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
            
            <div className='max-w-7xl mx-auto relative z-10'>
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='text-center mb-12'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='flex items-center justify-center gap-3 mb-6'
                    >
                        <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg'>
                            <Sparkles className='w-6 h-6 text-white' />
                        </div>
                        <h2 className='text-4xl md:text-5xl font-bold'>
                            Latest & <span className='gradient-text'>Top Opportunities</span>
                        </h2>
                    </motion.div>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'
                    >
                        Discover the most recent job postings from industry-leading companies. 
                        Your perfect career opportunity awaits just one click away.
                    </motion.p>
                </motion.div>

                {/* Jobs Grid */}
                {allJobs.length > 0 ? (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'
                        >
                            {allJobs.slice(0, 6).map((job, index) => (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: 0.8 + index * 0.1,
                                        ease: "easeOut"
                                    }}
                                >
                                    <LatestJobCards job={job} />
                                </motion.div>
                            ))}
                        </motion.div>
                        
                        {/* View All Button */}
                        {allJobs.length > 6 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 1.4 }}
                                className='text-center'
                            >
                                <Link to="/browse">
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Button className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300'>
                                            View All {allJobs.length} Jobs
                                            <ArrowRight className='ml-2 w-5 h-5' />
                                        </Button>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='text-center py-16'
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center shadow-xl'
                        >
                            <Briefcase className='w-16 h-16 text-purple-500' />
                        </motion.div>
                        <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className='text-3xl font-bold text-gray-800 mb-4'
                        >
                            No Jobs Available Yet
                        </motion.h3>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className='text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed'
                        >
                            We're working hard to bring you the best opportunities from top companies. 
                            Check back soon or explore our job categories.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className='flex flex-col sm:flex-row gap-4 justify-center'
                        >
                            <Link to="/browse">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" className='border-purple-200 hover:border-purple-400 hover:bg-purple-50 px-6 py-3 transition-all duration-300'>
                                        <Search className='mr-2 w-4 h-4' />
                                        Browse All Categories
                                    </Button>
                                </motion.div>
                            </Link>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300'>
                                    Set Job Alert
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default LatestJobs