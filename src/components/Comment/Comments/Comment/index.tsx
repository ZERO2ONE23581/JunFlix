import { Btns } from './Btns';
import { IClickSvg } from '..';
import { UserDate } from './Date';
import { Replies } from './Replies';
import styled from '@emotion/styled';
import { Avatar } from '../../../../Tools/Avatar';
import { Dispatch, SetStateAction } from 'react';
import { Flex, FlexCol } from '../../../../../styles/global';
import { TheComment } from '../../../../libs/client/useComment';
import { useTimeDiff } from '../../../../libs/client/useTime';

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
  const { theme, comment, clickSvg } = _data;
  const { setModal, setSelect } = _setState;
  const userId = comment.host.userId;
  const _date = { created: comment.createdAt, updated: comment.updatedAt };
  const { isUpdated } = useTimeDiff({ _date });
  return (
    <Cont key={comment.id}>
      <Avatar _data={{ theme, host_id: comment.host_id, size: '3.5rem' }} />
      <Content>
        <UserDate _date={_date} userId={userId} />
        <p>
          {isUpdated && <span className="update">{isUpdated}</span>}
          <span>{comment.text}</span>
        </p>
        <Btns _data={{ theme, comment, setModal, setSelect, clickSvg }} />
        <Replies
          _modal={_modal}
          _setState={_setState}
          _data={{ ..._data, replied_to: userId }}
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
  width: fit-content;
  align-items: flex-start;
  p {
    .update {
      opacity: 0.9;
      font-size: 1rem;
      margin-right: 0.5rem;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
