const ProjectProblem = ({ data }) => {
  if (!data) return null;

  const { statement, painPoints, constraints } = data;

  return (
    <section className="project-section project-problem mb-5">
      <h3 className="mb-3">Problem</h3>

      {statement && <p>{statement}</p>}

      {Array.isArray(painPoints) && painPoints.length > 0 && (
        <>
          <h6 className="mt-4">Key pain points</h6>
          <ul>
            {painPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </>
      )}

      {Array.isArray(constraints) && constraints.length > 0 && (
        <>
          <h6 className="mt-4">Constraints</h6>
          <ul>
            {constraints.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ProjectProblem;
