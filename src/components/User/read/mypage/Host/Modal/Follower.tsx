import styled from '@emotion/styled';
import { Follower } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import { Flex, FlexCol, Modal } from '../../../../../../../styles/global';
import { PostModal } from '../../../../../../../styles/post';
import { scaleVar, variants } from '../../../../../../../styles/variants';
import { useCapLetter } from '../../../../../../libs/client/useTools';
import { useGetUser } from '../../../../../../libs/client/useUser';
import { Avatar } from '../../../../../../Tools/Avatar';
import { Svg } from '../../../../../../Tools/Svg';

interface IFollowerModal {
  _data: {
    open: boolean;
    theme: boolean;
    layoutId: string;
    follower: Follower[];
    closeModal: (type: string) => void;
  };
}

export const FollowerModal = ({ _data }: IFollowerModal) => {
  const { theme, open, follower: array, layoutId, closeModal } = _data;

  return (
    <AnimatePresence>
      {open && (
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
              <Svg
                type="close_"
                theme={theme}
                onClick={() => closeModal('follower')}
              />
            </div>
            <div>
              <h1>Followers</h1>
            </div>
            <div></div>
          </Layer>
          <Arr>
            {array.map((el) => (
              <Follower key={array.indexOf(el)}>
                <Avatar _data={{ theme, size: '4rem', host_id: el.host_id }} />
                <ul>
                  <li>{useCapLetter(useGetUser(el.host_id).userId)}</li>
                </ul>
              </Follower>
            ))}
          </Arr>
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Follower = styled(Flex)`
  border: 2px solid red;
  justify-content: flex-start;
`;
const Arr = styled(FlexCol)``;
const Layer = styled(Flex)`
  padding: 0.5rem 1rem;
  justify-content: space-between;
  > div {
    //border: 2px solid yellow;
  }
`;
const Cont = styled(PostModal)`
  border: 2px solid red;
  h1 {
    font-size: 2rem;
  }
`;
