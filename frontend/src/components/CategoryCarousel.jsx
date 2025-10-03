import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code, Database, Palette, Laptop, Brain, Shield, Smartphone, Globe, Layers, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    { 
        name: "Frontend Developer", 
        shortName: "Frontend Developer",
        icon: Code, 
        color: "from-blue-500 to-purple-600", 
        bgColor: "from-blue-50 to-purple-50",
        skills: ["React", "Vue", "Angular"] 
    },
    { 
        name: "Backend Developer", 
        shortName: "Backend Developer",
        icon: Database, 
        color: "from-green-500 to-blue-500", 
        bgColor: "from-green-50 to-blue-50",
        skills: ["Node.js", "Python", "Java"] 
    },
    { 
        name: "Data Science", 
        shortName: "Data Science",
        icon: Brain, 
        color: "from-orange-500 to-red-500", 
        bgColor: "from-orange-50 to-red-50",
        skills: ["Python", "ML", "AI"] 
    },
    { 
        name: "UI/UX Designer", 
        shortName: "UI/UX Designer",
        icon: Palette, 
        color: "from-pink-500 to-purple-500", 
        bgColor: "from-pink-50 to-purple-50",
        skills: ["Figma", "Adobe", "Sketch"] 
    },
    { 
        name: "Full Stack Developer", 
        shortName: "Full Stack Developer",
        icon: Layers, 
        color: "from-indigo-500 to-purple-600", 
        bgColor: "from-indigo-50 to-purple-50",
        skills: ["MERN", "Django", "Rails"] 
    },
    { 
        name: "DevOps Engineer", 
        shortName: "DevOps Engineer",
        icon: Shield, 
        color: "from-gray-600 to-gray-800", 
        bgColor: "from-gray-50 to-slate-50",
        skills: ["AWS", "Docker", "K8s"] 
    }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className="py-12 px-4 relative overflow-hidden">
            {/* Modern Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white"></div>
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }}></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl border border-purple-200 mb-6"
                    >
                        <Layers className='w-6 h-6 text-purple-600' />
                        <span className="text-purple-700 font-semibold">Explore Categories</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Find Your <span className="gradient-text">Perfect Role</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto"
                    >
                        Explore top career paths with real job opportunities and growth potential
                    </motion.p>
                </motion.div>
                
                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: index * 0.15,
                                    ease: "easeOut"
                                }}
                                whileHover={{ 
                                    y: -12, 
                                    scale: 1.02,
                                    rotateY: 2,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                className="group cursor-pointer"
                                onClick={() => searchJobHandler(category.name)}
                            >
                                <div className="relative h-40 bg-white rounded-3xl border-2 border-gray-100 hover:border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    
                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                        <IconComponent className="w-16 h-16 text-gray-400" />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10 p-6 h-full flex flex-col">
                                        {/* Icon */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>
                                            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                        </div>
                                        
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 mb-2">
                                            {category.shortName}
                                        </h3>
                                        
                                        {/* Description */}
                                        <p className="text-gray-600 text-sm mb-6 group-hover:text-gray-700 transition-colors duration-300">
                                            Explore opportunities in {category.shortName.toLowerCase()} roles
                                        </p>
                                        
                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {category.skills.map((skill, skillIndex) => (
                                                <span 
                                                    key={skillIndex}
                                                    className="text-xs px-3 py-1.5 bg-gray-100 group-hover:bg-purple-100 text-gray-600 group-hover:text-purple-600 rounded-full font-medium transition-all duration-300"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-5 blur-xl`}></div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default CategoryCarousel