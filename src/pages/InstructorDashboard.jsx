import React, { useState } from 'react';
import { courseService } from '../services/api';
import { PlusCircle, Video, FileText, Image as ImageIcon } from 'lucide-react';

const InstructorDashboard = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    thumbnail_url: '',
    instructor_id: 1 // Mocked for now
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await courseService.create(courseData);
      setMessage('Course created successfully!');
      setCourseData({ title: '', description: '', thumbnail_url: '', instructor_id: 1 });
    } catch (err) {
      setMessage('Error creating course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Instructor <span className="gradient-text">Portal</span></h1>
      
      <div className="glass-card" style={{ maxWidth: '800px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <PlusCircle className="text-primary" /> Create New Course
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Course Title</label>
            <input 
              required
              value={courseData.title}
              onChange={(e) => setCourseData({...courseData, title: e.target.value})}
              placeholder="e.g. Master React in 30 Days" 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description</label>
            <textarea 
              rows="4"
              value={courseData.description}
              onChange={(e) => setCourseData({...courseData, description: e.target.value})}
              placeholder="What will students learn?"
            ></textarea>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Thumbnail URL</label>
            <div style={{ position: 'relative' }}>
              <ImageIcon style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                value={courseData.thumbnail_url}
                onChange={(e) => setCourseData({...courseData, thumbnail_url: e.target.value})}
                placeholder="https://images.unsplash.com/..." 
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>
          
          {message && <p style={{ color: message.includes('Error') ? '#f87171' : 'var(--success)' }}>{message}</p>}
          
          <button disabled={loading} type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </form>
      </div>
      
      {/* List of lessons management would go here in a full app */}
      <div className="glass-card" style={{ maxWidth: '800px', marginTop: '2rem', borderColor: 'rgba(255,255,255,0.05)' }}>
        <h3 style={{ color: 'var(--text-muted)' }}>Add Lessons to Existing Courses</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Select a course to start adding video content and quizzes.</p>
      </div>
    </div>
  );
};

export default InstructorDashboard;
