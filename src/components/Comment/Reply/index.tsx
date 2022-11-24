import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar } from '../../../Tools/Avatar';
import { ITheme } from '../../../../styles/theme';
import { Flex, FlexCol } from '../../../../styles/global';
import { TheComment, useComments } from '../../../libs/client/useComment';
import { useCapLetter } from '../../../libs/client/useTools';
import { Svg } from '../../../Tools/Svg';
import { CreateModal } from '../Create/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Comments } from '../Comments';

interface IReply extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    og_id: number;
    post_id: number;
    host_id: number;
    reply: TheComment;
  };
}
export const Reply = ({ theme, _data, setPost }: IReply) => {
  const { post_id, host_id, reply, og_id } = _data;
  const [select, setSelect] = useState(0);
  const { re_replies: replies } = useComments({
    post_id,
    host_id,
    cmt_id: reply.id,
  });

  return (
    <AnimatePresence>
      <Each key={reply.id}>
        <div className="id">{reply.id}</div>
        <Avatar _data={{ theme, host_id, size: '3.5rem' }} />
        <Content>
          <span className="userId">{useCapLetter(reply?.host?.userId)}</span>
          <p>{reply.text}</p>
          <Btns>
            <Svg
              theme={theme}
              type="comment_empty"
              item={{ size: '1.5rem' }}
              onClick={() => setSelect(reply.id)}
            />
            <Svg type="like" theme={theme} item={{ size: '1.5rem' }} />
            <Svg type="ellipsis" theme={theme} item={{ size: '1.5rem' }} />
          </Btns>
        </Content>
      </Each>

      {replies?.map((reply) => (
        <Array key={reply.id}>
          <Reply
            theme={theme}
            setPost={setPost}
            _data={{ post_id, host_id, reply, og_id: reply.og_id! }}
          />
        </Array>
      ))}
      <CreateModal
        key={reply.id * 22}
        theme={theme}
        setPost={setPost}
        _reply={{
          og_id,
          reply_id: reply.id,
          rep_userId: reply.host.userId,
        }}
        _data={{
          post_id,
          closeModal: () => setSelect(0),
          modal: Boolean(select === reply.id),
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
  //border: 2px solid blue;
`;
const Array = styled(FlexCol)``;
