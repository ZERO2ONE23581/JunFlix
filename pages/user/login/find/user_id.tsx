import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { ModalClose, Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { LinkWrap } from '../../../../src/components/Style/Button/Link';
import { VerifyTokenForm } from '../../../../src/components/User/Login/Verify/TokenForm';
import { VerifyEmailForm } from '../../../../src/components/User/Login/Verify/EmailForm';
import { FindUserInfoModal } from '../../../../src/components/User/Login/Find/UserInfoModal';

const FindUserId: NextPage = () => {
  const [foundUserID, setFoundUserID] = useState('');
  const [openTokenForm, setOpenTokenForm] = useState(false);
  const [isTokenConfirm, setIsTokenConfirm] = useState(false);
  return (
    <>
      <Title title="아이디 찾기" />
      <Cont>
        <Wrapper>
          {!openTokenForm && (
            <VerifyEmailForm setOpenTokenForm={setOpenTokenForm} />
          )}
          {openTokenForm && (
            <VerifyTokenForm
              setFoundUserID={setFoundUserID}
              setIsTokenConfirm={setIsTokenConfirm}
            />
          )}
          <LinkWrap isLogin />
        </Wrapper>
      </Cont>
      {isTokenConfirm && (
        <>
          <ModalClose />
          <FindUserInfoModal isUserID foundUserID={foundUserID} />
        </>
      )}
    </>
  );
};
export default FindUserId;

const Cont = styled(Page)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.article`
  margin: 0 auto;
  max-width: 620px;
`;
