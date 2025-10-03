import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Briefcase, MapPin, DollarSign } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='p-6 rounded-xl shadow-lg card-gradient border-2 cursor-pointer hover-lift group'
        >
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl'>
                        {job?.company?.name?.charAt(0)}
                    </div>
                    <div>
                        <h1 className='font-bold text-lg group-hover:text-purple-600 transition-colors'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500 flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            {job?.location || 'India'}
                        </p>
                    </div>
                </div>
            </div>
            <div className='mb-4'>
                <h1 className='font-bold text-xl my-2 text-gray-800'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'bg-blue-100 text-blue-700 font-semibold border-0'}>
                    <Briefcase className='w-3 h-3 mr-1' />
                    {job?.position} Positions
                </Badge>
                <Badge className={'bg-orange-100 text-orange-700 font-semibold border-0'}>
                    {job?.jobType}
                </Badge>
                <Badge className={'bg-green-100 text-green-700 font-semibold border-0'}>
                    ₹{job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards