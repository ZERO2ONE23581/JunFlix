import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { LinkWrap } from '../../../../src/components/Style/LinkWrap';
import { FormCont, ModalClose, Page } from '../../../../styles/global';
import { VerifyTokenForm } from '../../../../src/components/User/Login/Verify/TokenForm';
import { VerifyEmailForm } from '../../../../src/components/User/Login/Verify/EmailForm';
import { FindUserInfoModal } from '../../../../src/components/User/Login/Find/UserInfo';

const FindUserId: NextPage = () => {
  const [openTokenForm, setOpenTokenForm] = useState(false);
  const [isTokenConfirm, setIsTokenConfirm] = useState(false);
  const [foundUserID, setFoundUserID] = useState('');
  return (
    <>
      <FindPageCont>
        <article className="wrap">
          <FormCont className="form-cont">
            <h1>Find ID</h1>
            {!openTokenForm && (
              <VerifyEmailForm setOpenTokenForm={setOpenTokenForm} />
            )}
            {openTokenForm && (
              <VerifyTokenForm
                setIsTokenConfirm={setIsTokenConfirm}
                setFoundUserID={setFoundUserID}
              />
            )}
          </FormCont>
          <LinkWrap isLogin />
        </article>
      </FindPageCont>
      {isTokenConfirm && (
        <FindUserInfoModal isUserID foundUserID={foundUserID} />
      )}
      {isTokenConfirm && <ModalClose />}
    </>
  );
};
export default FindUserId;

export const FindPageCont = styled(Page)`
  height: 100vh;
  .wrap {
    margin: 15% auto;
    width: 500px;
    .form-cont {
      padding: 30px 50px;
    }
  }
`;
