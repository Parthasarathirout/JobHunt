import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto py-8 px-4'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Building2 className='w-8 h-8 text-purple-600' />
                        <h1 className='text-3xl font-bold gradient-text'>Company Management</h1>
                    </div>
                    <p className='text-gray-600'>Manage your companies and track their performance</p>
                </div>

                {/* Actions Bar */}
                <div className='bg-white rounded-xl shadow-lg border-2 border-purple-100 p-6 mb-6'>
                    <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
                        <div className='relative flex-1 max-w-md'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                            <Input
                                className="pl-10 h-12 border-purple-200 focus:border-purple-400"
                                placeholder="Search companies by name..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 px-6"
                        >
                            <Plus className='w-4 h-4 mr-2' />
                            Add New Company
                        </Button>
                    </div>
                </div>

                {/* Companies Table */}
                <div className='bg-white rounded-xl shadow-lg border-2 border-purple-100 overflow-hidden'>
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    )
}

export default Companies