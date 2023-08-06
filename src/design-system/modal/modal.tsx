import { FC, PropsWithChildren } from 'react';
import './modal.css';

type ModalProps = PropsWithChildren<{
  handleClose: VoidFunction;
}>;

export const Modal: FC<ModalProps> = ({ children, handleClose }) => {
  return (
    <div className="modal-container">
      <div className="background" onClick={handleClose} />
      <div className="modal">{children}</div>
    </div>
  );
};
