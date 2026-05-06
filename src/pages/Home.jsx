import React, { useEffect, useState } from 'react';
import { courseService } from '../services/api';
import CourseCard from '../components/CourseCard';
import { Search } from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getAll()
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Elevate Your <span className="gradient-text">Skills</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Production-quality learning management system built for the next generation of creators and builders.
        </p>
        
        <div style={{ position: 'relative', maxWidth: '500px', margin: '2.5rem auto 0' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
          <input 
            type="text" 
            placeholder="Search for courses..." 
            style={{ paddingLeft: '3rem', height: '50px', fontSize: '1rem' }}
          />
        </div>
      </div>

      <div className="course-grid">
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length > 0 ? (
          courses.map(course => <CourseCard key={course.id} course={course} />)
        ) : (
          <p>No courses found. Create one from the instructor panel!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
