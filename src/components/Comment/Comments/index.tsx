import { More } from './More';
import { ReadCmt } from './Read';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { FlexCol, FlexCol_ } from '../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAllCmts, useReplies } from '../../../libs/client/useComment';
import { useResponsive } from '../../../libs/client/useTools';

interface IComments {
  _data: {
    og_id: number;
    post_id: number;
    theme: boolean;
    setPost: Dispatch<SetStateAction<boolean>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Comments = ({ _data }: IComments) => {
  const { isDesk } = useResponsive();
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
        <Cont isDesk={isDesk}>
          {!isReply && <h1>Total Comments: ({total_length})</h1>}
          {isReply && !isZero && (
            <More _data={{ theme, sliced, rep_length, setSliced }} />
          )}
          {Array?.map((comment) => (
            <Arr key={comment.id} isReply={isReply}>
              <ReadCmt _data={{ theme, comment, setPost, setCmtModal }} />
            </Arr>
          ))}
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(FlexCol_)`
  gap: 1rem;
  margin: 0.5rem 0;
  align-items: flex-start;
  font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.5rem')};
  h1 {
    font-style: italic;
    font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.5rem')};
  }
`;
const Arr = styled.div<{ isReply: boolean }>`
  width: fit-content;
  margin-left: ${(p) => p.isReply && '1rem'};
`;
