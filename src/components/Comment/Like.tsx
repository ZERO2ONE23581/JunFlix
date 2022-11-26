import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { useRouter } from 'next/router';
import { ITheme } from '../../../styles/theme';
import { Dispatch, SetStateAction } from 'react';
import { useUser } from '../../libs/client/useUser';
import { useCmtLike } from '../../libs/client/useLike';
import useMutation from '../../libs/client/useMutation';
import useSWR from 'swr';
import { IRes } from '../../types/global';
import { color } from '../../../styles/variants';

interface ILike extends ITheme {
  _data: {
    select: number;
    isLiked: boolean;
    comment_id: number;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
  };
}
export const Like = ({ theme, _data }: ILike) => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const { isLiked, select, comment_id, setModal, setSelect } = _data;
  //GET
  const { data, mutate } = useSWR<IRes>(
    Boolean(select) && ` /api/like/comment/${select}`
  );
  const [post, { data: data_, loading }] = useMutation(
    '/api/like/comment/create'
  );
  const num = data?.num;

  const clickLike = () => {
    setModal('like');
    setSelect(comment_id);
    const isLiked = data?.ok;
    if (comment_id) return alert('comment_id missed');
    if (!isLoggedIn) return router.push(`/login`);
    if (loading) return;
    post({ comment_id });

    const zero_minus = num === 0 ? 0 : num - 1;
    return mutate(
      {
        ...data,
        ok: !isLiked,
        num: isLiked ? (num === 0 ? 0 : num - 1) : num + 1,
      },
      false
    );
  };
  const fill = isLiked || data?.ok ? '#d63031' : color(theme);
  return (
    <Cont>
      <Svg
        type="like"
        theme={theme}
        onClick={clickLike}
        item={{ fill, size: '1.5rem' }}
      />
      <span className="num">{num}</span>
    </Cont>
  );
};
const Cont = styled.div`
  position: relative;
  .num {
    top: 0;
    right: -1rem;
    font-size: 2rem;
    position: absolute;
    color: blue;
  }
`;
