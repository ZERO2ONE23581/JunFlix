import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { ITheme } from '../styles/theme';
import { AnimatePresence } from 'framer-motion';
import { HeadTitle } from '../src/components/Head';
import { CreateUser } from '../src/components/User/Create';
import { CreateId } from '../src/components/User/Create/UserId';
import { CreateUserAvatar } from '../src/components/User/Create/avatar';

const Join: NextPage = ({ theme }: ITheme) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [createdId, setCreatedId] = useState(0);
  return (
    <>
      <HeadTitle title="회원가입" />
      <Cont>
        <AnimatePresence>
          {!second && (
            <CreateId
              theme={theme}
              setSaveId={setFirst}
              setSecond={setSecond}
            />
          )}
          {second && !third && (
            <CreateUser
              saveId={first}
              setUserId={setSecond}
              setAvatar={setThird}
              setCreatedId={setCreatedId}
            />
          )}
          {third && <CreateUserAvatar createdId={createdId} />}
        </AnimatePresence>
      </Cont>
    </>
  );
};
export default Join;

const Cont = styled(Page)`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    margin: 0 auto;
    font-size: 1.5em;
    width: fit-content;
    height: fit-content;
    gap: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5em 2em;
    border-radius: 5px;
    color: ${(p) => p.theme.color.font};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    background-color: ${(p) => p.theme.color.bg};
    border: 1px solid ${(p) => p.theme.color.font};
    h1 {
      span {
        display: block;
        :nth-of-type(1) {
          font-size: 1.3em;
          margin-bottom: 10px;
        }
        :nth-of-type(2) {
          font-size: 0.9em;
          font-style: italic;
        }
      }
      //border: 1px solid blue;
    }
    .userId {
      //padding: 20px;
    }
    .flex {
      gap: 12px;
      display: flex;
      align-items: center;
    }
  }
`;
