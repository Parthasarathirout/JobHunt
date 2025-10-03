import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Calendar, Building2, CheckCircle } from 'lucide-react';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        if (!user) {
            toast.error('Please login to apply for jobs');
            navigate('/login');
            return;
        }
        
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 py-8'>
                {/* Back Button */}
                <Button 
                    variant="ghost" 
                    className="mb-6 hover:bg-purple-100"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className='w-4 h-4 mr-2' />
                    Back to Jobs
                </Button>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Main Content */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-8 mb-6'>
                            {/* Job Header */}
                            <div className='flex items-start justify-between mb-6'>
                                <div className='flex items-start gap-4'>
                                    <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl'>
                                        {singleJob?.company?.name?.charAt(0) || 'J'}
                                    </div>
                                    <div>
                                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>{singleJob?.title}</h1>
                                        <div className='flex items-center gap-2 text-gray-600 mb-4'>
                                            <Building2 className='w-4 h-4' />
                                            <span className='font-medium'>{singleJob?.company?.name}</span>
                                            <span>•</span>
                                            <MapPin className='w-4 h-4' />
                                            <span>{singleJob?.location}</span>
                                        </div>
                                        <div className='flex flex-wrap gap-2'>
                                            <Badge className='bg-blue-100 text-blue-700 font-semibold border-0'>
                                                <Users className='w-3 h-3 mr-1' />
                                                {singleJob?.position} Positions
                                            </Badge>
                                            <Badge className='bg-orange-100 text-orange-700 font-semibold border-0'>
                                                <Clock className='w-3 h-3 mr-1' />
                                                {singleJob?.jobType}
                                            </Badge>
                                            <Badge className='bg-green-100 text-green-700 font-semibold border-0'>
                                                ₹{singleJob?.salary} LPA
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className='mb-8'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-4'>About This Role</h2>
                                <p className='text-gray-700 leading-relaxed text-lg'>{singleJob?.description}</p>
                            </div>

                            {/* Requirements */}
                            {singleJob?.requirements && singleJob.requirements.length > 0 && (
                                <div className='mb-8'>
                                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>Requirements</h2>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                                        {singleJob.requirements.map((req, index) => (
                                            <div key={index} className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
                                                <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
                                                <span className='text-gray-700'>{req}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 sticky top-6'>
                            {/* Apply Button */}
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`w-full h-14 text-lg font-semibold mb-6 ${
                                    isApplied 
                                        ? 'bg-green-600 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                                }`}
                            >
                                {isApplied ? (
                                    <>
                                        <CheckCircle className='w-5 h-5 mr-2' />
                                        Already Applied
                                    </>
                                ) : (
                                    'Apply Now'
                                )}
                            </Button>

                            {/* Job Details */}
                            <div className='space-y-4'>
                                <h3 className='text-xl font-bold text-gray-900 mb-4'>Job Details</h3>
                                
                                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                    <DollarSign className='w-5 h-5 text-green-600' />
                                    <div>
                                        <p className='text-sm font-medium text-gray-600'>Salary</p>
                                        <p className='font-semibold text-gray-900'>₹{singleJob?.salary} LPA</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                    <Clock className='w-5 h-5 text-blue-600' />
                                    <div>
                                        <p className='text-sm font-medium text-gray-600'>Experience Required</p>
                                        <p className='font-semibold text-gray-900'>{singleJob?.experienceLevel} years</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                    <Users className='w-5 h-5 text-purple-600' />
                                    <div>
                                        <p className='text-sm font-medium text-gray-600'>Total Applicants</p>
                                        <p className='font-semibold text-gray-900'>{singleJob?.applications?.length || 0}</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                    <Calendar className='w-5 h-5 text-orange-600' />
                                    <div>
                                        <p className='text-sm font-medium text-gray-600'>Posted Date</p>
                                        <p className='font-semibold text-gray-900'>
                                            {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Company Info */}
                            {singleJob?.company && (
                                <div className='mt-6 pt-6 border-t border-gray-200'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-3'>About Company</h3>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold'>
                                            {singleJob.company.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className='font-semibold text-gray-900'>{singleJob.company.name}</h4>
                                            <p className='text-sm text-gray-600'>{singleJob.company.location}</p>
                                        </div>
                                    </div>
                                    {singleJob.company.description && (
                                        <p className='text-sm text-gray-600 leading-relaxed'>{singleJob.company.description}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription