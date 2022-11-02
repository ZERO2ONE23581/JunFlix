import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../../../../Tools/overlay';
import { List } from '../../../../../User/Read/MyPage/List';
import { ModalBtn } from '../../../../../../../styles/global';
import { useUser } from '../../../../../../libs/client/useUser';
import { smallModalVar } from '../../../../../Board/Read/Each/Title/Setting_Modal';

interface ILinkModal {
  _data: {
    theme: boolean;
    modal: boolean;
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
      {modal && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            variants={smallModalVar}
          >
            <ul>
              <li className="small">Posts page (포스트로 이동)</li>
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
                    onClick: () => router.push(`/user/${user_id}/posts`),
                    name: { eng: 'My Posts', kor: '나의 포스트' },
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
const Cont = styled(ModalBtn)`
  ul {
    li {
    }
  }
`;
