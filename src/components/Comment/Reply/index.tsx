import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar } from '../../../Tools/Avatar';
import { ITheme } from '../../../../styles/theme';
import { Flex, FlexCol, Modal } from '../../../../styles/global';
import { TheComment, useComments } from '../../../libs/client/useComment';
import { useCapLetter } from '../../../libs/client/useTools';
import { Svg } from '../../../Tools/Svg';
import { CreateModal } from '../Create/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { cmtModalVar, UpdateModal } from '../Update/Modal';
import { hoverBgColor } from '../../../../styles/variants';
import { OverlayBg } from '../../../Tools/overlay';
import { DeleteModal } from '../Delete/Modal';

interface IReply extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
  _data: {
    og_id: number;
    post_id: number;
    host_id: number;
    reply: TheComment;
    replied_to: string;
  };
}
export const Reply = ({ theme, _data, setPost }: IReply) => {
  const { replied_to, post_id, host_id, reply, og_id } = _data;
  const [select, setSelect] = useState(0);
  const [option, setOption] = useState(false);
  const [modal, setModal] = useState('');
  const { re_replies: replies } = useComments({
    post_id,
    host_id,
    cmt_id: reply.id,
  });
  const clickEllips = () => {
    setOption(true);
    setSelect(reply.id);
  };
  const clickEdit = () => {
    setOption(false);
    setSelect(reply.id);
    setModal('update');
  };
  const clickDelete = () => {
    setOption(false);
    setSelect(reply.id);
    setModal('delete');
  };
  const closeModal = () => {
    setSelect(0);
    setModal('');
    setOption(false);
  };
  return (
    <AnimatePresence>
      <Each key={reply.id}>
        <div className="id">{reply.id}</div>
        <Avatar _data={{ theme, host_id, size: '3.5rem' }} />
        <Content>
          <span className="userId">{useCapLetter(reply?.host?.userId)}</span>
          <p>
            <span className="replied_to">
              @{useCapLetter(reply?.host?.userId)}
            </span>
            <span>{reply.text}</span>
          </p>
          <Btns>
            <Svg
              theme={theme}
              type="comment_empty"
              item={{ size: '1.5rem' }}
              onClick={() => setSelect(reply.id)}
            />
            <Svg type="like" theme={theme} item={{ size: '1.5rem' }} />
            <Svg
              theme={theme}
              type="ellipsis"
              onClick={clickEllips}
              item={{ size: '1.5rem' }}
            />
          </Btns>
        </Content>
      </Each>

      {replies?.map((re_reply) => (
        <Array key={re_reply.id}>
          <Reply
            theme={theme}
            setPost={setPost}
            _data={{
              post_id,
              host_id,
              reply: re_reply,
              og_id: re_reply.og_id!,
              replied_to: reply.host.userId,
            }}
          />
        </Array>
      ))}
      <AnimatePresence>
        {option && Boolean(select === reply.id) && (
          <>
            <OptionModal
              exit="exit"
              layoutId="option"
              initial="initial"
              animate="animate"
              className="modal"
              custom={theme}
              variants={cmtModalVar}
            >
              <Svg type="close" theme={theme} onClick={closeModal} />
              <Btn
                whileHover="hover"
                onClick={clickEdit}
                variants={hoverBgColor}
              >
                Edit
              </Btn>
              <Btn
                whileHover="hover"
                onClick={clickDelete}
                variants={hoverBgColor}
              >
                Delete
              </Btn>
            </OptionModal>
            <OverlayBg closeModal={closeModal} />
          </>
        )}
      </AnimatePresence>
      <UpdateModal
        theme={theme}
        setPost={setPost}
        key={reply.id * 33}
        _data={{
          post_id,
          closeModal,
          og_cmt: reply,
          modal: !option && Boolean(select === reply.id) && modal === 'update',
        }}
      />
      <DeleteModal
        theme={theme}
        setPost={setPost}
        key={reply.id * 44}
        _data={{
          post_id,
          closeModal,
          cmt_id: reply.id,
          modal: !option && Boolean(select === reply.id) && modal === 'delete',
        }}
      />
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
          closeModal,
          modal: !option && Boolean(select === reply.id) && !modal,
        }}
      />
    </AnimatePresence>
  );
};
const OptionModal = styled(Modal)`
  top: 50%;
  z-index: 100;
  width: 40vw;
  height: fit-content;
`;
const Btn = styled(motion.div)`
  width: 100%;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.5rem 1rem;
`;

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
    opacity: 0.95;
    font-size: 1rem;
    font-weight: 500;
    color: ${(p) => p.theme.color.logo};
  }
  .replied_to {
    color: #3498db;
    font-weight: 500;
    margin-right: 0.5rem;
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
