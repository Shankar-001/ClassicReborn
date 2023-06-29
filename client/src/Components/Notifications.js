import { Modal, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DeleteNotification } from '../apicalls/notifications';
import { SetLoader } from '../Redux/lodersSlice';

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const count = notifications?.filter(
    (notification) => !notification.read
  ).length;

  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => {
        reloadNotifications();
        setShowNotifications(false);
      }}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.length === 0 ? (
          <p>No new notification found</p>
        ) : (
          <div className="flex flex-col gap-2">
            {count === 0 ? <p>No New Notification</p> : null}
            {notifications.map((notification) => (
              <div
                className="flex flex-col border border-solid p-2 border-gray-300 rounded cursor-pointer"
                key={notification._id}
              >
                <div className="flex justify-between items-center">
                  <div
                    onClick={() => {
                      navigate(notification.onClick);
                      reloadNotifications();
                      setShowNotifications(false);
                    }}
                  >
                    <h1 className="text-gray-700">{notification.title}</h1>
                    <span className="text-gray-600">
                      {notification.message}
                    </span>
                    <h1 className="text-gray-500 text-sm">
                      {moment(notification.createdAt).fromNow()}
                    </h1>
                  </div>
                  <i
                    className="ri-delete-bin-line"
                    onClick={() => {
                      deleteNotification(notification._id);
                    }}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
export default Notifications;
