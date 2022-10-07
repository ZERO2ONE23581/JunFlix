import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { HeadTitle } from '../../src/components/Head';
import { UserInfoBox } from '../../src/components/User/Create/userInfo_box';
import { UserIdBox } from '../../src/components/User/Create/userId_box';
import { UserAvatarBox } from '../../src/components/User/Create/userAvatar_box';

const Join: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [savedID, setSaveID] = useState('');
  const [next, setNext] = useState(false);
  const [secNext, setSecNext] = useState(false);
  const [createdId, setCreatedId] = useState(0);

  return (
    <>
      <HeadTitle title="회원가입" />
      <Cont>
        <UserIdBox
          theme={theme}
          isBox={!next}
          setNext={setNext}
          setSaveID={setSaveID}
        />
        <UserInfoBox
          theme={theme}
          savedID={savedID}
          setUserId={setNext}
          setSecNext={setSecNext}
          isBox={next && !secNext}
          setCreatedId={setCreatedId}
        />
        <UserAvatarBox theme={theme} createdId={createdId} isBox={secNext} />
      </Cont>
    </>
  );
};
export default Join;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  .err-modal {
    font-size: 2rem;
  }
`;
