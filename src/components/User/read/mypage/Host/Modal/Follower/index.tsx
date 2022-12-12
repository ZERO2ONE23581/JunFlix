import { FollowBtn } from './Btn';
import styled from '@emotion/styled';
import { FollowUserId } from './userID';
import { AnimatePresence } from 'framer-motion';
import { Svg } from '../../../../../../../Tools/Svg';
import { Follower, Following } from '@prisma/client';
import { Avatar } from '../../../../../../../Tools/Avatar';
import { Flex } from '../../../../../../../../styles/global';
import { PostModal } from '../../../../../../../../styles/post';
import { scaleVar } from '../../../../../../../../styles/variants';
import { useUser } from '../../../../../../../libs/client/useUser';
import { OverlayBg } from '../../../../../../../Tools/overlay';

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
  const { Follower, Following, type } = _follow;
  const { theme, layoutId, closeModal } = _data;
  const isFollower = Boolean(type === 'follower');
  const array = isFollower ? Follower : Following.filter((el) => !el.board_id);
  const TITLE = isFollower ? 'Follower' : 'Following';
  const Filterd = isFollower
    ? array.filter((e) => e.host_id !== user_id)
    : array;
  const loggedUser = array.find((el) => el.host_id === user_id);
  const isMe = Boolean(loggedUser && isFollower);
  const isFollowBtn = (id: number) => !Boolean(id === user_id);
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
            <Layer>
              <div>
                <Svg type="close_" theme={theme} onClick={closeModal} />
              </div>
              <div>
                <h1>{TITLE}</h1>
              </div>
              <div className="null" />
            </Layer>

            {isMe && (
              <Array>
                {loggedUser && (
                  <Flex className="wrap">
                    <Avatar
                      _modal={{ closeModal, isModal: true }}
                      _data={{
                        theme,
                        size: '3.5rem',
                        host_id: loggedUser.host_id,
                      }}
                    />
                    <FollowUserId host_id={loggedUser.host_id} />
                  </Flex>
                )}
              </Array>
            )}

            {Filterd.map((el) => (
              <Array key={array.indexOf(el)}>
                <Flex className="wrap">
                  <Avatar
                    _modal={{ closeModal, isModal: true }}
                    _data={{
                      theme,
                      size: '3.5rem',
                      host_id: isFollower ? el.host_id : el.user_id!,
                    }}
                  />
                  <FollowUserId host_id={el.host_id} />
                </Flex>
                {isFollowBtn(el.user_id!) && (
                  <FollowBtn
                    theme={theme}
                    user_id={isFollower ? el.host_id : el.user_id!}
                  />
                )}
              </Array>
            ))}
          </Cont>
        )}
      </AnimatePresence>
      {type && <OverlayBg closeModal={closeModal} />}
    </>
  );
};
const Array = styled(Flex)`
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
const Layer = styled(Flex)`
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  .null {
    width: 2rem;
  }
`;
const Cont = styled(PostModal)`
  min-width: 400px;
  min-height: 400px;
  width: fit-content;
  height: fit-content;
  h1 {
    font-size: 1.5rem;
  }
`;
