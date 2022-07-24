import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import {
  Modal,
  DimBackground,
  AnswerModal,
} from '../../../../../styles/global';

interface ICancelEditProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}
export const CancelEditBoard = ({ setEdit, setCancel }: ICancelEditProps) => {
  const handleClick = (type: string) => {
    setCancel(false);
    if (type === 'yes') setEdit(false);
  };
  return (
    <>
      <Cont>
        <span>업데이트를 취소하시겠습니까?</span>
        <span className="small">
          지금 취소하면 업데이트는 저장되지 않습니다.
        </span>
        <span>Do you want to cancel the update?</span>
        <span className="small">
          Current update is not saved if it is canceled.
        </span>
        <div className="btn-wrap">
          <Btn name="YES" type="button" onClick={() => handleClick('yes')} />
          <Btn name="NO" type="button" onClick={() => handleClick('no')} />
        </div>
      </Cont>
      <DimBackground zIndex={201} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  z-index: 204;
`;
