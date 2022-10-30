import { motion } from 'framer-motion';
import { ListWrap } from './BoardsList';
import { useGetQsaved } from '../../../../libs/client/usePosts';
import { select_board_ul_var } from '../../../../../styles/post';

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
  const post_counts = Number(useGetQsaved(host_id)) - 1;
  const counts = post_counts < 0 ? 0 : post_counts;
  return (
    <ListWrap
      custom={theme}
      animate="animate"
      whileHover="hover"
      className="quick_save"
      onClick={clickQuick}
      variants={select_board_ul_var}
    >
      <motion.li className="board-cover">
        <img src="/img/home-bg-dn.jpg" alt="board cover" />
      </motion.li>
      <motion.li className="board-title">
        <h2>Quick Save</h2>
        <span className="post-num">
          <span>{counts ? counts : 0}</span>
          <span>{counts! > 1 ? 'posts' : 'post'}</span>
        </span>
      </motion.li>
    </ListWrap>
  );
};
