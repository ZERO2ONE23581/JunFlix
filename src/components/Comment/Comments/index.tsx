import { More } from './More';
import { Comment } from './Comment';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { FlexCol } from '../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAllCmts, useReplies } from '../../../libs/client/useComment';

interface IComments {
  _data: {
    theme: boolean;
    og_id: number;
    post_id: number;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Comments = ({ _data }: IComments) => {
  const { theme, setPost, post_id, og_id, setCmtModal } = _data;
  const { replies, isReplies } = useReplies({ post_id, og_id });
  const { isOriginals, total_length, originals } = useAllCmts({ post_id });
  const isReply = Boolean(og_id);
  const isArray = og_id ? isReplies : isOriginals;

  const rep_length = replies?.length!;
  const [sliced, setSliced] = useState(true);
  const isZero = Boolean(rep_length - 1 === 0);
  const Relies =
    sliced && !isZero ? replies?.slice(rep_length - 1, rep_length) : replies;

  const Array = og_id ? Relies : originals;
  return (
    <AnimatePresence>
      {isArray && (
        <Cont>
          {!isReply && <h1>Total Comments: ({total_length})</h1>}
          {isReply && !isZero && (
            <More _data={{ theme, sliced, rep_length, setSliced }} />
          )}
          {Array?.map((comment) => (
            <Arr key={comment.id} isReply={isReply}>
              <Comment _data={{ theme, comment, setPost, setCmtModal }} />
            </Arr>
          ))}
        </Cont>
      )}
      {!isArray && !isReply && (
        <>
          <h1>No Comments...</h1>
        </>
      )}
    </AnimatePresence>
  );
};
const Arr = styled.div<{ isReply: boolean }>`
  width: fit-content;
  margin-left: ${(p) => p.isReply && '1rem'};
`;
const Cont = styled(FlexCol)`
  gap: 1rem;
  margin: 0.5rem 0;
  align-items: flex-start;
  h1 {
    font-size: 1.3rem;
    font-style: italic;
  }
`;
