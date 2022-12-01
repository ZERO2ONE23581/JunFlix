import { Comment } from './Comment';
import styled from '@emotion/styled';
import { ITheme } from '../../../../styles/theme';
import { Flex, FlexCol } from '../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  TheComment,
  useAllCmts,
  useReplies,
} from '../../../libs/client/useComment';
import { AnimatePresence } from 'framer-motion';
import { color } from '../../../../styles/variants';
import { More } from './More';

interface IComments extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    og_id: number;
    post_id: number;
    host_id: number;
  };
}
export interface IClickSvg {
  type: string;
  comment: TheComment;
}
export const Comments = ({ theme, _data, setPost }: IComments) => {
  //
  const { post_id, og_id } = _data;
  const { replies, isReplies } = useReplies({ post_id, og_id });
  const { isOriginals, total_length, originals } = useAllCmts({ post_id });

  const isReply = Boolean(og_id);
  const rep_length = replies?.length!;
  const isZero = Boolean(rep_length - 1 === 0);
  const [sliced, setSliced] = useState(true);
  const Relies =
    sliced && !isZero ? replies?.slice(rep_length - 1, rep_length) : replies;
  const Array = og_id ? Relies : originals;
  const isArray = og_id ? isReplies : isOriginals;
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
              <Comment _data={{ theme, comment, setPost }} />
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
  //border: 2px solid hotpink;
  //border: ${(p) => p.isReply && '3px solid yellow'};
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
