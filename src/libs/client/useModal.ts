import { Dispatch, SetStateAction, useEffect } from 'react';

interface IUseModalFixed {
  modal: boolean;
  restrict: boolean;
  setFixed: Dispatch<SetStateAction<boolean>>;
}
export const useModalFixed = ({
  modal,
  setFixed,
  restrict,
}: IUseModalFixed) => {
  useEffect(() => {
    if (restrict) return;
    if (modal) setFixed(true);
  }, [modal, setFixed, restrict]);
};
