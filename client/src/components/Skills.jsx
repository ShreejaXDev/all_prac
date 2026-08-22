import React from 'react';

function Skills({ skillList = [] }) {
  return (
    <section className="skills-component glass-card" id="skills-section">
      <h2>⚡ Technical Skills</h2>
      {skillList.length === 0 ? (
        <p className="about-text">No skills provided.</p>
      ) : (
        <ul className="skills-grid">
          {skillList.map((skill, index) => (
            <li key={index} className="skill-card">
              <span>🚀</span> {skill}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Skills;
