const ProjectNotes = ({ data }) => {
  if (!data) return null;

  const { limitations, ethicalConsiderations, futureIdeas } = data;

  return (
    <section className="project-section project-notes mb-5">
      <h3 className="mb-3">Notes</h3>

      {Array.isArray(limitations) && limitations.length > 0 && (
        <>
          <h6>Limitations</h6>
          <ul>
            {limitations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {Array.isArray(ethicalConsiderations) &&
        ethicalConsiderations.length > 0 && (
          <>
            <h6 className="mt-4">Ethical considerations</h6>
            <ul>
              {ethicalConsiderations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

      {Array.isArray(futureIdeas) && futureIdeas.length > 0 && (
        <>
          <h6 className="mt-4">Future ideas</h6>
          <ul>
            {futureIdeas.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ProjectNotes;
