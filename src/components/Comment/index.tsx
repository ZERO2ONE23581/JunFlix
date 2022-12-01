import styled from '@emotion/styled';
import { Comments } from './Comments';
import { ITheme } from '../../../styles/theme';
import { CreateComment } from './CreateComment';
import { Dispatch, SetStateAction } from 'react';

export interface ISetPost extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
}
interface IPostComment {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostComment = ({ _data }: IPostComment) => {
  const { theme, setPost, post_id, host_id, setCmtModal } = _data;
  return (
    <>
      <Cont>
        <CreateComment
          _data={{ theme, post_id, host_id, setPost, setCmtModal }}
        />
        <Comments _data={{ theme, setPost, post_id, og_id: 0, setCmtModal }} />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  //border: 1px solid yellow;
  border-top: 1px dotted ${(p) => p.theme.color.font};
`;
