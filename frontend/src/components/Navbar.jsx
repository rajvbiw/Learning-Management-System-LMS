import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{ background: 'var(--glass)', borderBottom: '1px solid var(--glass-border)', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen className="text-primary" />
          <span>Lumina<span className="gradient-text">LMS</span></span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Courses</Link>
          <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <div style={{ background: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={16} /> Student
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
