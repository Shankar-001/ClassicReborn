import { Modal, Button } from 'antd';

const ConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirmation"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to logout?</p>
    </Modal>
  );
};

export default ConfirmationModal;
    