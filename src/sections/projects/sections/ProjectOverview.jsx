const ProjectOverview = ({ data }) => {
  if (!data) return null;

  const { title, summary, context } = data;

  return (
    <section className="project-section project-overview mb-5">
      <header className="mb-3">
        <h2 className="mb-2">{title}</h2>
        {summary && <p className="text-muted">{summary}</p>}
      </header>

      {Array.isArray(context) && context.length > 0 && (
        <ul className="list-unstyled mt-3">
          {context.map((item, index) => (
            <li key={index} className="mb-2">
              — {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectOverview;
