import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../../../../Tools/OverlayBg';
import { List } from '../../../../../User/Read/MyPage/List';
import { MiniModal } from '../../../../../../../styles/global';
import { useUser } from '../../../../../../libs/client/useUser';
import { smallModalVar } from '../../../../../Board/Read/Board/Title/Setting';

interface ILinkModal {
  _data: {
    modal: string;
    theme: boolean;
    closeModal: () => void;
  };
}
export const LinkModal = ({ _data }: ILinkModal) => {
  const router = useRouter();
  const theme = _data?.theme!;
  const modal = _data?.modal!;
  const { isLoggedIn, user_id } = useUser();
  return (
    <AnimatePresence>
      {modal === 'compass' && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            className="link_modal"
            variants={smallModalVar}
          >
            <ul>
              <li className="small">Options</li>
              <List
                _data={{
                  theme,
                  onClick: () => router.push('/all/posts'),
                  name: { eng: 'All Posts', kor: '모든 포스트' },
                }}
              />
              {isLoggedIn && (
                <List
                  _data={{
                    theme,
                    name: { eng: 'My Posts', kor: '나의 포스트' },
                    onClick: () => router.push(`/user/${user_id}/posts`),
                  }}
                />
              )}
              <List
                _data={{
                  theme,
                  onClick: () => router.push('/all/boards'),
                  name: { eng: 'All Boards', kor: '모든 보드' },
                }}
              />
              {isLoggedIn && (
                <List
                  _data={{
                    theme,
                    name: { eng: 'My Boards', kor: '나의 보드' },
                    onClick: () => router.push(`/user/${user_id}/boards`),
                  }}
                />
              )}
            </ul>
          </Cont>
          <OverlayBg closeModal={_data.closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MiniModal)``;
