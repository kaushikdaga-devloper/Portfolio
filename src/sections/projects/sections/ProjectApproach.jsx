const ProjectApproach = ({ data }) => {
  if (!data) return null;

  const { summary, steps, tradeoffs } = data;

  return (
    <section className="project-section project-approach mb-5">
      <h3 className="mb-3">Approach</h3>

      {summary && <p>{summary}</p>}

      {Array.isArray(steps) && steps.length > 0 && (
        <>
          <h6 className="mt-4">Key steps</h6>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </>
      )}

      {Array.isArray(tradeoffs) && tradeoffs.length > 0 && (
        <>
          <h6 className="mt-4">Trade-offs considered</h6>
          <ul>
            {tradeoffs.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ProjectApproach;
