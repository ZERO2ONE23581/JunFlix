import { useState } from 'react';
import styled from '@emotion/styled';
import { IconWrap } from '../../IconWrap';
import { ReadComment } from '../../Comment/ReadComment';
import { CreateComments } from '../../Comment/Create/CreateComments';

interface IContent {
  USERID: number;
  REVIEWID: number;
  CONTENT: string;
}
export const Content = ({ CONTENT, REVIEWID, USERID }: IContent) => {
  const [createCmt, setCreateCmt] = useState(false);
  return (
    <>
      <Cont>
        <p>{CONTENT}</p>
        <IconWrap
          POSTID={0}
          BOARDID={0}
          USERID={USERID}
          REVIEWID={REVIEWID}
          createCmt={createCmt}
          setCreateCmt={setCreateCmt}
        />
        {createCmt && (
          <CreateComments
            replyID={0}
            POSTID={0}
            BOARDID={0}
            USERID={USERID}
            REVIEWID={REVIEWID}
          />
        )}
        <ReadComment
          POSTID={0}
          BOARDID={0}
          USERID={USERID}
          REVIEWID={REVIEWID}
        />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  border: none;
  padding: 2% 20%;
  p {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 30px;
  }
`;
