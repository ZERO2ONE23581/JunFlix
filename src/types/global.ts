import { Dispatch, SetStateAction } from 'react';

export interface ModalProps {
  openModal: Dispatch<SetStateAction<boolean>>;
  onClick?: Dispatch<SetStateAction<boolean>>;
}
