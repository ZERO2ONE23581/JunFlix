import useSWR from 'swr';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Svg } from '../../../../../Tools/Svg';
import { IRes } from '../../../../../types/global';
import { Dispatch, SetStateAction } from 'react';
import { color } from '../../../../../../styles/variants';
import { useUser } from '../../../../../libs/client/useUser';
import useMutation from '../../../../../libs/client/useMutation';
import { TheComment } from '../../../../../libs/client/useComment';

interface ILike {
  _data: {
    theme: boolean;
    comment: TheComment;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
  };
}
export const Like = ({ _data }: ILike) => {
  const { theme, comment, setModal, setSelect } = _data;
  const [post, { data, loading }] = useMutation('/api/like/comment/create');
  const { data: getData, mutate } = useSWR<IRes>(
    Boolean(comment.id) && ` /api/like/comment/${comment.id}`
  );
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const num = getData?.num;
  const isLiked = getData?.isLiked;
  const count = num === 0 ? '' : num;
  const clickLike = () => {
    if (loading) return;
    if (!isLoggedIn) return router.push(`/login`);
    setModal('like');
    setSelect(comment.id);
    mutate(
      {
        ...data,
        isLiked: !isLiked,
        num: isLiked ? num - 1 : num + 1,
      },
      false
    );
    return post({ comment_id: comment.id });
  };
  const fill = isLiked ? '#E50914' : color(theme);
  return (
    <Cont>
      <Svg
        type="like"
        theme={theme}
        onClick={clickLike}
        item={{ fill, size: '1.5rem' }}
      />
      <span className="number">{count}</span>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  width: 1.8rem;
  position: relative;
  .number {
    top: -0.4rem;
    right: -0.4rem;
    right: -10px;
    right: -0.5rem;
    font-weight: 700;
    font-size: 0.9rem;
    position: absolute;
    color: ${(p) => p.theme.color.logo};
  }
`;
