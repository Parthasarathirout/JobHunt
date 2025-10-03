import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold gradient-text mb-2'>Browse All Jobs</h1>
                    <p className='text-gray-600 text-lg'>Explore all available opportunities</p>
                </div>
                
                {allJobs.length === 0 ? (
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
                        <h3 className='text-2xl font-bold text-gray-600 mb-4'>No Jobs Available</h3>
                        <p className='text-gray-500 mb-8 max-w-md mx-auto'>
                            There are currently no job listings available. Please check back later or contact our support team.
                        </p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className='px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all'
                        >
                            Refresh Page
                        </button>
                    </div>
                ) : (
                    <>
                        <div className='mb-8 flex justify-between items-center'>
                            <p className='text-gray-600 text-lg'>
                                Found <span className='font-bold text-purple-600'>{allJobs.length}</span> job{allJobs.length !== 1 ? 's' : ''} available
                            </p>
                        </div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {allJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Browse