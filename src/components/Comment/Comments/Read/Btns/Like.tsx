import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Svg } from '../../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { IRes } from '../../../../../types/global';
import { color } from '../../../../../../styles/variants';
import { useUser } from '../../../../../libs/client/useUser';
import useMutation from '../../../../../libs/client/useMutation';
import { TheComment } from '../../../../../libs/client/useComment';
import { Flex_ } from '../../../../../../styles/global';

interface ILike {
  _data: {
    theme: boolean;
    isDesk: boolean;
    comment: TheComment;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
  };
}
export const Like = ({ _data }: ILike) => {
  const { theme, comment, setModal, setSelect, isDesk } = _data;
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
  const size = isDesk ? '1.5rem' : '3rem';
  const fill = isLiked ? '#E50914' : color(theme);
  return (
    <Cont>
      <Svg
        type="like"
        theme={theme}
        onClick={clickLike}
        item={{ fill, size }}
      />
      <Number isDesk={isDesk} className="num">
        {count}
      </Number>
    </Cont>
  );
};

const Cont = styled.div`
  width: 1.8rem;
  position: relative;
`;
const Number = styled(Flex_)`
  top: -0.4rem;
  font-weight: 700;
  font-size: 0.9rem;
  position: absolute;
  color: ${(p) => p.theme.color.logo};
  right: ${(p) => (p.isDesk ? '-0.5rem' : '-3rem')};
  font-size: ${(p) => (p.isDesk ? '1rem' : '2rem')};
`;
