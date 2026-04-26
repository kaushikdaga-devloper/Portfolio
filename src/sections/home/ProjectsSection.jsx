const ProjectsSection = ({ data }) => {
  return (
    <section className="projects-section py-6" id="projects" data-reveal>
      <div className="container">
        <h2 className="section-title text-center mb-5">Selected Projects</h2>
        <div className="row g-4">
          {data.items.map((project, i) => (
            <div className="col-md-6 col-xl-4" key={i}>
              <div className="project-card">
                <div className="project-img-wrapper">
                  <img src={project.image} alt={project.title} className="project-img" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.live} className="btn btn-sm btn-light rounded-pill" target="_blank" rel="noreferrer">Live</a>
                      <a href={project.github} className="btn btn-sm btn-outline-light rounded-pill ms-2" target="_blank" rel="noreferrer">Code</a>
                    </div>
                  </div>
                </div>
                <div className="project-body">
                  <h5 className="project-title">{project.title}</h5>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="badge bg-primary bg-opacity-10 text-primary me-1 mb-1">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;