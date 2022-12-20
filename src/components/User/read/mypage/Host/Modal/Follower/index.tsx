import { IsMe } from './IsMe';
import { Layer } from './Layer';
import { FollowArr } from './Array';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Follower, Following } from '@prisma/client';
import { Flex } from '../../../../../../../../styles/global';
import { OverlayBg } from '../../../../../../../Tools/Overlay';
import { PostModal } from '../../../../../../../../styles/post';
import { scaleVar } from '../../../../../../../../styles/variants';
import { useUser } from '../../../../../../../libs/client/useUser';

interface IFollowModal {
  _data: {
    theme: boolean;
    layoutId: string;
    closeModal: () => void;
  };
  _follow: {
    type: string;
    Follower: Follower[];
    Following: Following[];
  };
}
export const FollowModal = ({ _data, _follow }: IFollowModal) => {
  const { user_id } = useUser();
  const { theme, layoutId, closeModal } = _data;
  const { Follower, Following, type } = _follow;
  const isFollower = Boolean(type === 'follower');
  const array = isFollower ? Follower : Following.filter((el) => !el.board_id);
  const Filtered = isFollower
    ? array.filter((e) => e.host_id !== user_id)
    : array;
  const follower = array.find((el) => el.host_id === user_id)!;
  return (
    <>
      <AnimatePresence>
        {type && (
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            layoutId={layoutId}
            variants={scaleVar}
            custom={{ theme, duration: 0.5 }}
          >
            <Layer _data={{ theme, closeModal, isFollower }} />
            <IsMe _data={{ isFollower, theme, follower, closeModal }} />
            <FollowArr
              _data={{ theme, isFollower, closeModal, Filtered, array }}
            />
          </Cont>
        )}
      </AnimatePresence>
      {type && <OverlayBg closeModal={closeModal} />}
    </>
  );
};
const Cont = styled(PostModal)`
  min-width: 400px;
  min-height: 400px;
  width: fit-content;
  height: fit-content;
  h1 {
    font-size: 1.5rem;
  }
`;

export const Array = styled(Flex)`
  gap: 1rem;
  padding: 0.6rem 1.2rem;
  justify-content: space-between;
  //border: 2px solid red;
  > .wrap {
    gap: 1rem;
    width: fit-content;
    justify-content: flex-start;
  }
  button {
    width: fit-content;
  }
`;
