import React, { Component, Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey'; 

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      name
      date_local
      success
    }
  }
`;

function LaunchesQuery() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <h4>Loading...</h4>;
  if (error) console.log(error);

  return (
    <Fragment>
      {data.launches.map(launch => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
    </Fragment>
  );
}

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        {LaunchesQuery}
      </Fragment>
    );
  }
}

export default Launches;
