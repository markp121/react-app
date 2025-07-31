import React from "react";
import logo from "../assets/images/logo.png";
import node_express_mysql from "../assets/images/node_express_mysql.png";
import react_icon from "../assets/images/react_icon.png";
import database from "../assets/images/database.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-row">
        <section>
          <h1>Introduction</h1>
          <p>
            Welcome to this demo react application. This application includes all the fundamental
            concepts of building a SPA with React. This application is a simple job board where you
            can create and manage jobs. Bots can be added to jobs and the status of jobs can be
            updated. This app employs a simple backend where Bots, Jobs and Profiles are stored in a
            MySQL database.
          </p> <br />
          <h2>Tech Stack:</h2>
          <div className="tech-stack">
            <div className="tech-stack-list">
              <h3>Backend:</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>Sequelize ORM</li>
                <li>MySQL</li>
              </ul>
            </div>
            <div>
              <h3>Frontend:</h3>
              <ul>
                <li>React</li>
                <li>Vite as the build tool</li>
                <li>ESLint</li>
                <li>Node.js</li>
              </ul>
            </div>
          </div>
        </section>
        <div className="home-image">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="home-row">
        <div className="home-image">
          <img src={node_express_mysql} className="node-image" alt="react logo" />
        </div>
        <section>
          <h1>Backend</h1>
          <p>
            <strong>Backend architecture:</strong>
            <li>Models created via Sequelize-CLI ORM.</li>
            <li>MySQL database used to store data.</li>
            <li>Express is used to create the API routes.</li>
            <li>GET, PUT, POST, DELETE and PATCH routes for CRUD operations.</li>
            <li>DB Queries written using Sequelize.</li>
            <li>
              Jobs and Bots models have M:N relationship. This is achieved via join table in the
              database.
            </li>
          </p>
        </section>
      </div>
      <div className="home-row">
        <section>
          <h1>Frontend</h1>
          <p>
            <strong>Frontend architecture:</strong>
            <br />
            When a component renders, useEffect hooks send an API request to get the relevant
            table(s) from the DB. This data is then loaded into a state(s). <br />
            <br />
            <strong>CRUD operations:</strong>
            <br />
            <li>Example for POST: the new data is entered in a form and put into a state.</li>
            <li>State is sent to the API via a POST request.</li>
            <li>
              Hook that controls the GET operation for the data table has this state as a
              dependency.
            </li>
            <li>The component is re-rendered and data state is updated.</li>
          </p>
        </section>
        <div className="home-image">
          <img src={database} className="node-image" alt="react logo" />
        </div>
      </div>
      <div className="home-row">
        <div className="home-image">
          <img src={react_icon} className="node-image" alt="react logo" />
        </div>
        <section>
          <h1>Frontend Cont.</h1>
          <p>
            <strong>State management:</strong>
            <br />
            To display updates to the data in all relevant components, data states are lifted up to
            the first parent component. This is showcased in the application in sidebars. CRUD
            operation can be completed in the sidebar or in the page and the UI will be updated
            accordingly.
            <br /> <br />
            <strong>Filtering / Sorting:</strong>
            <br />
            Filtering and sorting is applied via hooks dependent on that filter / sort state. The
            hooks update a list state via filter operations when the filter / sort state is updated.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
