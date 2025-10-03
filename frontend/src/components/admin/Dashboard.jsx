import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Building2, Briefcase, Users, TrendingUp, Plus, Eye } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const Dashboard = () => {
  const { user } = useSelector(store => store.auth)
  const { companies } = useSelector(store => store.company)
  const { allAdminJobs } = useSelector(store => store.job)
  const navigate = useNavigate()

  // Fetch data
  useGetAllCompanies()
  useGetAllAdminJobs()

  useEffect(() => {
    if (!user || user.role !== 'recruiter') {
      navigate('/')
    }
  }, [user, navigate])

  // Calculate statistics
  const totalCompanies = companies?.length || 0
  const totalJobs = allAdminJobs?.length || 0
  const totalApplications = allAdminJobs?.reduce((acc, job) => acc + (job.applications?.length || 0), 0) || 0

  const quickActions = [
    {
      title: 'Post New Job',
      description: 'Create a new job posting',
      icon: Plus,
      action: () => navigate('/admin/jobs/create'),
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Manage Companies',
      description: 'View and edit your companies',
      icon: Building2,
      action: () => navigate('/admin/companies'),
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'View All Jobs',
      description: 'Manage your job postings',
      icon: Eye,
      action: () => navigate('/admin/jobs'),
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Add Company',
      description: 'Register a new company',
      icon: Building2,
      action: () => navigate('/admin/companies/create'),
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const stats = [
    {
      title: 'Total Companies',
      value: totalCompanies.toString(),
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Active Jobs',
      value: totalJobs.toString(),
      icon: Briefcase,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Total Applications',
      value: totalApplications.toString(),
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Success Rate',
      value: totalJobs > 0 ? `${Math.round((totalApplications / totalJobs) * 10)}%` : '0%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
      <Navbar />
      <div className='max-w-7xl mx-auto py-8 px-4'>
        {/* Welcome Section */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold gradient-text mb-2'>
            Welcome back, {user?.fullname}!
          </h1>
          <p className='text-gray-600 text-lg'>
            Manage your recruitment activities from your dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className='bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100 hover-lift'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600 mb-1'>{stat.title}</p>
                    <p className='text-3xl font-bold text-gray-900'>{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Quick Actions</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <div
                  key={index}
                  onClick={action.action}
                  className='bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100 hover-lift cursor-pointer group'
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='font-semibold text-gray-900 mb-2'>{action.title}</h3>
                  <p className='text-sm text-gray-600'>{action.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className='bg-white rounded-xl shadow-lg border-2 border-purple-100 p-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Recent Jobs</h2>
          {allAdminJobs && allAdminJobs.length > 0 ? (
            <div className='space-y-4'>
              {allAdminJobs.slice(0, 5).map((job, index) => (
                <div key={index} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold'>
                      {job.company?.name?.charAt(0) || 'J'}
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>{job.title}</h3>
                      <p className='text-sm text-gray-600'>{job.company?.name} • {job.location}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-medium text-gray-900'>{job.applications?.length || 0} Applications</p>
                    <p className='text-xs text-gray-500'>₹{job.salary} LPA</p>
                  </div>
                </div>
              ))}
              <Button 
                onClick={() => navigate('/admin/jobs')}
                variant="outline"
                className="w-full mt-4"
              >
                View All Jobs
              </Button>
            </div>
          ) : (
            <div className='text-center py-12'>
              <Briefcase className='w-16 h-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>No Jobs Posted Yet</h3>
              <p className='text-gray-600 mb-6'>Start by creating your first company or job posting</p>
              <Button 
                onClick={() => navigate('/admin/companies/create')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard