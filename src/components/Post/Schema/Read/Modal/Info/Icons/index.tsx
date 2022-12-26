import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Svg } from '../../../../../../../Tools/Svg';
import { IPostType } from '../../../../../../../types/post';
import { MsgModal } from '../../../../../../../Tools/Modal/Message';
import { useLike } from '../../../../../../../libs/client/useLike';
import { Flex, FlexCol, Flex_ } from '../../../../../../../../styles/global';

interface IIcons {
  _data: {
    theme: boolean;
    isDesk: boolean;
    post: IPostType;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Icons = ({ _data }: IIcons) => {
  const { theme, post, setCmtModal, isDesk } = _data;
  const router = useRouter();
  const size = isDesk ? '2rem' : '4rem';
  const { board_id, id: post_id, board, _count } = post;
  const onBoard = () => router.push(`/board/${board_id}/${board.title}`);
  const { msg, fill, createLike, num } = useLike({ post_id, theme });
  const { likes: likes_num } = _count;
  const counts = num ? num : likes_num;
  const clickCmt = () => setCmtModal((p) => !p);
  return (
    <>
      <Cont className="icons">
        <Layer>
          <IconWrap className="icon_wrap">
            <Svg
              type="like"
              theme={theme}
              onClick={createLike}
              item={{ fill, size }}
            />
            <Svg
              type="comment"
              theme={theme}
              item={{ size }}
              onClick={clickCmt}
            />
          </IconWrap>
          {Boolean(board_id) && (
            <Svg
              type="boards"
              theme={theme}
              item={{ size }}
              onClick={onBoard}
            />
          )}
        </Layer>
        <LikeNum isDesk={isDesk}>
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
  gap: 3rem;
  width: fit-content;
`;
const Layer = styled(Flex)`
  padding-left: 0.5rem;
  justify-content: space-between;
`;
const LikeNum = styled(Flex_)`
  gap: 0.5rem;
  padding-top: 1rem;
  width: fit-content;
  padding-left: 0.5rem;
  font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.4rem')};
`;
