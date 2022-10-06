import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../styles/global';
import { AnimatePresence } from 'framer-motion';
import { HeadTitle } from '../src/components/Head';
import { CreateUser } from '../src/components/User/Create';
import { UserIdBox } from '../src/components/User/Create/UserId';
import { CreateUserAvatar } from '../src/components/User/Create/avatar';

const Join: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState(false);
  const [StepThree, setStepThree] = useState(false);
  const [createdId, setCreatedId] = useState(0);
  const StepOne = !second;
  const StepTwo = second && !StepThree;
  return (
    <>
      <HeadTitle title="회원가입" />
      <Cont>
        <AnimatePresence initial={false}>
          {StepOne && (
            <UserIdBox
              theme={theme}
              setSaveId={setFirst}
              setSecond={setSecond}
            />
          )}
          {StepTwo && (
            <CreateUser
              theme={theme}
              saveId={first}
              setUserId={setSecond}
              setAvatar={setStepThree}
              setCreatedId={setCreatedId}
            />
          )}
          {StepThree && (
            <CreateUserAvatar theme={theme} createdId={createdId} />
          )}
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
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    font-size: 1.8em;
    font-size: 2em;
    padding: 40px;
    border-radius: 5px;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    border: 1px solid ${(p) => p.theme.color.font};
    .box-title {
      h1,
      h2 {
        display: flex;
        align-items: center;
      }
      h1 {
        font-weight: 500;
        margin-bottom: 5px;
      }
      h2 {
        display: flex;
        font-size: 0.7em;
        padding-right: 5px;
        align-items: center;
        justify-content: space-between;
      }
    }
    .userId {
      //padding: 20px;
    }
    .is-member {
      font-size: 0.7em;
    }
  }
`;
