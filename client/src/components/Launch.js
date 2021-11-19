import React, { Component, Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query LaunchQuery($id: String!) {
    launch(id: $id) {
      flight_number
      name
      details
      success
      date_local
      rocket
    }
  }
`;

function LaunchQuery() {
  const { loading, error, data } = useQuery(LAUNCH_QUERY);
  // let { id } = this.props.match.params;
  // id = String(id);
  if (loading) return <h4>Loading...</h4>;
  if (error) console.log(error);
  const {
    flight_number,
    name,
    details,
    success,
    rocket
  } = data.launch;
  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span> {name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Flight Number: {flight_number}
        </li>
        <li className="list-group-item">
          Details: {details}
        </li>
        <li className="list-group-item">
          Launch Successful:{' '}
          <span
            className={classNames({
              'text-success': success,
              'text-danger': !success
            })}
          >
            {success ? 'Yes' : 'No'}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details: {rocket}</h4>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
}

export class Launch extends Component {
  render() {
    return (
      <Fragment>
        {LaunchQuery}
      </Fragment>
    );
  }
}

export default Launch;
