import { TheComment, useGetRepHost } from '../../../../libs/client/useComment';
import { Option } from './Comment/Option';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Content, IClickSvg } from './Comment/Content';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '../../../../Tools/Avatar';
import { Flex } from '../../../../../styles/global';
import { useUser } from '../../../../libs/client/useUser';
import { useResponsive } from '../../../../libs/client/useTools';

interface IComment {
  _data: {
    theme: boolean;
    isOption: boolean;
    comment: TheComment;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    setOption: Dispatch<SetStateAction<boolean>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Comment = ({ _data }: IComment) => {
  const {
    theme,
    comment,
    setModal,
    setSelect,
    setOption,
    closeModal,
    isOption: modal,
    setPost,
    setCmtModal,
  } = _data;
  const router = useRouter();
  const { isLoggedIn, user_id } = useUser();
  const { id: cmt_id, post_id, reply_id, host_id } = comment;
  const { replied_to } = useGetRepHost({
    post_id,
    reply_id,
    cmt_id,
    setPost,
    setCmtModal,
  });
  const clickSvg = ({ type }: IClickSvg) => {
    if (!isLoggedIn) return router.push(`/login`);
    const isMyComment = Boolean(host_id === user_id);
    setSelect(cmt_id);
    if (type === 'ellipsis' || type === 'edit' || type === 'delete') {
      if (!isMyComment) return alert('no my comment');
    }
    if (type === 'ellipsis') return setOption(true);
    else {
      setOption(false);
      if (type === 'reply') return setModal('reply');
      if (type === 'edit') return setModal('update');
      if (type === 'delete') return setModal('delete');
    }
  };
  const { isDesk } = useResponsive();
  const rep_size = isDesk ? '3.2rem' : '5.8rem';
  const cmt_size = isDesk ? '3.5rem' : '6rem';
  const size = replied_to ? rep_size : cmt_size;
  const __cmt = { theme, comment, clickSvg, isDesk };
  return (
    <>
      <Cont
        exit="exit"
        key={cmt_id}
        variants={cmtVar}
        initial="initial"
        animate="animate"
      >
        <Avatar _data={{ size, theme, host_id, isRound: true }} />
        <Content
          _data={{ theme, comment, clickSvg, isDesk }}
          _set={{ setPost, setModal, setSelect, setCmtModal }}
        />
      </Cont>
      <Option _data={{ ...__cmt, closeModal, modal }} />
    </>
  );
};
const Cont = styled(Flex)`
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const cmtVar = {
  exit: () => ({ opacity: 0, scale: 0 }),
  initial: () => ({ opacity: 0, scale: 0 }),
  animate: () => ({ scale: 1, opacity: 1, transition: { duration: 0.3 } }),
};
