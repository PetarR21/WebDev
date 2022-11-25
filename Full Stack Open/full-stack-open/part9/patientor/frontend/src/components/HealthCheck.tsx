import { HealthCheckEntry } from '../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheck = ({ healthCheckEntry }: { healthCheckEntry: HealthCheckEntry }) => {
  const getColorRating = (rating: number): string => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return '';
    }
  };

  return (
    <div>
      <p>
        {healthCheckEntry.date} <MedicalServicesIcon />
      </p>
      <p>
        <em>{healthCheckEntry.description}</em>
      </p>
      <p>
        <FavoriteIcon style={{ color: `${getColorRating(healthCheckEntry.healthCheckRating)}` }} />
      </p>
      <p>diagnose by {healthCheckEntry.specialist}</p>
    </div>
  );
};

export default HealthCheck;
