import { IsMe } from './IsMe';
import { Layer } from './Layer';
import { Lists } from './Lists';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Follower, Following } from '@prisma/client';
import { PostSt } from '../../../../../../../../styles/post';
import { MobModal } from '../../../../../../../../styles/mobile';
import { OverlayBg } from '../../../../../../../Tools/OverlayBg';
import { mobVars } from '../../../../../../../../styles/variants';
import { useUser } from '../../../../../../../libs/client/useUser';
import { useResponsive } from '../../../../../../../libs/client/useTools';

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
  const { isDesk } = useResponsive();
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
          <Cont isDesk={isDesk}>
            <PostSt
              exit="exit"
              initial="initial"
              animate="animate"
              className="modal"
              layoutId={layoutId}
              variants={mobVars}
              custom={{ theme, duration: 0.5 }}
            >
              <Layer _data={{ theme, closeModal, isFollower }} />
              <IsMe _data={{ isFollower, theme, follower, closeModal }} />
              <Lists
                _data={{ array, theme, Filtered, closeModal, isFollower }}
              />
            </PostSt>
          </Cont>
        )}
      </AnimatePresence>
      {type && <OverlayBg closeModal={closeModal} />}
    </>
  );
};
const Cont = styled(MobModal)`
  .modal {
    gap: 2rem;
    padding: 2rem 3rem;
    width: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    height: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    .avatar {
      width: ${(p) => (p.isDesk ? '2rem' : '9rem')};
      height: ${(p) => (p.isDesk ? '2rem' : '9rem')};
    }
    .userId {
      width: fit-content;
      font-size: ${(p) => (p.isDesk ? '1.4rem' : '3rem')};
    }
    button {
      border-radius: 40px;
      width: ${(p) => (p.isDesk ? '100px' : '200px')};
      padding: ${(p) => (p.isDesk ? '0.5rem' : '1rem')};
      font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.5rem')};
    }
  }
`;
