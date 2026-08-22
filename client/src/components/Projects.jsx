import React from 'react';

function Projects({ projectsList }) {
  const defaultProjects = [
    { title: "React Component Library", description: "Modular UI components built with React 18 & Vite.", tech: "React / Vite / CSS" },
    { title: "Task Manager Express API", description: "RESTful backend with CRUD routes & middleware pipeline.", tech: "Node.js / Express / REST" },
    { title: "MongoDB Atlas Portal", description: "Database schema validation & document persistence layer.", tech: "MongoDB / Mongoose / JWT" }
  ];

  const projectsToRender = projectsList || defaultProjects;

  return (
    <section className="projects-component glass-card" id="projects-section">
      <h2 style={{ fontSize: '1.8rem', color: '#6366f1', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        📂 Featured Projects
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {projectsToRender.map((proj, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '1.2rem' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>{proj.title || proj.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.8rem' }}>{proj.description || proj.html_url || "Full-stack module project."}</p>
            <span style={{ fontSize: '0.8rem', background: 'var(--accent-glow)', color: 'var(--accent-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '600' }}>
              {proj.tech || "React & Node"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
