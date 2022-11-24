import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../../../Tools/Svg';
import { IGetPostType } from '../../../../../../types/post';
import { MsgModal } from '../../../../../../Tools/msg_modal';
import { useLike } from '../../../../../../libs/client/useLike';
import { Flex, FlexCol } from '../../../../../../../styles/global';

interface IIcons extends IGetPostType {
  theme: boolean;
}
export const Icons = ({ theme, post }: IIcons) => {
  const router = useRouter();
  const { board_id, id: post_id, board, _count } = post;
  const onBoard = () => router.push(`/board/${board_id}/${board.title}`);
  const { msg, fill, createLike, num } = useLike({ post_id, theme });
  const { likes: likes_num } = _count;
  const counts = num ? num : likes_num;
  return (
    <>
      <Cont className="icons">
        <Layer>
          <IconWrap className="icon_wrap">
            <Svg
              type="like"
              theme={theme}
              item={{ fill }}
              onClick={createLike}
            />
            <Svg type="comment" theme={theme} />
          </IconWrap>
          {Boolean(board_id) && (
            <Svg type="boards" theme={theme} onClick={onBoard} />
          )}
        </Layer>
        <LikeNum className="like_num">
          <span>{counts}</span>
          <span>{counts > 1 ? 'Likes' : 'Like'}</span>
        </LikeNum>
      </Cont>
      <MsgModal _data={{ msg, theme }} />
    </>
  );
};
const Cont = styled(FlexCol)`
  align-items: flex-start;
`;
const IconWrap = styled(Flex)`
  gap: 1.8rem;
  width: fit-content;
`;
const Layer = styled(Flex)`
  padding-left: 0.5rem;
  justify-content: space-between;
`;
const LikeNum = styled(Flex)`
  gap: 0.5rem;
  font-size: 1.5rem;
  width: fit-content;
  padding-top: 1rem;
  padding-left: 0.5rem;
`;