import React from 'react';
import { Entry, Diagnosis } from '../../types';
import { Typography } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry }: { entry: Entry }) => {
  return (
    <div style={{ border: '1px solid black', padding: '20px', marginBottom: '10px', borderRadius: '10px' }}>
      <Typography>
        {entry.date } <LocalHospitalIcon />
      </Typography>
      <p><i>{entry.description}</i></p>
      <p>diagnose by <b>{entry.specialist}</b></p>
    </div>
  )
};

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  return (
    <div style={{ border: '1px solid black', padding: '20px', marginBottom: '10px', borderRadius: '10px' }}>
      <Typography>
        {entry.date } <HealthAndSafetyIcon />
      </Typography>
      <p><i>{entry.description}</i></p>
      <p>diagnose by <b>{entry.specialist}</b></p>
    </div>
  )
};

const HealthCheck = ({ entry }: { entry: Entry }) => {
  return (
    <div style={{ border: '1px solid black', padding: '20px', marginBottom: '10px', borderRadius: '10px' }}>
      <Typography>
        {entry.date } <MonitorHeartIcon />
      </Typography>
      <p><i>{entry.description}</i></p>
      <p>{entry.healthCheckRating === 0 ? <div style={{ color: 'green' }}><FavoriteIcon /></div> : entry.healthCheckRating === 1 ? <div style={{ color: 'yellow' }}><FavoriteIcon /></div> : entry.healthCheckRating === 2 ? <div style={{ color: 'yellow' }}><FavoriteIcon /></div> : null}</p>
      <p>diagnose by <b>{entry.specialist}</b></p>
    </div>
  )
};

const index = ({ entries, diagnoses }: { entries: Entry[], diagnoses: Diagnosis[] }) => {
  return (
    <div>
      {entries && entries.map(entry => {
        switch (entry.type) {
          case 'Hospital':
            return <Hospital entry={entry} />
            break;
          case 'OccupationalHealthcare':
            return <OccupationalHealthcare entry={entry} />
            break;
          case 'HealthCheck':
            return <HealthCheck entry={entry} />
            break;
          default:
            break;
        }
      })}
    </div>
  )
}

export default index
