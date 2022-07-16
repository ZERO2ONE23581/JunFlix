import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';

interface IUpload {
  setUpload: Dispatch<SetStateAction<boolean>>;
}
export const Upload = ({ setUpload }: IUpload) => {
  return (
    <Cont>
      <h1>
        <span>리뷰를 업로드 하겠습니까?</span>
        <span>Woulud you like to upload your review?</span>
      </h1>
      <h2>
        <span>리뷰는 업로드 후 수정이 가능합니다.</span>
        <span>You can edit review after submit.</span>
      </h2>
      <div className="btn-wrap">
        <Btn type="button" name="뒤로가기" onClick={() => setUpload(false)} />
        <Btn type="submit" name="업로드" />
      </div>
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
