import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Briefcase, Plus, Search } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
      <Navbar />
      <div className='max-w-7xl mx-auto py-8 px-4'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <Briefcase className='w-8 h-8 text-purple-600' />
            <h1 className='text-3xl font-bold gradient-text'>Job Management</h1>
          </div>
          <p className='text-gray-600'>Create and manage job postings, track applications</p>
        </div>

        {/* Actions Bar */}
        <div className='bg-white rounded-xl shadow-lg border-2 border-purple-100 p-6 mb-6'>
          <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                className="pl-10 h-12 border-purple-200 focus:border-purple-400"
                placeholder="Search jobs by title, role, or location..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 px-6"
            >
              <Plus className='w-4 h-4 mr-2' />
              Post New Job
            </Button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className='bg-white rounded-xl shadow-lg border-2 border-purple-100 overflow-hidden'>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs