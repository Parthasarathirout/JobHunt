import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                const query = searchedQuery.toLowerCase();
                
                // Enhanced filtering logic
                const matchesTitle = job.title?.toLowerCase().includes(query);
                const matchesDescription = job.description?.toLowerCase().includes(query);
                const matchesLocation = job.location?.toLowerCase().includes(query);
                const matchesCompany = job.company?.name?.toLowerCase().includes(query);
                const matchesJobType = job.jobType?.toLowerCase().includes(query);
                const matchesExperience = job.experienceLevel?.toString().includes(query) || 
                                        query.includes(job.experienceLevel?.toString());
                const matchesSalary = job.salary?.toString().includes(query.replace(/[^\d]/g, '')) ||
                                    query.includes(job.salary?.toString());
                
                // Check for specific filter terms
                const matchesFilterTerms = 
                    query.includes('full time') && job.jobType?.toLowerCase() === 'full time' ||
                    query.includes('part time') && job.jobType?.toLowerCase() === 'part time' ||
                    query.includes('internship') && job.jobType?.toLowerCase() === 'internship' ||
                    query.includes('remote') && job.jobType?.toLowerCase() === 'remote' ||
                    query.includes('contract') && job.jobType?.toLowerCase() === 'contract';

                return matchesTitle || matchesDescription || matchesLocation || 
                       matchesCompany || matchesJobType || matchesExperience || 
                       matchesSalary || matchesFilterTerms;
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold gradient-text mb-2'>Find Your Dream Job</h1>
                    <p className='text-gray-600 text-lg'>Discover thousands of opportunities from top companies</p>
                </div>
                
                <div className='flex gap-8'>
                    <div className='w-80 flex-shrink-0'>
                        <FilterCard />
                    </div>
                    
                    <div className='flex-1 min-w-0'>
                        {filterJobs.length <= 0 ? (
                            <div className='text-center py-20'>
                                <div className='w-64 h-64 mx-auto mb-8 opacity-50'>
                                    <svg viewBox="0 0 400 300" className='w-full h-full'>
                                        <circle cx="200" cy="150" r="80" fill="#E5E7EB" />
                                        <rect x="160" y="120" width="80" height="60" rx="4" fill="#F3F4F6" />
                                        <circle cx="180" cy="140" r="8" fill="#D1D5DB" />
                                        <circle cx="220" cy="140" r="8" fill="#D1D5DB" />
                                        <rect x="170" y="155" width="60" height="4" rx="2" fill="#D1D5DB" />
                                    </svg>
                                </div>
                                <h3 className='text-2xl font-bold text-gray-600 mb-4'>No Jobs Found</h3>
                                <p className='text-gray-500 mb-8 max-w-md mx-auto'>
                                    We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                                </p>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className='px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all'
                                >
                                    Refresh Jobs
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className='mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-purple-100'>
                                    <div>
                                        <p className='text-gray-800 font-medium'>
                                            Showing <span className='font-bold text-purple-600'>{filterJobs.length}</span> of <span className='font-semibold'>{allJobs?.length || 0}</span> job{filterJobs.length !== 1 ? 's' : ''}
                                        </p>
                                        {searchedQuery && (
                                            <p className='text-sm text-gray-600 mt-1'>
                                                Filtered results for: <span className='font-medium text-purple-600'>"{searchedQuery}"</span>
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className='flex gap-2'>
                                        <select className='px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-300'>
                                            <option>Sort by: Newest</option>
                                            <option>Sort by: Salary High to Low</option>
                                            <option>Sort by: Salary Low to High</option>
                                            <option>Sort by: Company A-Z</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs