import {
  TheComment,
  useGetRepHost,
} from '../../../../../libs/client/useComment';
import { Btns } from '../Btns';
import { UserDate } from './Content/Date';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { TrimText } from '../../../../../Tools/Trim';
import { FlexCol_ } from '../../../../../../styles/global';
import { useTimeDiff } from '../../../../../libs/client/useTools';

export interface IClickSvg {
  type: string;
  comment: TheComment;
}
export const Content = ({ _data, _set }: IContent) => {
  const { isDesk, theme, comment, clickSvg } = _data;
  const { setPost, setModal, setSelect, setCmtModal } = _set;
  const { id: cmt_id, post_id, reply_id, createdAt, updatedAt } = comment;
  const { replied_to } = useGetRepHost({
    cmt_id,
    setPost,
    post_id,
    reply_id,
    setCmtModal,
  });
  const userId = comment?.host?.userId!;
  const { isUpdated } = useTimeDiff({ createdAt, updatedAt });
  return (
    <Cont isDesk={isDesk}>
      <UserDate _data={{ userId, createdAt, updatedAt }} />
      <p>
        {replied_to && <span className="replied_to">@{replied_to}</span>}
        {isUpdated && <span className="update">{isUpdated}</span>}
        <TrimText text={comment?.text!} max={200} />
      </p>
      <Btns _data={{ theme, comment, setModal, setSelect, clickSvg, isDesk }} />
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  width: fit-content;
  align-items: flex-start;
  font-size: ${(p) => (p.isDesk ? '1rem' : '2.5rem')};
  .date {
    font-size: ${(p) => (p.isDesk ? '1rem' : '2.2rem')};
  }
  p {
    .update {
      opacity: 0.9;
      font-size: 1rem;
      margin-right: 0.5rem;
      color: ${(p) => p.theme.color.logo};
      font-size: ${(p) => (p.isDesk ? '1rem' : '4.2rem')};
    }
    .replied_to {
      color: #74b9ff;
      font-weight: 500;
      font-style: italic;
      margin-right: 0.5rem;
      font-size: ${(p) => (p.isDesk ? '1rem' : '2.2rem')};
    }
  }
`;
interface IContent {
  _data: {
    theme: boolean;
    isDesk: boolean;
    comment: TheComment;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
  _set: {
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
