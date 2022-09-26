import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return null;

  const color = notification.type === 'success' ? 'green' : 'red';

  return (
    <div className='container mx-auto p-6'>
      <div
        className={`p-4 mb-4 text-2xl text-${color}-700 bg-${color}-100 rounded-lg dark:bg-${color}-200 dark:text-${color}-800`}
      >
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;
