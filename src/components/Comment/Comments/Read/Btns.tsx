import { IClickSvg } from './ReadCmt';
import { Like } from './Btns/Like';
import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../../styles/global';
import { useUser } from '../../../../libs/client/useUser';
import { TheComment } from '../../../../libs/client/useComment';

interface IBtns {
  _data: {
    theme: boolean;
    isDesk: boolean;
    comment: TheComment;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
}
export const Btns = ({ _data }: IBtns) => {
  const { user_id } = useUser();
  const { clickSvg, theme, setSelect, setModal, comment, isDesk } = _data;
  const isMyComment = Boolean(comment.host_id === user_id);
  const size = isDesk ? '1.5rem' : '3rem';
  return (
    <Cont>
      <Svg
        theme={theme}
        item={{ size }}
        type="comment_empty"
        onClick={() => clickSvg({ type: 'reply', comment })}
      />
      <Like _data={{ theme, comment, setModal, setSelect, isDesk }} />
      {isMyComment && (
        <Svg
          theme={theme}
          item={{ size }}
          type="ellipsis"
          onClick={() => clickSvg({ type: 'ellipsis', comment })}
        />
      )}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 2rem;
  margin: 0.5rem 0;
  width: fit-content;
  justify-content: flex-start;
`;
