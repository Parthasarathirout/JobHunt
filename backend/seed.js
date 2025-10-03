import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

// Load environment variables
dotenv.config();

// Check if required environment variables exist
if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI environment variable is not set');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected successfully');
        return true;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        return false;
    }
};

const clearDatabase = async () => {
    try {
        console.log('🗑️  Clearing existing data...');
        await Promise.all([
            User.deleteMany({}),
            Company.deleteMany({}),
            Job.deleteMany({})
        ]);
        console.log('✅ Existing data cleared');
    } catch (error) {
        console.error('❌ Error clearing database:', error.message);
        throw error;
    }
};

const createUsers = async () => {
    console.log('👥 Creating users...');
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const recruiters = await User.create([
        {
            fullname: "Rajesh Kumar",
            email: "rajesh@google.com",
            phoneNumber: 9876543210,
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "Senior HR Manager at Google India with 8+ years experience",
                skills: ["Recruitment", "HR Management", "Talent Acquisition", "Team Building"]
            }
        },
        {
            fullname: "Priya Sharma", 
            email: "priya@microsoft.com",
            phoneNumber: 9876543211,
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "Lead Technical Recruiter at Microsoft",
                skills: ["Technical Recruiting", "Engineering Hiring", "Interview Process"]
            }
        },
        {
            fullname: "Amit Patel",
            email: "amit@amazon.com",
            phoneNumber: 9876543212,
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "Senior Hiring Manager at Amazon India",
                skills: ["Campus Hiring", "Leadership Hiring", "Diversity & Inclusion"]
            }
        }
    ]);

    const students = await User.create([
        {
            fullname: "Swayam Agrawal",
            email: "swayam@student.com",
            phoneNumber: 9876543220,
            password: hashedPassword,
            role: "student",
            profile: {
                bio: "Passionate Full Stack Developer with expertise in MERN stack",
                skills: ["React", "Node.js", "MongoDB", "JavaScript", "TypeScript", "Express", "Tailwind CSS"]
            }
        },
        {
            fullname: "Neha Singh",
            email: "neha@student.com", 
            phoneNumber: 9876543221,
            password: hashedPassword,
            role: "student",
            profile: {
                bio: "Data Science enthusiast with strong analytical skills",
                skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL", "Pandas"]
            }
        },
        {
            fullname: "Rahul Verma",
            email: "rahul@student.com",
            phoneNumber: 9876543222,
            password: hashedPassword,
            role: "student",
            profile: {
                bio: "Creative UI/UX Designer focused on user-centered design",
                skills: ["Figma", "Adobe XD", "UI Design", "Prototyping", "User Research", "Wireframing"]
            }
        },
        {
            fullname: "Ananya Das",
            email: "ananya@student.com",
            phoneNumber: 9876543223,
            password: hashedPassword,
            role: "student", 
            profile: {
                bio: "Frontend Developer specializing in React and modern web technologies",
                skills: ["React", "JavaScript", "HTML5", "CSS3", "Redux", "Next.js"]
            }
        },
        {
            fullname: "Karthik Reddy",
            email: "karthik@student.com",
            phoneNumber: 9876543224,
            password: hashedPassword,
            role: "student",
            profile: {
                bio: "Backend Engineer with expertise in scalable system design",
                skills: ["Java", "Spring Boot", "Microservices", "AWS", "Docker", "Kubernetes"]
            }
        }
    ]);

    console.log(`✅ Created ${recruiters.length} recruiters and ${students.length} students`);
    return { recruiters, students };
};

const createCompanies = async (recruiters) => {
    console.log('🏢 Creating companies...');
    
    const companies = await Company.create([
        {
            name: "Google India",
            description: "Google's mission is to organize the world's information and make it universally accessible and useful. We're looking for talented engineers to join our innovative teams.",
            website: "https://www.google.com",
            location: "Bangalore, Karnataka", 
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            userId: recruiters[0]._id
        },
        {
            name: "Microsoft India",
            description: "Empowering every person and organization on the planet to achieve more. Join us to build the technology that shapes the future.",
            website: "https://www.microsoft.com",
            location: "Hyderabad, Telangana",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            userId: recruiters[1]._id
        },
        {
            name: "Amazon India",
            description: "We're guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.",
            website: "https://www.amazon.in",
            location: "Bangalore, Karnataka",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            userId: recruiters[2]._id
        },
        {
            name: "Flipkart",
            description: "India's leading e-commerce marketplace offering technology solutions that connect millions of sellers and customers.",
            website: "https://www.flipkart.com",
            location: "Bangalore, Karnataka",
            logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
            userId: recruiters[0]._id
        },
        {
            name: "Infosys",
            description: "A global leader in next-generation digital services and consulting, helping clients navigate their digital transformation.",
            website: "https://www.infosys.com", 
            location: "Pune, Maharashtra",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
            userId: recruiters[1]._id
        },
        {
            name: "Tata Consultancy Services",
            description: "TCS is an IT services, consulting and business solutions organization that has been partnering with many of the world's largest businesses.",
            website: "https://www.tcs.com",
            location: "Mumbai, Maharashtra",
            logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
            userId: recruiters[2]._id
        },
        {
            name: "Zomato",
            description: "Better food for more people. We're a food delivery platform connecting millions of customers with restaurants across India.",
            website: "https://www.zomato.com",
            location: "Gurugram, Haryana",
            logo: "https://logos-world.net/wp-content/uploads/2020/11/Zomato-Logo.png", 
            userId: recruiters[0]._id
        },
        {
            name: "Paytm",
            description: "India's leading digital payments and financial services company, pioneering the digital economy revolution.",
            website: "https://www.paytm.com",
            location: "Noida, Uttar Pradesh",
            logo: "https://logos-world.net/wp-content/uploads/2020/11/Paytm-Logo.png",
            userId: recruiters[1]._id
        }
    ]);

    console.log(`✅ Created ${companies.length} companies`);
    return companies;
};

