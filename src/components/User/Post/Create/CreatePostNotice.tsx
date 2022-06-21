import styled from '@emotion/styled';
import { Info } from '../../../../../styles/global';

interface ICreatePostNoticeProps {
  next: boolean;
  MaxTitle?: number;
  MaxContent?: number;
}

export const CreatePostNotice = ({
  next,
  MaxTitle,
  MaxContent,
}: ICreatePostNoticeProps) => {
  return (
    <>
      <Cont className="info">
        {!next ? (
          <>
            <span>* Please click the icon to add picture on the post.</span>
            <span className="kor">
              (사진을 업로드 하려면 아이콘을 클릭하세요.)
            </span>
            <ul>
              <li></li>
            </ul>
          </>
        ) : (
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
                {MaxTitle}
                letters.
              </span>
              <span className="kor">
                (게시물 제목은 {MaxTitle}자 이내여야 합니다.)
              </span>
            </li>
            <li>
              <span>
                * Maximum length of the content is equal to or less than
                {MaxContent} letters..
              </span>
              <span className="kor">
                (게시물 내용은 {MaxContent}자 이내여야 합니다.)
              </span>
            </li>
          </ul>
        )}
      </Cont>
    </>
  );
};
const Cont = styled(Info)`
  width: 100%;
  padding: 20px 40px;
  font-size: 1.1rem;
  .kor {
    margin-left: 10px;
    opacity: 0.8;
    font-size: 1rem;
  }
  ul {
    li {
      /* font-size: 1rem; */
      margin-bottom: 5px;
      span {
        display: inline;
      }
    }
  }
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;
