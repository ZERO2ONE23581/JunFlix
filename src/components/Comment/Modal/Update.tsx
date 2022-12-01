import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Svg } from '../../../Tools/Svg';
import { IRes } from '../../../types/global';
import { Avatar } from '../../../Tools/Avatar';
import { useUser } from '../../../libs/client/useUser';
import { Flex, Form, Modal } from '../../../../styles/global';
import { OverlayBg } from '../../../Tools/overlay';
import { AnimatePresence } from 'framer-motion';
import { color } from '../../../../styles/variants';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import { useForm } from 'react-hook-form';
import { ICmtForm } from '../../../types/comments';
import useMutation from '../../../libs/client/useMutation';
import { useLength } from '../../../libs/client/useTools';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { TheComment } from '../../../libs/client/useComment';

interface IUpdateModal {
  _data: {
    theme: boolean;
    modal: boolean;
    comment: TheComment;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const UpdateModal = ({ _data }: IUpdateModal) => {
  const {
    setCmtModal,
    theme,
    modal,
    closeModal,
    comment: og_cmt,
    setPost,
  } = _data;
  const { post_id } = og_cmt;
  const [post, { loading, data }] = useMutation<IRes>(`/api/comment/update`);
  const { user_id: host_id } = useUser();
  const {
    watch,
    setValue,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<ICmtForm>({ mode: 'onSubmit' });

  useEffect(() => {
    if (og_cmt.text) setValue('text', og_cmt.text);
  }, [setValue, og_cmt]);

  const onValid = ({ text }: ICmtForm) => {
    if (loading) return;
    if (useLength(text) > 700)
      return setError('text', { message: 'overmax_comment' });
    setLoading(true);
    return post({ text, post_id, cmt_id: og_cmt.id });
  };

  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (data) {
      setLoading(false);
      setCmtModal(false);
      if (data.ok) {
        closeModal();
        setPost('');
        setTimeout(() => {
          setPost('read');
          setCmtModal(true);
        }, 500);
      }
    }
  }, [data, closeModal, setPost, setCmtModal]);
  return (
    <AnimatePresence>
      {Loading && <LoadingModal theme={theme} />}
      {modal && !Loading && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
            layoutId="option"
            custom={theme}
            variants={cmtModalVar}
          >
            <Form onSubmit={handleSubmit(onValid)}>
              <Layer>
                <div>
                  <Svg type="close_" theme={theme} onClick={closeModal} />
                </div>
                <div>
                  <h1>Edit Comment</h1>
                </div>
                <div>
                  <button type="submit">
                    <Svg type="reply" theme={theme} />
                  </button>
                </div>
              </Layer>

              <Inputs>
                <Avatar
                  _data={{ size: '4rem', isRound: true, theme, host_id }}
                />
                <TextAreaWrap
                  _data={{
                    theme,
                    min: 150,
                    max: 700,
                    id: 'text',
                    clearErrors,
                    text: watch('text'),
                    error: errors.text?.message,
                    placeholder: 'Leave comments on this post...',
                    register: register('text', { required: 'need_comment' }),
                  }}
                />
              </Inputs>
            </Form>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 33vh;
  width: 33vw;
  z-index: 100;
  color: inherit;
  min-width: 500px;
  height: fit-content;
  background-color: inherit;
  form {
    width: 100%;
    gap: 1.2rem;
    h1 {
      font-size: 1.5rem;
      .userId {
        color: #3498db;
        font-weight: 500;
      }
    }
  }
`;

const Layer = styled(Flex)`
  justify-content: space-between;
  button {
    background-color: inherit;
    border: none;
    outline: none;
  }
`;
const Inputs = styled(Flex)`
  gap: 1rem;
  width: 100%;
  padding-left: 0.2rem;
  align-items: flex-start;
  justify-content: flex-start;
  .textarea-wrap {
    min-width: 350px;
    width: fit-content;
  }
`;
export const cmtModalVar = {
  initial: (theme: boolean) => ({
    y: 999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    y: 0,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    y: 999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
};
