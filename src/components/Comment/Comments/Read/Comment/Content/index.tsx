import {
  TheComment,
  useGetRepHost,
} from '../../../../../../libs/client/useComment';
import { Btns } from '../../Btns';
import { UserDate } from './Date';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { TrimText } from '../../../../../../Tools/Trim';
import { FlexCol } from '../../../../../../../styles/global';
import { useTimeDiff } from '../../../../../../libs/client/useTools';

export interface IClickSvg {
  type: string;
  comment: TheComment;
}
interface IContent {
  _data: {
    theme: boolean;
    comment: TheComment;
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
}
export const Content = ({ _data }: IContent) => {
  const {
    theme,
    comment,
    setModal,
    setSelect,
    clickSvg,
    setPost,
    setCmtModal,
  } = _data;
  const { id: cmt_id, post_id, reply_id, createdAt, updatedAt } = comment;
  const { replied_to } = useGetRepHost({
    post_id,
    reply_id,
    cmt_id,
    setPost,
    setCmtModal,
  });
  const { isUpdated } = useTimeDiff({ createdAt, updatedAt });
  return (
    <Cont>
      <UserDate
        _data={{ userId: comment?.host?.userId!, createdAt, updatedAt }}
      />
      <p>
        {replied_to && <span className="replied_to">@{replied_to}</span>}
        {isUpdated && <span className="update">{isUpdated}</span>}
        <TrimText text={comment?.text!} max={200} />
      </p>
      <Btns _data={{ theme, comment, setModal, setSelect, clickSvg }} />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
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
