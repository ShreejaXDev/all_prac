import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home({ studentName, skillsArray, taskManagerComponent }) {
  return (
    <div className="page-container fade-in">
      <Header name={studentName} title="Student Portfolio & Practical Suite" />
      <About />
      <Skills skillList={skillsArray} />
      {taskManagerComponent}
    </div>
  );
}

export default Home;
