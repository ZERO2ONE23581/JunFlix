import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Avatar } from '../../Tools/Avatar';
import { ITheme } from '../../../styles/theme';
import { Flex, FlexCol } from '../../../styles/global';
import { useComments } from '../../libs/client/useComment';
import { useCapLetter } from '../../libs/client/useTools';
import { Svg } from '../../Tools/Svg';
import { CreateModal } from './Create/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Comment } from './Comment';

interface IComments extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    post_id: number;
    host_id: number;
  };
}
export const Comments = ({ theme, _data, setPost }: IComments) => {
  const { post_id, host_id } = _data;
  const { originals, NoCmts } = useComments({ post_id, host_id });
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
  //border: 2px solid red;
`;
const Array = styled(FlexCol)``;
