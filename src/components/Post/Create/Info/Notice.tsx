import { useState } from 'react';
import styled from '@emotion/styled';
import { Info } from '../../../../../styles/global';

interface ICreatePostNoticeProps {
  next: boolean;
}
export const Notice = ({ next }: ICreatePostNoticeProps) => {
  const [maxCnt] = useState(700);
  const [maxTitle] = useState(20);
  return (
    <>
      {!next && (
        <Cont>
          <span>* Please click the icon to add picture on the post.</span>
          <span className="kor">
            (사진을 업로드 하려면 아이콘을 클릭하세요.)
          </span>
        </Cont>
      )}
      {next && (
        <Cont>
          <ul>
            <li>
              <span>* Click the back icon to eidt the picture.</span>
              <span className="kor">
                (사진을 수정하려면 뒤로가기 아이콘을 클릭하세요.)
              </span>
            </li>
            <li>
              <span>
                * Maximum length of the title is equal to or less than{' '}
                {maxTitle}
                letters.
              </span>
              <span className="kor">
                (게시물 제목은 {maxTitle}자 이내여야 합니다.)
              </span>
            </li>
            <li>
              <span>
                * Maximum length of the content is equal to or less than
                {maxCnt} letters..
              </span>
              <span className="kor">
                (게시물 내용은 {maxCnt}자 이내여야 합니다.)
              </span>
            </li>
          </ul>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Info)`
  padding: 20px;
  font-size: 1rem;
  .kor {
    margin-left: 10px;
    opacity: 0.8;
    font-size: 1rem;
  }
  ul {
    li {
      margin-bottom: 5px;
      span {
        display: inline;
      }
    }
  }
`;
