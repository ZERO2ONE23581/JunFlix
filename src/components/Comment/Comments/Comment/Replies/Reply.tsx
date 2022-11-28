import { Btns } from '../Btns';
import styled from '@emotion/styled';
import { IClickSvg } from '../..';
import { Avatar } from '../../../../../Tools/Avatar';
import { Dispatch, SetStateAction } from 'react';
import { Flex, FlexCol } from '../../../../../../styles/global';
import { useCapLetter } from '../../../../../libs/client/useTools';
import { TheComment } from '../../../../../libs/client/useComment';
import { UserDate } from '../Date';
import { useTimeDiff } from '../../../../../libs/client/useTime';

interface IReply {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    replied_to: string;
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
  const { replied_to, theme, comment: reply, clickSvg } = _data;
  const _date = { created: reply.createdAt, updated: reply.updatedAt };
  const { isUpdated } = useTimeDiff({ _date });
  return (
    <Cont key={reply.id}>
      <Avatar _data={{ theme, host_id: reply.host_id, size: '3.5rem' }} />
      <Content>
        <UserDate userId={reply?.host?.userId} _date={_date} />
        <p>
          <span className="replied_to">@{useCapLetter(replied_to)}</span>
          {isUpdated && <span className="update">{isUpdated}</span>}
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
`;
const Content = styled(FlexCol)`
  align-items: flex-start;
  width: fit-content;
  max-width: 80%;
  p {
    .update {
      opacity: 0.9;
      font-size: 1rem;
      margin-right: 0.5rem;
      color: ${(p) => p.theme.color.logo};
    }
    .replied_to {
      font-size: 1rem;
      font-weight: 500;
      font-style: italic;
      margin-right: 0.5rem;
      color: ${(p) => p.theme.color.logo};
      color: #74b9ff;
    }
  }
`;
