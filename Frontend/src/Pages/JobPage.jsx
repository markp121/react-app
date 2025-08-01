import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const JobPage = () => {
  const { jobsState, handleDeleteJob } = useOutletContext();

  const navigate = useNavigate();
  const jobId = useLocation().state.id;
  const job = jobsState.filter((prev) => prev.id === jobId)[0];

  return (
    <div className="job-page">
      <div className="job-page-body">
        {job && (
          <>
            <div className="job-details">
              <div className="job-header">
                <h2>Name:</h2>
                <p>
                  <strong>{job.name}</strong>
                </p>
              </div>
              <div className="job-description">
                <h3>Description:</h3>
                <p>{job.description}</p>
              </div>
              <div className="job-status">
                <h3>Status:</h3>
                <p>
                  {job.status}
                  <span className={`status-ball ${job.status}`}></span>
                </p>
              </div>
              <div className="job-actions">
                <button className="button neutral">Edit Job</button>
                <button className="button danger" onClick={() => handleDeleteJob(jobId, () => navigate("/jobs"))}>Delete Job</button>
              </div>
            </div>
            <div className="job-bots">
              <h3>Required Bots:</h3>
              {job.Bots.length > 0 ? (
                <ul className="job-bots-list">
                  {job.Bots.map((bot) => (
                    <li key={bot.name} className="list-item">
                      <h4>{bot.name}</h4>
                      <p>
                        <strong>Task:</strong> {bot.task}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bots required</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobPage;
