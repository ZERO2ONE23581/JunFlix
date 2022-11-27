import { Btns } from './Btns';
import { IClickSvg } from '..';
import { Replies } from './Replies';
import styled from '@emotion/styled';
import { Avatar } from '../../../../Tools/Avatar';
import { Dispatch, SetStateAction } from 'react';
import { Flex, FlexCol } from '../../../../../styles/global';
import { TheComment } from '../../../../libs/client/useComment';
import { useCapLetter } from '../../../../libs/client/useTools';

interface IComment {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    comment: TheComment;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
  _modal: {
    modal: string;
    select: number;
    option: boolean;
  };
  _setState: {
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setOption: Dispatch<SetStateAction<boolean>>;
    setSelect: Dispatch<SetStateAction<number>>;
  };
}
export const Comment = ({ _data, _setState, _modal }: IComment) => {
  const { modal, select, option } = _modal;
  const { theme, comment, post_id, host_id, clickSvg } = _data;
  const { setPost, setModal, setSelect, setOption } = _setState;
  return (
    <Cont key={comment.id}>
      <div className="id">{comment.id}</div>
      <Avatar _data={{ theme, host_id: comment.host_id, size: '3.5rem' }} />
      <Content>
        <span className="userId">{useCapLetter(comment?.host?.userId)}</span>
        <p>{comment.text}</p>
        <Btns _data={{ theme, comment, setModal, setSelect, clickSvg }} />
        <Replies
          _modal={{ modal, select, option }}
          _data={{ theme, post_id, host_id, comment, clickSvg }}
          _setState={{ setPost, setModal, setOption, setSelect }}
        />
      </Content>
    </Cont>
  );
};

const Cont = styled(Flex)`
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
