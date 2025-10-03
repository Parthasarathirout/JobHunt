import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { 
    MapPin, 
    Building2, 
    DollarSign, 
    Clock, 
    Search,
    Filter,
    X,
    ChevronDown,
    ChevronUp
} from 'lucide-react'

const filterData = {
    locations: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata", "Ahmedabad"],
    jobTypes: ["Full Time", "Part Time", "Internship", "Contract", "Remote"],
    experiences: ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
    salaryRanges: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"],
    companies: ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix", "Tesla", "Adobe"]
}

const FilterCard = () => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        location: '',
        jobType: '',
        experience: '',
        salary: '',
        company: ''
    });
    
    const [expandedSections, setExpandedSections] = useState({
        location: true,
        jobType: true,
        experience: false,
        salary: false,
        company: false
    });

    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const dispatch = useDispatch();
    const { allJobs } = useSelector(store => store.job);

    // Count active filters
    useEffect(() => {
        const count = Object.values(filters).filter(value => value !== '').length;
        setActiveFiltersCount(count);
    }, [filters]);

    // Apply filters
    useEffect(() => {
        let query = filters.searchTerm;
        
        // Build a more comprehensive search query
        const filterParts = [];
        if (filters.location) filterParts.push(filters.location);
        if (filters.jobType) filterParts.push(filters.jobType);
        if (filters.experience) filterParts.push(filters.experience);
        if (filters.salary) filterParts.push(filters.salary);
        if (filters.company) filterParts.push(filters.company);
        
        if (filterParts.length > 0) {
            query = filterParts.join(' ');
        }
        
        dispatch(setSearchedQuery(query));
    }, [filters, dispatch]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType] === value ? '' : value
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            searchTerm: '',
            location: '',
            jobType: '',
            experience: '',
            salary: '',
            company: ''
        });
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const renderFilterSection = (title, key, data, icon) => {
        const Icon = icon;
        const isExpanded = expandedSections[key];
        const activeFilter = filters[key];

        return (
            <div className='mb-6'>
                <button
                    onClick={() => toggleSection(key)}
                    className='flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                >
                    <div className='flex items-center gap-2'>
                        <Icon className='w-4 h-4 text-purple-600' />
                        <span className='font-semibold text-gray-800'>{title}</span>
                        {activeFilter && (
                            <Badge className='bg-purple-100 text-purple-700 text-xs'>1</Badge>
                        )}
                    </div>
                    {isExpanded ? (
                        <ChevronUp className='w-4 h-4 text-gray-500' />
                    ) : (
                        <ChevronDown className='w-4 h-4 text-gray-500' />
                    )}
                </button>
                
                {isExpanded && (
                    <div className='mt-2 space-y-2 pl-2'>
                        {data.map((item, index) => (
                            <label
                                key={index}
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-purple-50 ${
                                    activeFilter === item ? 'bg-purple-100 border border-purple-200' : ''
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={activeFilter === item}
                                    onChange={() => handleFilterChange(key, item)}
                                    className='w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
                                />
                                <span className={`text-sm ${activeFilter === item ? 'font-medium text-purple-700' : 'text-gray-700'}`}>
                                    {item}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className='bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 sticky top-6'>
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                    <Filter className='w-5 h-5 text-purple-600' />
                    <h2 className='text-xl font-bold text-gray-900'>Filter Jobs</h2>
                </div>
                {activeFiltersCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className='text-purple-600 hover:bg-purple-50'
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {/* Search Input */}
            <div className='mb-6'>
                <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <Input
                        type="text"
                        placeholder="Search jobs, skills, companies..."
                        value={filters.searchTerm}
                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                        className='pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200'
                    />
                </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
                <div className='mb-6'>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>Active Filters ({activeFiltersCount})</h3>
                    <div className='flex flex-wrap gap-2'>
                        {Object.entries(filters).map(([key, value]) => {
                            if (value && key !== 'searchTerm') {
                                return (
                                    <Badge
                                        key={key}
                                        className='bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer'
                                        onClick={() => handleFilterChange(key, '')}
                                    >
                                        {value}
                                        <X className='w-3 h-3 ml-1' />
                                    </Badge>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}

            {/* Filter Sections */}
            <div className='space-y-1'>
                {renderFilterSection('Location', 'location', filterData.locations, MapPin)}
                {renderFilterSection('Job Type', 'jobType', filterData.jobTypes, Clock)}
                {renderFilterSection('Experience', 'experience', filterData.experiences, Building2)}
                {renderFilterSection('Salary Range', 'salary', filterData.salaryRanges, DollarSign)}
                {renderFilterSection('Company', 'company', filterData.companies, Building2)}
            </div>

            {/* Results Count */}
            <div className='mt-6 pt-4 border-t border-gray-200'>
                <p className='text-sm text-gray-600 text-center'>
                    {allJobs?.length || 0} jobs available
                </p>
            </div>
        </div>
    )
}

export default FilterCard