import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { List } from '../../../../../User/Read/MyPage/List';
import { OverlayBg } from '../../../../../../Tools/OverlayBg';
import { MiniModal, Mob } from '../../../../../../../styles/global';
import { useUser } from '../../../../../../libs/client/useUser';
import { fromTopVar } from '../../../../../../../styles/variants';
import { useResponsive } from '../../../../../../libs/client/useTools';
import { Svg } from '../../../../../../Tools/Svg';

interface ILinkModal {
  _data: {
    modal: string;
    theme: boolean;
    closeModal: () => void;
  };
}
export const LinkModal = ({ _data }: ILinkModal) => {
  const router = useRouter();
  const { theme, modal } = _data;
  const { isDesk } = useResponsive();
  const size = isDesk ? '2rem' : '4rem';
  const { isLoggedIn, user_id } = useUser();
  return (
    <AnimatePresence>
      {modal === 'compass' && (
        <Cont isDesk={isDesk}>
          <MiniModal
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            variants={fromTopVar}
            className="link_modal"
          >
            <ul>
              <li className="small">Options</li>
              <List
                _data={{
                  theme,
                  svg: 'posts',
                  onClick: () => router.push('/post/all'),
                  name: { eng: 'All Posts', kor: '모든 포스트' },
                }}
              />
              {isLoggedIn && (
                <List
                  _data={{
                    theme,
                    svg: 'posts',
                    name: { eng: 'My Posts', kor: '나의 포스트' },
                    onClick: () => router.push(`/user/${user_id}/posts`),
                  }}
                />
              )}
              <List
                _data={{
                  theme,
                  svg: 'posts',
                  onClick: () => router.push('/board/all'),
                  name: { eng: 'All Boards', kor: '모든 보드' },
                }}
              />
              {isLoggedIn && (
                <List
                  _data={{
                    theme,
                    svg: 'posts',
                    name: { eng: 'My Boards', kor: '나의 보드' },
                    onClick: () => router.push(`/user/${user_id}/boards`),
                  }}
                />
              )}
            </ul>
          </MiniModal>
          <OverlayBg closeModal={_data.closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  .link_modal {
    top: 2rem;
    right: -10rem;
    min-width: ${(p) => (p.isDesk ? '300px' : '500px')};
    font-size: ${(p) => (p.isDesk ? '1.6rem' : '3rem')};
    .list {
      padding: ${(p) => (p.isDesk ? '0.5rem' : '0.8rem')};
      min-width: ${(p) => (p.isDesk ? '300px' : '440px')};
    }
    .kor {
      font-size: ${(p) => (p.isDesk ? '2rem' : '2.5rem')};
    }
    .small {
      font-size: ${(p) => (p.isDesk ? '1rem' : '2rem')};
    }
  }
`;
