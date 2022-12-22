import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { IPostType } from '../../../../types/post';
import { avatarLink } from '../../../../Tools/Avatar';
import { Blur, FlexCol } from '../../../../../styles/global';
import { TweenTrans, color } from '../../../../../styles/variants';
import { IsBlur, useCapLetters } from '../../../../libs/client/useTools';

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
    if (isKor && length > 15) return useCapLetters(text.slice(0, 15)) + '...';
    else if (length <= 24) return useCapLetters(text);
    else return useCapLetters(text.slice(0, 24)) + '...';
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
  return (
    <Cont>
      {isBlur && <Svg onClick={onSvg} theme={theme} type="lock" />}
      <Blur isBlur={isBlur!}>
        {Image && (
          <PostBox__
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="grid_box"
            key={post_id}
            custom={theme}
            variants={vars}
            transition={TweenTrans}
            layoutId={post_id + ''}
            onClick={() => onClick(post_id)}
          >
            <img alt="박스커버이미지" src={Image} />
            <h2>{Title(post?.title)}</h2>
          </PostBox__>
        )}
      </Blur>
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  .lock {
    top: 50%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
export const PostBox__ = styled(FlexCol)`
  gap: 10px;
  margin: 0 auto;
  cursor: pointer;
  overflow: hidden;
  align-items: center;
  height: fit-content;
  img {
    width: 100%;
    max-height: 600px;
    height: fit-content;
    border-radius: 0.5rem;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
  h2 {
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
  }
`;
const vars = {
  initial: (theme: boolean) => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.3 },
  }),
  exit: () => ({
    opacity: 0,
  }),
  hover: () => ({
    scale: 1.15,
    color: '#E50914',
    transition: { duration: 0.3, delay: 0.3 },
  }),
};
