import styled from '@emotion/styled';
import { LinkModal } from './Modal/Link';
import { SetGridModal } from './Modal/Size';
import { CreatePost } from '../../../Create';
import { Svg } from '../../../../../Tools/Svg';
import { OrganizePosts } from './Modal/Organize';
import { Flex } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { Answer } from '../../../../../Tools/Modal/answer_modal';
import { useRouter } from 'next/router';

interface IPostsIcon {
  _data: {
    theme: boolean;
    setMax: Dispatch<SetStateAction<number>>;
  };
}
export const Icons = ({ _data }: IPostsIcon) => {
  const router = useRouter();
  const { theme, setMax } = _data;
  const closeModal = () => setModal('');
  const [modal, setModal] = useState('');
  const isBoardPage = Boolean(router.query.board_id);

  const item = { theme, modal, setModal, closeModal };
  const _grid = { ...item, svg: 'grid' };
  const _org = { ...item, svg: 'posts' };
  const _create = { ...item, svg: 'plus' };
  const _link = { ...item, svg: 'compass' };
  const _answer = { ...item, svg: 'question' };

  const icons = isBoardPage
    ? [_answer, _link, _org, _grid]
    : [_create, _answer, _link, _org, _grid];

  const openAnswer = Boolean(modal === 'question');
  const _answerModal = { theme, closeModal, answer: openAnswer, type: 'post' };
  return (
    <Cont className="icons">
      {icons.map((el) => (
        <Icon key={icons.indexOf(el)}>
          <Svg
            theme={theme}
            type={el.svg}
            onClick={() => el.setModal(el.svg)}
          />

          {el.svg === 'plus' && !isBoardPage && (
            <CreatePost
              theme={theme}
              closeModal={closeModal}
              open={Boolean(modal === 'plus')}
            />
          )}
          {el.svg === 'compass' && <LinkModal _data={{ ...item }} />}
          {el.svg === 'posts' && <OrganizePosts _data={{ ...item }} />}
          {el.svg === 'question' && <Answer _data={{ ..._answerModal }} />}
          {el.svg === 'grid' && <SetGridModal _data={{ ..._grid, setMax }} />}
        </Icon>
      ))}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 2rem;
  width: fit-content;
  height: fit-content;
`;
const Icon = styled.div`
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
