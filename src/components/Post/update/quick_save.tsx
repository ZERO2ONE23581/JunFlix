import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';
import { avatarLink } from '../../../Tools/Avatar';
import { TweenTrans } from '../../../../styles/variants';
import { useGetAllPosts } from '../../../libs/client/usePosts';
import { Container, label_var, openSelectVar, Wrap } from './open_select_board';

interface IQuickSaved {
  theme: boolean;
  host_id: number;
  chosen_id: number;
  openModal: () => void;
}
export const QuickSaved = ({
  theme,
  host_id,
  chosen_id,
  openModal,
}: IQuickSaved) => {
  const counts = useGetAllPosts(host_id);
  return (
    <Container
      onClick={openModal}
      initial="initial"
      animate="animate"
      whileHover={'hover'}
      transition={TweenTrans}
      variants={openSelectVar}
      custom={{ theme, chosen: Boolean(chosen_id) }}
    >
      <motion.span
        custom={theme}
        animate="animate"
        variants={label_var}
        className="label-span"
      >
        Board
      </motion.span>
      <li className="cover">
        <img src={avatarLink('')} alt="board cover" />
      </li>
      <Wrap className="wrap">
        <span className="title">
          <span>Quick Saved</span>
          <span className="counts">
            <span>{counts ? counts : 0}</span>
            <span>{counts! > 1 ? 'posts' : 'post'}</span>
          </span>
        </span>
        <span>
          <Svg type="right-chev" theme={theme} />
        </span>
      </Wrap>
    </Container>
  );
};
