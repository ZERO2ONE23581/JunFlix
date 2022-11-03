import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { LinkModal } from './Modal/Link';
import { SetGridModal } from './Modal/Size';
import { Svg } from '../../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { OrganizePosts } from './Modal/Organize';
import { useUser } from '../../../../../libs/client/useUser';
import { Answer } from '../../../../../Tools/Modal/answer_modal';

interface IIcon {
  _data: {
    svg: string;
    modal: boolean;
    theme: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    setMax?: Dispatch<SetStateAction<number>>;
  };
}
export const Icon = ({ _data }: IIcon) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { isLoggedIn } = useUser();
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const { setModal, setMax, modal, theme, svg } = _data;
  const __data = { theme, modal, closeModal };
  const _grid = { ...__data, setMax: setMax! };
  const hideOrg = Boolean(svg === 'posts' && !user_id) || !isLoggedIn;
  return (
    <>
      {!hideOrg && (
        <Cont>
          {<Svg theme={theme} type={svg} onClick={openModal} />}
          {svg === 'compass' && <LinkModal _data={{ ...__data }} />}
          {svg === 'posts' && <OrganizePosts _data={{ ...__data }} />}
          {svg === 'grid' && <SetGridModal _data={{ ..._grid }} />}
          {svg === 'question' && (
            <Answer
              _data={{ theme, answer: modal, type: 'post', closeModal }}
            />
          )}
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  position: relative;
  .org_modal,
  .grid_modal,
  .link_modal {
    left: 50%;
    top: 2.5rem;
    transform: translateX(-50%);
    ul {
      width: 100%;
      li {
        width: 100%;
      }
    }
  }
  .grid_modal {
    left: -70%;
    min-width: 10rem;
  }
  .link_modal {
    min-width: 13rem;
  }
  svg {
    cursor: pointer;
  }
`;