const createJobs = async (companies, recruiters) => {
    console.log('💼 Creating job listings...');
    
    const jobs = await Job.create([
        // Google Jobs
        {
            title: "Senior Frontend Developer",
            description: "Join our Chrome team to build the next generation of web experiences. You'll work on performance optimization, new web APIs, and creating delightful user interfaces that serve billions of users worldwide.",
            requirements: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Performance Optimization", "Web APIs"],
            salary: 28,
            experienceLevel: 4,
            location: "Bangalore, Karnataka",
            jobType: "Full-Time",
            position: 2,
            company: companies[0]._id,
            created_by: recruiters[0]._id
        },
        {
            title: "Machine Learning Engineer",
            description: "Work on cutting-edge AI research and implement ML solutions at Google scale. You'll be part of teams building products like Search, Assistant, and Cloud AI.",
            requirements: ["Python", "TensorFlow", "Machine Learning", "Deep Learning", "Statistics", "Data Structures"],
            salary: 35,
            experienceLevel: 5,
            location: "Bangalore, Karnataka", 
            jobType: "Full-Time",
            position: 1,
            company: companies[0]._id,
            created_by: recruiters[0]._id
        },
        
        // Microsoft Jobs
        {
            title: "Backend Developer (.NET)",
            description: "Build scalable backend services for Microsoft 365 and Azure. Work with microservices architecture and cloud-native technologies.",
            requirements: ["C#", ".NET Core", "Azure", "Microservices", "SQL Server", "REST APIs"],
            salary: 25,
            experienceLevel: 3,
            location: "Hyderabad, Telangana",
            jobType: "Full-Time", 
            position: 3,
            company: companies[1]._id,
            created_by: recruiters[1]._id
        },
        {
            title: "Product Manager - AI/ML",
            description: "Lead product strategy for AI-powered features in Microsoft products. Work closely with engineering teams to deliver innovative AI solutions.",
            requirements: ["Product Management", "AI/ML Knowledge", "Data Analysis", "Strategy", "Leadership"],
            salary: 40,
            experienceLevel: 6,
            location: "Hyderabad, Telangana",
            jobType: "Full-Time",
            position: 1,
            company: companies[1]._id, 
            created_by: recruiters[1]._id
        },
        
        // Amazon Jobs
        {
            title: "Full Stack Developer",
            description: "Build customer-facing applications for Amazon's e-commerce platform. Work with React, Node.js, and AWS services to create scalable solutions.",
            requirements: ["React", "Node.js", "JavaScript", "AWS", "DynamoDB", "Lambda", "API Gateway"],
            salary: 22,
            experienceLevel: 2,
            location: "Bangalore, Karnataka",
            jobType: "Full-Time",
            position: 4,
            company: companies[2]._id,
            created_by: recruiters[2]._id
        },
        {
            title: "DevOps Engineer",
            description: "Manage and scale Amazon's infrastructure. Work with containerization, CI/CD pipelines, and monitoring systems.",
            requirements: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux", "Python"],
            salary: 30,
            experienceLevel: 4,
            location: "Bangalore, Karnataka",
            jobType: "Full-Time",
            position: 2,
            company: companies[2]._id,
            created_by: recruiters[2]._id
        },
        
        // Flipkart Jobs
        {
            title: "Mobile App Developer (Android)",
            description: "Develop and enhance Flipkart's Android application. Work on features that impact millions of users and improve shopping experience.",
            requirements: ["Kotlin", "Android SDK", "Java", "Material Design", "REST APIs", "Git"],
            salary: 20,
            experienceLevel: 2,
            location: "Bangalore, Karnataka",
            jobType: "Full-Time",
            position: 3,
            company: companies[3]._id,
            created_by: recruiters[0]._id
        },
        
        // Infosys Jobs  
        {
            title: "Software Engineer - Java",
            description: "Work on enterprise applications using Java and Spring framework. Collaborate with global teams on large-scale projects.",
            requirements: ["Java", "Spring Boot", "Hibernate", "SQL", "REST APIs", "Maven"],
            salary: 12,
            experienceLevel: 1,
            location: "Pune, Maharashtra",
            jobType: "Full-Time",
            position: 5,
            company: companies[4]._id,
            created_by: recruiters[1]._id
        },
        
        // TCS Jobs
        {
            title: "UI/UX Designer",
            description: "Create intuitive and engaging user experiences for enterprise applications. Work with design systems and conduct user research.",
            requirements: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems", "HTML/CSS"],
            salary: 15,
            experienceLevel: 2,
            location: "Mumbai, Maharashtra", 
            jobType: "Full-Time",
            position: 2,
            company: companies[5]._id,
            created_by: recruiters[2]._id
        },
        
        // Zomato Jobs
        {
            title: "Data Scientist",
            description: "Analyze food delivery patterns and optimize our recommendation systems. Work with large datasets to drive business decisions.",
            requirements: ["Python", "SQL", "Machine Learning", "Statistics", "Pandas", "Data Visualization"],
            salary: 18,
            experienceLevel: 2,
            location: "Gurugram, Haryana",
            jobType: "Full-Time",
            position: 2,
            company: companies[6]._id,
            created_by: recruiters[0]._id
        },
        
        // Paytm Jobs
        {
            title: "Backend Developer (Node.js)",
            description: "Build secure and scalable payment systems. Work on APIs that handle millions of transactions daily.",
            requirements: ["Node.js", "Express", "MongoDB", "Redis", "Microservices", "Security"],
            salary: 19,
            experienceLevel: 2,
            location: "Noida, Uttar Pradesh",
            jobType: "Full-Time",
            position: 3,
            company: companies[7]._id,
            created_by: recruiters[1]._id
        },
        
        // Additional Entry Level Jobs
        {
            title: "Junior Software Developer",
            description: "Perfect entry-level position for fresh graduates. Learn and grow with mentorship from senior developers in a collaborative environment.",
            requirements: ["Programming Fundamentals", "Git", "Problem Solving", "Communication", "Eagerness to Learn"],
            salary: 8,
            experienceLevel: 0,
            location: "Bangalore, Karnataka",
            jobType: "Full-Time",
            position: 6,
            company: companies[3]._id,
            created_by: recruiters[0]._id
        },
        
        {
            title: "Quality Assurance Engineer", 
            description: "Ensure product quality through comprehensive testing strategies. Work with automation tools and manual testing processes.",
            requirements: ["Testing Methodologies", "Selenium", "API Testing", "Bug Tracking", "Attention to Detail"],
            salary: 14,
            experienceLevel: 1,
            location: "Pune, Maharashtra",
            jobType: "Full-Time",
            position: 3,
            company: companies[4]._id,
            created_by: recruiters[1]._id
        },

        {
            title: "Content Writer - Tech",
            description: "Create engaging technical content for blogs, documentation, and marketing materials. Strong writing skills and tech knowledge required.",
            requirements: ["Technical Writing", "SEO", "Content Strategy", "Research Skills", "Communication"],
            salary: 10,
            experienceLevel: 1,
            location: "Remote",
            jobType: "Remote",
            position: 2,
            company: companies[6]._id,
            created_by: recruiters[0]._id
        }
    ]);

    console.log(`✅ Created ${jobs.length} job listings`);
    return jobs;
};

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seed process...\n');
        
        // Clear existing data
        await clearDatabase();
        
        // Create users
        const { recruiters, students } = await createUsers();
        
        // Create companies  
        const companies = await createCompanies(recruiters);
        
        // Create jobs
        const jobs = await createJobs(companies, recruiters);
        
        // Print summary
        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   👥 Users: ${recruiters.length + students.length} (${recruiters.length} recruiters, ${students.length} students)`);
        console.log(`   🏢 Companies: ${companies.length}`);
        console.log(`   💼 Jobs: ${jobs.length}`);
        
        console.log('\n🔐 Test Login Credentials:');
        console.log('   📧 Recruiter: rajesh@google.com');
        console.log('   🔑 Password: password123');
        console.log('   📧 Student: swayam@student.com'); 
        console.log('   🔑 Password: password123');
        
        console.log('\n✅ Your JobHunt platform is ready to use!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        console.error('Full error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
        process.exit(0);
    }
};

// Main execution
const main = async () => {
    console.log('🚀 JobHunt Database Seeder\n');
    
    const connected = await connectDB();
    if (!connected) {
        console.error('❌ Could not connect to database. Exiting...');
        process.exit(1);
    }
    
    await seedDatabase();
};

main().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
});