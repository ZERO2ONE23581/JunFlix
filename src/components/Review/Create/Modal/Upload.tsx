import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { BtnWrap } from './OneLine';

interface IUpload {
  isEdit?: boolean;
  setUpload: Dispatch<SetStateAction<boolean>>;
}
export const Upload = ({ isEdit, setUpload }: IUpload) => {
  return (
    <Cont>
      <h1>
        {isEdit && <span>리뷰를 업데이트 하겠습니까?</span>}
        {!isEdit && <span>리뷰를 업로드 하겠습니까?</span>}
        {isEdit && <span>Do you want to update your review?</span>}
        {!isEdit && <span>Woulud you like to upload your review?</span>}
      </h1>
      {!isEdit && (
        <h2>
          <span>리뷰는 업로드 후 수정이 가능합니다.</span>
          <span>You can edit review after submit.</span>
        </h2>
      )}
      <BtnWrap>
        <Btn type="button" name="뒤로가기" onClick={() => setUpload(false)} />
        <Btn type="submit" name={isEdit ? '업데이트' : '업로드'} />
      </BtnWrap>
    </Cont>
  );
};
const Cont = styled.article`
  h1,
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
`;
