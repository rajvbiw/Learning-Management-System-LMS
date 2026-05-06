import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card" 
      style={{ overflow: 'hidden', padding: 0 }}
    >
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img 
          src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80'} 
          alt={course.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.8rem' }}>
          <Clock size={14} style={{ marginRight: '4px' }} /> 12h 30m
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24' }}>
            <Star size={16} fill="#fbbf24" /> <span style={{ fontWeight: 'bold' }}>4.8</span>
          </div>
          <Link to={`/course/${course.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            View Course <PlayCircle size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
