import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { LinkModal } from './Modal/Link';
import { SetGridModal } from './Modal/Size';
import { CreatePost } from '../../../Create';
import { Svg } from '../../../../../Tools/Svg';
import { OrganizePosts } from './Modal/Organize';
import { Flex } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '../../../../../libs/client/useUser';
import { Answer } from '../../../../../Tools/Modal/answer_modal';

interface IPostsIcon {
  _data: {
    theme: boolean;
    setMax: Dispatch<SetStateAction<number>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const Icons = ({ _data }: IPostsIcon) => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const [modal, setModal] = useState('');
  const { theme, setMax, setFixed } = _data;
  const isHome = Boolean(router.asPath === '/');
  const closeModal = () => {
    setModal('');
    setFixed(false);
  };

  const item = { theme, modal, setModal, closeModal };
  const _grid = { ...item, svg: 'grid' };
  const _org = { ...item, svg: 'posts' };
  const _create = { ...item, svg: 'plus' };
  const _link = { ...item, svg: 'compass' };
  const _answer = { ...item, svg: 'question' };
  const array = [_answer, _link, _org, _create, _grid];

  const createPost = Boolean(modal === 'plus');
  const openAnswer = Boolean(modal === 'question');
  const _answerModal = { theme, closeModal, answer: openAnswer, type: 'post' };

  const onClick = (type: string) => {
    const needLogin = !Boolean(type === 'question' || type === 'grid');
    if (!isLoggedIn && needLogin) return router.push(`/login`);
    return setModal(type);
  };
  return (
    <>
      {!isHome && (
        <Cont className="icons">
          {array.map((el) => (
            <Icon key={array.indexOf(el)}>
              <Svg
                type={el.svg}
                theme={theme}
                onClick={() => onClick(el.svg)}
              />
              {el.svg === 'plus' && (
                <CreatePost
                  _data={{ theme, createPost, closeModal, setFixed }}
                />
              )}
              {el.svg === 'compass' && <LinkModal _data={{ ...item }} />}
              {el.svg === 'posts' && (
                <OrganizePosts _data={{ ...item, setFixed }} />
              )}
              {el.svg === 'question' && <Answer _data={{ ..._answerModal }} />}
              {el.svg === 'grid' && (
                <SetGridModal _data={{ ..._grid, setMax }} />
              )}
            </Icon>
          ))}
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  gap: 2rem;
  margin: 1rem 0;
  width: fit-content;
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
