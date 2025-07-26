import { useLocation } from "react-router-dom";

const JobPage = () => {
  const state = useLocation().state;
  const job = state.job;
  return (
    <div className="job-page">
      <div className="job-page-body">
        <div className="job-details">
          <div className="job-header">
            <h2>Job Name:</h2>
            <h3>{job.name}</h3>
          </div>
          <div className="job-description">
            <h3>Job Description:</h3>
            <p>{job.description}</p>
          </div>
          <div className="job-bots">
            <h3>Required Bots:</h3>
            <ul>
              {job.Bots.map((bot) => (
                <li key={bot.name} className="list-item">
                  <h4>
                    <strong>Bot Name:</strong> {bot.name}
                  </h4>
                  <p>
                    <strong>Bot Task:</strong> {bot.task}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-status">
            <h3>Job Status:</h3>
            <p>
              {job.status}
              <span className={`status-ball ${job.status}`}></span>
            </p>
          </div>
        </div>
        <button className="button neutral">Edit Job</button>
      </div>
    </div>
  );
};

export default JobPage;
