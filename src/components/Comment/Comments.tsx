import { Comment } from './Comment';
import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { FlexCol } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { useComments } from '../../libs/client/useComment';

interface IComments extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    post_id: number;
    host_id: number;
  };
}
export const Comments = ({ theme, _data, setPost }: IComments) => {
  const { post_id, host_id } = _data;
  const { originals, NoCmts } = useComments({ post_id });
  return (
    <>
      {!NoCmts && (
        <Cont>
          <h1>Total Comments: ({originals?.length})</h1>
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
`;
const Array = styled(FlexCol)``;
