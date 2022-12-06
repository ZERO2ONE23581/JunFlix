import styled from '@emotion/styled';
import { avatarLink } from '../../../../Tools/Avatar';
import { FlexCol } from '../../../../../styles/global';
import { useCapLetters } from '../../../../libs/client/useTools';
import { TweenTrans, color } from '../../../../../styles/variants';

interface IPostBox {
  _data: {
    title: string;
    theme: boolean;
    post_id: number;
    image: string | null;
    onClick: (id: number) => void;
  };
}
export const Box = ({ _data }: IPostBox) => {
  const { title, image, theme, post_id, onClick } = _data;
  const Title = (text: string) => {
    const length = text.length;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const isKor = korean.test(title);
    if (isKor && length > 15) return useCapLetters(text.slice(0, 15)) + '...';
    else if (length <= 24) return useCapLetters(text);
    else return useCapLetters(text.slice(0, 24)) + '...';
  };
  return (
    <>
      {avatarLink(image) && (
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
          <img alt="박스커버이미지" src={avatarLink(image)} />
          <h2>{Title(title)}</h2>
        </PostBox__>
      )}
    </>
  );
};
export const PostBox__ = styled(FlexCol)`
  gap: 10px;
  margin: 0 auto;
  cursor: pointer;
  overflow: hidden;
  align-items: center;
  justify-content: flex-start;
  position: static;
  img {
    border: none;
    display: block;
    border-radius: 20px;
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
