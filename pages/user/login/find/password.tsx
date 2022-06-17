import { useState } from 'react';
import type { NextPage } from 'next';
import { FindPageCont } from './user_id';
import { FormCont, ModalClose } from '../../../../styles/global';
import { LinkWrap } from '../../../../src/components/Style/LinkWrap';
import { VerifyTokenForm } from '../../../../src/components/User/Login/Verify/TokenForm';
import { FindUserInfoModal } from '../../../../src/components/User/Login/Find/UserInfo';
import { VerifyPasswordForm } from '../../../../src/components/User/Login/Verify/PasswordForm';
import { CreateNewPasswordForm } from '../../../../src/components/User/Login/Verify/Create/NewPasswordForm';

const FindUserPassword: NextPage = () => {
  const [openTokenForm, setOpenTokenForm] = useState(false);
  const [isTokenConfirm, setIsTokenConfirm] = useState(false);
  const [foundUserID, setFoundUserID] = useState('');
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <FindPageCont>
        <article className="wrap">
          <FormCont className="form-cont">
            <h1>Find Password</h1>
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
          </FormCont>
          <LinkWrap isLogin />
        </article>
      </FindPageCont>
      {openModal && <FindUserInfoModal isPassword />}
      {openModal && <ModalClose />}
    </>
  );
};

export default FindUserPassword;
