import styled from '@emotion/styled';
import { Btn } from '../Tools/Button';
import { Text } from '../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { opacityVar } from '../../styles/variants';

interface IBoardTxts {
  _data: {
    theme: boolean;
    isDel: boolean;
    setIsDel: Dispatch<SetStateAction<boolean>>;
  };
}
export const BoardTxts = ({ _data }: IBoardTxts) => {
  const { theme, isDel, setIsDel } = _data;
  return (
    <>
      {!isDel && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          variants={opacityVar}
        >
          <span className="kor">
            <span>이 보드를 정말로 삭제하겠습니까?</span>
            <span>보드는 삭제후 복구가 불가합니다.</span>
          </span>
          <span className="eng">
            <span>Are you sure to delete this board?</span>
            <span>Board can not be recovered after deletion.</span>
          </span>
          <Btn
            type="button"
            item={{ theme, name: 'Delete' }}
            onClick={() => setIsDel(true)}
          />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Text)``;
