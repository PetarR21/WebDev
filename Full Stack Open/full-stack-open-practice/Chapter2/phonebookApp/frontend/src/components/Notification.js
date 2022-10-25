const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return <div className={notification.type === 'error' ? 'error' : 'success'}>{notification.message}</div>;
};

export default Notification;
