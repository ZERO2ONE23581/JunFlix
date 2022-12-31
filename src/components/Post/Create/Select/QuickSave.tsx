import { motion } from 'framer-motion';
import { ListWrap } from './MyBoards';
import { useGetQuickSaved } from '../../../../libs/client/usePosts';
import { selectVars } from '../../../../../styles/post';
import styled from '@emotion/styled';

interface IQuickSave {
  _data: {
    theme: boolean;
    host_id: number;
    clickQuick: () => void;
  };
}
export const QuickSave = ({ _data }: IQuickSave) => {
  const theme = _data?.theme!;
  const host_id = _data?.host_id!;
  const clickQuick = _data?.clickQuick!;
  const { counts } = useGetQuickSaved(host_id);
  return (
    <ListWrap
      custom={theme}
      animate="animate"
      whileHover="hover"
      className="quick_save"
      onClick={clickQuick}
      variants={selectVars}
    >
      <Li className="board_cover">
        <img src="/img/1.jpg" alt="board cover" />
      </Li>
      <Li className="board-title">
        <h2>Quick Save</h2>
        <span className="post-num">
          <span>{counts ? counts - 1 : 0}</span>
          <span>{counts < 1 ? 'post' : 'posts'}</span>
        </span>
      </Li>
    </ListWrap>
  );
};
const Li = styled.li`
  img {
    width: 3rem;
    height: 3rem;
  }
`;
