import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Enhanced Animated Grid Background Component
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Tightly Spaced Grid Pattern */}
      <div className="absolute inset-0">
        {/* Dense Vertical Lines */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-purple-200/25 via-blue-200/15 to-transparent"
            style={{
              left: `${i * 2.5}%`,
              height: '100%',
              animation: `gridPulse ${2.5 + i * 0.05}s ease-in-out infinite`,
              animationDelay: `${i * 0.02}s`,
              opacity: i % 4 === 0 ? 0.8 : 0.4
            }}
          />
        ))}
        
        {/* Dense Horizontal Lines */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-gradient-to-r from-purple-200/25 via-blue-200/15 to-transparent"
            style={{
              top: `${i * 3.33}%`,
              width: '100%',
              animation: `gridFloat ${3 + i * 0.05}s ease-in-out infinite`,
              animationDelay: `${i * 0.03}s`,
              opacity: i % 4 === 0 ? 0.8 : 0.4
            }}
          />
        ))}
        
        {/* Accent Lines - Major Grid */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`accent-v-${i}`}
            className="absolute w-0.5 bg-gradient-to-b from-purple-300/40 via-blue-300/25 to-transparent"
            style={{
              left: `${i * 12.5}%`,
              height: '100%',
              animation: `gridPulse ${4 + i * 0.1}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
        
        {[...Array(6)].map((_, i) => (
          <div
            key={`accent-h-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-purple-300/40 via-blue-300/25 to-transparent"
            style={{
              top: `${i * 16.67}%`,
              width: '100%',
              animation: `gridFloat ${4.5 + i * 0.1}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`
            }}
          />
        ))}
      </div>
      
      {/* Intersection Points */}
      <div className="absolute inset-0">
        {[...Array(32)].map((_, i) => (
          <div
            key={`intersection-${i}`}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 95}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-300/10 to-blue-400/10 blur-xl animate-bounce"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <div className='min-h-screen relative'>
      {/* Animated Background */}
      <AnimatedGrid />
      
      {/* Main Gradient Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
      
      {/* Content */}
      <Navbar />
      <div className='space-y-8'>
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
      </div>
      <Footer />
    </div>
  )
}

export default Home