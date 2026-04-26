    const ProjectTech = ({ data }) => {
  if (!data) return null;

  const { stack, architecture, integrations, notes } = data;

  return (
    <section className="project-section project-tech mb-5">
      <h3 className="mb-3">Technical Details</h3>

      {Array.isArray(stack) && stack.length > 0 && (
        <>
          <h6>Technology stack</h6>
          <ul>
            {stack.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {Array.isArray(architecture) && architecture.length > 0 && (
        <>
          <h6 className="mt-4">Architecture</h6>
          <ul>
            {architecture.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {Array.isArray(integrations) && integrations.length > 0 && (
        <>
          <h6 className="mt-4">Integrations</h6>
          <ul>
            {integrations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {notes && (
        <>
          <h6 className="mt-4">Notes</h6>
          <p className="text-muted">{notes}</p>
        </>
      )}
    </section>
  );
};

export default ProjectTech;
