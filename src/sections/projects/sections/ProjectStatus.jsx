const ProjectStatus = ({ data }) => {
  if (!data) return null;

  const { state, details, future } = data;

  return (
    <section className="project-section project-status mb-5">
      <h3 className="mb-3">Current Status</h3>

      {state && (
        <p>
          <strong>Status:</strong> {state}
        </p>
      )}

      {details && <p>{details}</p>}

      {Array.isArray(future) && future.length > 0 && (
        <>
          <h6 className="mt-4">Possible next steps</h6>
          <ul>
            {future.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ProjectStatus;
