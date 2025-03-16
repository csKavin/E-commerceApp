import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useHistory } from 'react-router';

interface DoctorCardProps {
  doctor: {
    id:number,
    avatarUrl: string;
    doctorName: string;
    specialty: string;
    reviews: string;
    time: string;
  };
  status: 'upcoming' | 'completed' | 'cancelled';
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, status }) => {
  const history = useHistory();

  return (
    <Card
      sx={{
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        transition: '0.3s',
        backgroundColor: '#ffffff',
      }}
    >
      <CardContent>
        <div className="d-flex gap-2 align-items-center">
          <img
            src={doctor.avatarUrl}
            alt="Doctor avatar"
            className="rounded-circle"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
            }}
          />
          <div>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, color: 'black' }}>
              {doctor.doctorName}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#616161' }}>
              {doctor.specialty}
            </Typography>
          </div>
        </div>
        <hr style={{ backgroundColor: '#e0e0e0', margin: '12px 0' }} />
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <EventIcon sx={{ color: '#616161' }} />
            <Typography sx={{ fontSize: '14px', color: '#616161' }}>
              {doctor.reviews}
            </Typography>
          </div>
          <div className="d-flex align-items-center gap-2">
            <AccessTimeIcon sx={{ color: '#616161' }} />
            <Typography sx={{ fontSize: '14px', color: '#616161' }}>
              {doctor.time}
            </Typography>
          </div>
        </div>
        <br />
        {status === 'upcoming' && (
          <div className="d-flex justify-content-between gap-3">
            <button
              className="book-appointment-button w-100"
              style={{
                backgroundColor: '#E0F7FF',
                color: '#1976D2',
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                transition: '0.3s',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '12px',
              }}
              // onClick={() => history.push({
              //   pathname: `/viewpage/${doctor?.id}`,
              //   state: { doctor, type: 'ApppointentData' }
              // })}
            >
              Cancel Appointment
            </button>
            <button
              className="book-appointment-button w-100"
              style={{
                backgroundColor: '#0d99ff',
                color: 'white',
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                transition: '0.3s',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '12px',
              }}
            >
              Reschedule
            </button>
          </div>
        )}
        {status === 'completed' && (
          <div className="d-flex justify-content-between gap-3">
            <button
              className="book-appointment-button w-100"
              style={{
                backgroundColor: '#E0F7FF',
                color: '#1976D2',
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                transition: '0.3s',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '12px',
              }}
            >
              Book Again
            </button>
            <button
              className="book-appointment-button w-100"
              style={{
                backgroundColor: '#0d99ff',
                color: 'white',
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                transition: '0.3s',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '12px',
              }}
            >
              Leave a Review
            </button>
          </div>
        )}
        {/* {status === 'cancelled' && <Typography sx={{ textAlign: 'center', color: '#616161' }}>No actions available</Typography>} */}
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
