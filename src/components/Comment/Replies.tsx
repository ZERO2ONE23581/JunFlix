import styled from '@emotion/styled';
import { Comment } from './Comment';
import { ITheme } from '../../../styles/theme';
import { FlexCol } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { useComments } from '../../libs/client/useComment';

interface IReplies extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    post_id: number;
    host_id: number;
  };
}
export const Replies = ({ theme, _data, setPost }: IReplies) => {
  const { post_id, host_id } = _data;
  const { originals, length, NoCmts } = useComments({ post_id, host_id });
  return (
    <>
      {!NoCmts && (
        <Cont>
          <h1>Total Comments: ({length})</h1>
          {originals?.map((comment) => (
            <Array key={comment.id}>
              <Comment
                theme={theme}
                setPost={setPost}
                _data={{ post_id, host_id, comment }}
              />
            </Array>
          ))}
        </Cont>
      )}
      {NoCmts && (
        <>
          <h1>No Comments...</h1>
        </>
      )}
    </>
  );
};
const Cont = styled(FlexCol)`
  gap: 1rem;
  margin: 0.5rem 0;
  align-items: flex-start;
  h1 {
    font-size: 1.3rem;
    font-style: italic;
  }
  //border: 2px solid red;
`;
const Array = styled(FlexCol)``;
