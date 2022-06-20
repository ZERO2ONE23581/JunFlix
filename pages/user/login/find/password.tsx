import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { ModalClose, Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { LinkWrap } from '../../../../src/components/Style/Button/Link';
import { VerifyTokenForm } from '../../../../src/components/User/Login/Verify/TokenForm';
import { FindUserInfoModal } from '../../../../src/components/User/Login/Find/UserInfoModal';
import { VerifyPasswordForm } from '../../../../src/components/User/Login/Verify/PasswordForm';
import { CreateNewPasswordForm } from '../../../../src/components/User/Login/Verify/Create/NewPasswordForm';

const FindUserPassword: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [foundUserID, setFoundUserID] = useState('');
  const [openTokenForm, setOpenTokenForm] = useState(false);
  const [isTokenConfirm, setIsTokenConfirm] = useState(false);
  return (
    <>
      <Title title="비밀번호 찾기" />
      <Cont>
        <Wrapper>
          {!openTokenForm && (
            <VerifyPasswordForm setOpenTokenForm={setOpenTokenForm} />
          )}
          {openTokenForm && !isTokenConfirm && (
            <VerifyTokenForm
              setIsTokenConfirm={setIsTokenConfirm}
              setFoundUserID={setFoundUserID}
            />
          )}
          {isTokenConfirm && (
            <CreateNewPasswordForm
              userId={foundUserID}
              setOpenModal={setOpenModal}
            />
          )}
          <LinkWrap isLogin />
        </Wrapper>
      </Cont>
      {openModal && (
        <>
          <ModalClose />
          <FindUserInfoModal isPassword />
        </>
      )}
    </>
  );
};

export default FindUserPassword;

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
