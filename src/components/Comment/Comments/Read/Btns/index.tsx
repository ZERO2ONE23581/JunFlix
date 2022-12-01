import { IClickSvg } from '..';
import { Like } from './Like';
import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../../../styles/global';
import { useUser } from '../../../../../libs/client/useUser';
import { TheComment } from '../../../../../libs/client/useComment';

interface IBtns {
  _data: {
    theme: boolean;
    comment: TheComment;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
}
export const Btns = ({ _data }: IBtns) => {
  const { user_id } = useUser();
  const { clickSvg, theme, setSelect, setModal, comment } = _data;
  const isMyComment = Boolean(comment.host_id === user_id);
  return (
    <Cont>
      <Svg
        theme={theme}
        type="comment_empty"
        item={{ size: '1.5rem' }}
        onClick={() => clickSvg({ type: 'reply', comment })}
      />
      <Like _data={{ theme, comment, setModal, setSelect }} />
      {isMyComment && (
        <Svg
          theme={theme}
          type="ellipsis"
          item={{ size: '1.5rem' }}
          onClick={() => clickSvg({ type: 'ellipsis', comment })}
        />
      )}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 0.8rem;
  margin: 0.5rem 0;
  width: fit-content;
  justify-content: flex-start;
`;
