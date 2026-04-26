const ProjectLearnings = ({ data }) => {
  if (!data) return null;

  const { insights, challenges, improvements } = data;

  return (
    <section className="project-section project-learnings mb-5">
      <h3 className="mb-3">What I Learned</h3>

      {Array.isArray(insights) && insights.length > 0 && (
        <>
          <h6>Key insights</h6>
          <ul>
            {insights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {Array.isArray(challenges) && challenges.length > 0 && (
        <>
          <h6 className="mt-4">Challenges faced</h6>
          <ul>
            {challenges.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {Array.isArray(improvements) && improvements.length > 0 && (
        <>
          <h6 className="mt-4">Future improvements</h6>
          <ul>
            {improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ProjectLearnings;
