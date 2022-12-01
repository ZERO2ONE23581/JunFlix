import { Btns } from './Btns';
import { Comments } from '..';
import { UserDate } from './Date';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Setting } from '../../Modal/Setting';
import { Avatar } from '../../../../Tools/Avatar';
import { useUser } from '../../../../libs/client/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { Flex, FlexCol } from '../../../../../styles/global';
import { useTimeDiff } from '../../../../libs/client/useTime';
import { TheComment, useGetRepHost } from '../../../../libs/client/useComment';
import { AnimatePresence } from 'framer-motion';

export interface IClickSvg {
  type: string;
  comment: TheComment;
}
interface IComment {
  _data: {
    theme: boolean;
    comment: TheComment;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Comment = ({ _data }: IComment) => {
  const router = useRouter();
  const { isLoggedIn, user_id } = useUser();
  const { theme, comment, setPost, setCmtModal } = _data;
  const { post_id, reply_id, createdAt, updatedAt } = comment;

  const [modal, setModal] = useState('');
  const [select, setSelect] = useState(0);
  const [option, setOption] = useState(false);
  const { isUpdated } = useTimeDiff({ createdAt, updatedAt });
  const { replied_to } = useGetRepHost({ post_id, reply_id });
  const avatar_size = replied_to ? '3.2rem' : '3.5rem';

  const clickSvg = ({ type, comment }: IClickSvg) => {
    if (!isLoggedIn) return router.push(`/login`);
    const isMyComment = Boolean(comment.host_id === user_id);
    //
    setSelect(comment.id);
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
  return (
    <>
      <AnimatePresence>
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          variants={cmtVar}
          key={comment.id}
        >
          <Avatar
            _data={{ theme, host_id: comment.host_id, size: avatar_size }}
          />
          <Content>
            <UserDate
              _data={{ userId: comment.host.userId, createdAt, updatedAt }}
            />
            <p>
              {replied_to && <span className="replied_to">@{replied_to}</span>}
              {isUpdated && <span className="update">{isUpdated}</span>}
              <span>{comment.text}</span>
            </p>
            <Btns _data={{ theme, comment, setModal, setSelect, clickSvg }} />
          </Content>
        </Cont>
      </AnimatePresence>

      <Setting
        key={comment.id}
        _modal={{ modal, select, option }}
        _data={{ theme, clickSvg, comment }}
        _setState={{ setPost, setModal, setSelect, setOption, setCmtModal }}
      />
      <Comments
        _data={{ theme, setPost, post_id, og_id: comment.id, setCmtModal }}
      />
    </>
  );
};

const cmtVar = {
  exit: () => ({ opacity: 0, scale: 0 }),
  initial: () => ({ opacity: 0, scale: 0 }),
  animate: () => ({ scale: 1, opacity: 1, transition: { duration: 0.3 } }),
};

const Cont = styled(Flex)`
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Content = styled(FlexCol)`
  width: fit-content;
  align-items: flex-start;
  p {
    .update {
      opacity: 0.9;
      font-size: 1rem;
      margin-right: 0.5rem;
      color: ${(p) => p.theme.color.logo};
    }
    .replied_to {
      color: #74b9ff;
      font-size: 1rem;
      font-weight: 500;
      font-style: italic;
      margin-right: 0.5rem;
    }
  }
`;
