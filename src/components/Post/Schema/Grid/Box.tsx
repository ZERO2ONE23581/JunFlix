import {
  IsBlur,
  UseCapLetters,
  useResponsive,
} from '../../../../libs/client/useTools';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { IPostType } from '../../../../types/post';
import { avatarLink } from '../../../../Tools/Avatar';
import { Blur, PostCover } from '../../../../../styles/global';
import { TweenTrans, color } from '../../../../../styles/variants';

interface IPostBox {
  _data: {
    theme: boolean;
    post: IPostType;
    onClick: (id: number) => void;
  };
}
export const Box = ({ _data }: IPostBox) => {
  const router = useRouter();
  const { theme, onClick, post } = _data;
  const post_id = post?.id!;
  const host_id = post?.host_id!;
  const board_id = post?.board_id!;
  const hostId = post?.host?.userId!;
  const board_title = post?.board?.title!;
  const Image = avatarLink(post?.post_image)!;

  const Title = (text: string) => {
    const length = text.length;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const isKor = korean.test(post?.title);
    if (isKor && length > 15) return UseCapLetters(text.slice(0, 15)) + '...';
    else if (length <= 24) return UseCapLetters(text);
    else return UseCapLetters(text.slice(0, 24)) + '...';
  };
  const msg = IsBlur({ host_id, board_id })?.msg!;
  const isBlur = IsBlur({ host_id, board_id })?.isBlur!;

  const onSvg = () => {
    const type = msg!;
    if (type === 'my_post') return;
    if (type === 'blur_user')
      return router.push(`/user/${host_id}/${hostId}/page`);
    if (type === 'blur_board')
      return router.push(`/board/${board_id}/${board_title}`);
  };
  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk}>
      {isBlur && isDesk && <Svg onClick={onSvg} theme={theme} type="lock" />}
      <Blur isBlur={isBlur!}>
        {Image && (
          <Cover
            exit="exit"
            key={post_id}
            custom={theme}
            variants={vars}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="post_cover"
            transition={TweenTrans}
            layoutId={post_id + ''}
            onClick={() => onClick(post_id)}
          >
            <img alt="박스커버이미지" src={Image} />
            <h2>{Title(post?.title)}</h2>
          </Cover>
        )}
      </Blur>
    </Cont>
  );
};
const Cont = styled.article<{ isDesk: boolean }>`
  position: relative;
  h2 {
    font-size: ${(p) => (p.isDesk ? '1.4rem' : '3rem')};
  }
  .lock {
    top: 50%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
const Cover = styled(PostCover)``;
const vars = {
  exit: () => ({ opacity: 0 }),
  initial: () => ({ opacity: 0 }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.3 },
  }),
  hover: () => ({
    scale: 1.15,
    color: '#E50914',
    transition: { duration: 0.3, delay: 0.3 },
  }),
};
