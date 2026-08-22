import React from 'react';

function About() {
  return (
    <section className="about-component glass-card" id="about-section">
      <h2>📌 About Me</h2>
      <p className="about-text">
        Welcome to my student portfolio! I am a 5th Semester Information Technology student at CHARUSAT (FTE).
        This web application is built as part of the <strong>Advanced Web Development Frameworks (ITUE301)</strong> course.
        It demonstrates component-based architecture, client-side routing, RESTful API consumption, Express backend CRUD logic,
        Mongoose schema validation, and JWT authentication middleware.
      </p>
    </section>
  );
}

export default About;
