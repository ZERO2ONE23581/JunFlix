import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import {
  Modal,
  DimBackground,
  AnswerModal,
} from '../../../../../styles/global';

interface ICancel {
  closePost: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}
export const CancelModal = ({ closePost, setCancel }: ICancel) => {
  const handleClick = (isCancel: boolean) => {
    setCancel(false);
    if (isCancel) closePost(false);
  };
  return (
    <>
      <Cont>
        <span>게시물을 작성을 취소 하시겠습니까?</span>
        <span className="small">
          지금 나가면 수정 내용이 저장되지 않습니다.
        </span>
        <div className="btn-wrap">
          <Btn
            name="취소하기"
            type="button"
            onClick={() => handleClick(true)}
          />
          <Btn
            name="계속하기"
            type="button"
            onClick={() => handleClick(false)}
          />
        </div>
      </Cont>
      <DimBackground zIndex={200} onClick={() => handleClick(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  z-index: 201;
  border: ${(p) => p.theme.border.thick};
`;
