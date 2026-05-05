import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseService, studentService, aiService } from '../services/api';
import { PlayCircle, CheckCircle, MessageSquare, Send, BookOpen } from 'lucide-react';

const CourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isExplaining, setIsExplaining] = useState(false);

  useEffect(() => {
    courseService.getById(id).then(res => {
      setCourse(res.data);
      if (res.data.Lessons && res.data.Lessons.length > 0) {
        setSelectedLesson(res.data.Lessons[0]);
      }
    });
  }, [id]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const newMsg = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');
    setIsExplaining(true);

    try {
      const res = await aiService.explain(chatInput, selectedLesson?.title || course?.title);
      setChatMessages(prev => [...prev, { role: 'ai', content: res.data.message }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting to the brain right now." }]);
    } finally {
      setIsExplaining(false);
    }
  };

  if (!course) return <div className="container">Loading course details...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', height: 'calc(100vh - 100px)' }}>
      {/* Main Content: Video & Lessons */}
      <div style={{ overflowY: 'auto', paddingRight: '1rem' }}>
        <div className="glass-card" style={{ padding: 0, marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{ background: '#000', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {selectedLesson?.video_url ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={selectedLesson.video_url.replace('watch?v=', 'embed/')} 
                title={selectedLesson.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <p>Select a lesson to start learning</p>
            )}
          </div>
          <div style={{ padding: '1.5rem' }}>
            <h2>{selectedLesson?.title || 'Course Content'}</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{selectedLesson?.content || 'No content description for this lesson.'}</p>
          </div>
        </div>

        <h3>Lessons</h3>
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {course.Lessons?.map(lesson => (
            <div 
              key={lesson.id} 
              onClick={() => setSelectedLesson(lesson)}
              className="glass-card" 
              style={{ 
                padding: '1rem', 
                cursor: 'pointer', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderColor: selectedLesson?.id === lesson.id ? 'var(--primary)' : 'var(--glass-border)',
                background: selectedLesson?.id === lesson.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--glass)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <PlayCircle size={20} className={selectedLesson?.id === lesson.id ? 'text-primary' : ''} />
                <span>{lesson.title}</span>
              </div>
              <CheckCircle size={18} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar: AI Chatbot */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <MessageSquare className="text-primary" size={20} />
          <h4 style={{ margin: 0 }}>Course AI Tutor</h4>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1rem' }}>
          {chatMessages.length === 0 && (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
              Ask me anything about this course! "Explain the main concepts" or "Generate a quiz".
            </p>
          )}
          {chatMessages.map((msg, i) => (
            <div key={i} style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-card)',
              padding: '0.6rem 0.8rem',
              borderRadius: '0.8rem',
              maxWidth: '85%',
              fontSize: '0.9rem'
            }}>
              {msg.content}
            </div>
          ))}
          {isExplaining && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Thinking...</div>}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <input 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type message..." 
            style={{ padding: '0.5rem' }}
          />
          <button onClick={handleSendMessage} className="btn btn-primary" style={{ padding: '0.5rem' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
