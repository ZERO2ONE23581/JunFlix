import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar } from '../../Tools/Avatar';
import { ITheme } from '../../../styles/theme';
import { Flex, FlexCol, Modal } from '../../../styles/global';
import { TheComment, useComments } from '../../libs/client/useComment';
import { useCapLetter } from '../../libs/client/useTools';
import { Svg } from '../../Tools/Svg';
import { CreateModal } from './Create/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Reply } from './Reply';
import { cmtModalVar, UpdateModal } from './Update/Modal';
import { hoverBgColor } from '../../../styles/variants';
import { OverlayBg } from '../../Tools/overlay';
import { DeleteModal } from './Delete/Modal';

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
  const [option, setOption] = useState(false);
  const [modal, setModal] = useState('');
  const { replies } = useComments({ post_id, host_id, cmt_id: comment.id });
  const clickEllips = () => {
    setOption(true);
    setSelect(comment.id);
  };
  const clickEdit = () => {
    setOption(false);
    setSelect(comment.id);
    setModal('update');
  };
  const closeModal = () => {
    setSelect(0);
    setModal('');
    setOption(false);
  };
  const clickDelete = () => {
    setOption(false);
    setModal('delete');
    setSelect(comment.id);
  };
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
            <Svg
              theme={theme}
              type="ellipsis"
              onClick={clickEllips}
              item={{ size: '1.5rem' }}
            />
          </Btns>
          {replies?.map((reply) => (
            <Array key={reply.id}>
              <Reply
                theme={theme}
                setPost={setPost}
                _data={{
                  replied_to: comment.host.userId,
                  post_id,
                  host_id,
                  reply,
                  og_id: comment.id,
                }}
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
          closeModal,
          modal: !option && Boolean(select === comment.id) && !modal,
        }}
      />
      <AnimatePresence>
        {option && Boolean(select === comment.id) && (
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
      <DeleteModal
        theme={theme}
        setPost={setPost}
        key={comment.id * 44}
        _data={{
          post_id,
          closeModal,
          cmt_id: comment.id,
          modal:
            !option && Boolean(select === comment.id) && modal === 'delete',
        }}
      />
      <UpdateModal
        theme={theme}
        setPost={setPost}
        key={comment.id * 33}
        _data={{
          post_id,
          closeModal,
          og_cmt: comment,
          modal:
            !option && Boolean(select === comment.id) && modal === 'update',
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
