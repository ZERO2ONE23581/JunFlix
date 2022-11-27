import { Btns } from '../Btns';
import styled from '@emotion/styled';
import { IClickSvg } from '../..';
import { Avatar } from '../../../../../Tools/Avatar';
import { Dispatch, SetStateAction } from 'react';
import { Flex, FlexCol } from '../../../../../../styles/global';
import { useCapLetter } from '../../../../../libs/client/useTools';
import { TheComment } from '../../../../../libs/client/useComment';

interface IReply {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    comment: TheComment;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
  _setState: {
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
  };
}
export const Reply = ({ _data, _setState }: IReply) => {
  const { setModal, setSelect } = _setState;
  const { theme, comment: reply, clickSvg } = _data;
  return (
    <Cont key={reply.id}>
      <div className="id">{reply.id}</div>
      <Avatar _data={{ theme, host_id: reply.host_id, size: '3.5rem' }} />
      <Content>
        <span className="userId">{useCapLetter(reply?.host?.userId)}</span>
        <p>
          <span className="replied_to">
            @{useCapLetter(reply?.host?.userId)}
          </span>
          <span>{reply.text}</span>
        </p>
        <Btns
          _data={{ theme, comment: reply, setModal, setSelect, clickSvg }}
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
