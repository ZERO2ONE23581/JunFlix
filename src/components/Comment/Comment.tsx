import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar } from '../../Tools/Avatar';
import { ITheme } from '../../../styles/theme';
import { Flex, FlexCol } from '../../../styles/global';
import { TheComment, useComments } from '../../libs/client/useComment';
import { useCapLetter } from '../../libs/client/useTools';
import { Svg } from '../../Tools/Svg';
import { CreateModal } from './Create/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Comments } from './Comments';
import { Reply } from './Reply';

interface IComment extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    post_id: number;
    host_id: number;
    comment: TheComment;
  };
}
export const Comment = ({ theme, _data, setPost }: IComment) => {
  const { post_id, host_id, comment } = _data;
  const [select, setSelect] = useState(0);
  const { replies } = useComments({ post_id, host_id, cmt_id: comment.id });
  return (
    <AnimatePresence>
      <Each key={comment.id}>
        <div className="id">{comment.id}</div>
        <Avatar _data={{ theme, host_id, size: '3.5rem' }} />
        <Content>
          <span className="userId">{useCapLetter(comment?.host?.userId)}</span>
          <p>{comment.text}</p>
          <Btns>
            <Svg
              theme={theme}
              type="comment_empty"
              item={{ size: '1.5rem' }}
              onClick={() => setSelect(comment.id)}
            />
            <Svg type="like" theme={theme} item={{ size: '1.5rem' }} />
            <Svg type="ellipsis" theme={theme} item={{ size: '1.5rem' }} />
          </Btns>
          {replies?.map((reply) => (
            <Array key={reply.id}>
              <Reply
                theme={theme}
                setPost={setPost}
                _data={{ post_id, host_id, reply, og_id: comment.id }}
              />
            </Array>
          ))}
        </Content>
      </Each>

      <CreateModal
        key={comment.id * 22}
        theme={theme}
        setPost={setPost}
        _reply={{
          og_id: comment.id,
          rep_userId: comment.host.userId,
        }}
        _data={{
          post_id,
          closeModal: () => setSelect(0),
          modal: Boolean(select === comment.id),
        }}
      />
    </AnimatePresence>
  );
};
const Each = styled(Flex)`
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
  .id {
    color: red;
    font-size: 2rem;
  }
`;
const Content = styled(FlexCol)`
  align-items: flex-start;
  width: fit-content;
  max-width: 80%;
  .userId {
    color: #3498db;
    font-weight: 500;
  }
`;
const Btns = styled(Flex)`
  gap: 0.8rem;
  margin: 0.5rem 0;
  width: fit-content;
  justify-content: flex-start;
`;
const Array = styled(FlexCol)``;
