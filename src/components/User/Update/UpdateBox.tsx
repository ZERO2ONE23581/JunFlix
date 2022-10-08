import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Btn } from '../../../Tools/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg, Errors } from '../../../Tools/Errors';
import { InputWrap } from '../../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Box, Flex } from '../../../../styles/global';
import useUser from '../../../libs/client/useUser';
import { IUserForm } from '../../../types/user';
import { IData } from '../../../types/global';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Answer } from '../../../Tools/Modal/Answer';
import { Svg } from '../../../Tools/Svg';
import { ITheme } from '../../../../styles/theme';
import { ErrModal } from '../../../Tools/errorModal';
import { BoxTitle } from '../../../Tools/Title';
import { BoxBgVar, joinBoxVar, TweenTrans } from '../../../../styles/variants';
import { FindUserWrap } from '../Read/Links/Find';
import { Edit_UserId } from './userId_form';
import { Edit_Password } from './password_form';
import { Edit_UserInfo } from './userInfo_form';
import { Delete_User } from './delete_form';
import { Edit_UserAvatar } from './avatar_form';

interface IUpdateUser extends ITheme {
  type: string;
}
export const UpdateUser = ({ type, theme }: IUpdateUser) => {
  const [Type, setType] = useState('');
  useEffect(() => {
    if (type === 'edit-user1') setType('userId');
    if (type === 'edit-user2') setType('password');
    if (type === 'edit-user3') setType('userInfo');
    if (type === 'edit-user4') setType('avatar');
    if (type === 'edit-user5') setType('delete');
  }, [type, setType]);
  //
  const router = useRouter();
  const { user_id } = router.query;
  //
  const [api, setApi] = useState('');
  const [update, { loading, data }] = useMutation<IData>(api && api);
  useEffect(() => {
    if (Type && user_id) {
      if (Type === 'delete') setApi(`/api/user/${user_id}/delete`);
      else setApi(`/api/user/${user_id}/update/${Type}`);
    }
  }, [setApi, Type, user_id]);
  //
  const [dataErr, setDataErr] = useState('');
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (!data.ok) {
          if (data.error) setDataErr(data.error);
          if (data.message) setDataErr(data.message);
        }
        if (data.ok) {
          if (Type === 'delete') return router.replace(`/home`);
          setDataErr('업데이트 완료 (Update completed)');
          setTimeout(() => {
            router.reload();
          }, 2000);
        }
      }, 1000);
    }
  }, [data, Type, router, setDataErr, setLoading]);
  //
  const isLink =
    !Boolean(Type === 'avatar') &&
    !Boolean(Type === 'userInfo') &&
    !Boolean(Type === 'delete');
  return (
    <>
      {!Loading && (
        <Cont
          kind={Type}
          exit="exit"
          initial="initial"
          animate="animate"
          custom={theme}
          variants={BoxBgVar}
          transition={TweenTrans}
          className="box"
        >
          <>
            {Type !== 'delete' && <h1>Edit</h1>}
            {Type === 'delete' && <h1 className="del">Delete</h1>}
            {type && <BoxTitle type={type} theme={theme} />}
          </>
          {Type === 'userId' && (
            <Edit_UserId
              theme={theme}
              update={update}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {Type === 'password' && (
            <Edit_Password
              theme={theme}
              update={update}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {Type === 'userInfo' && (
            <Edit_UserInfo
              theme={theme}
              update={update}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {Type === 'avatar' && (
            <Edit_UserAvatar
              theme={theme}
              update={update}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {Type === 'delete' && (
            <Delete_User
              theme={theme}
              remove={update}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {isLink && <FindUserWrap />}
          <ErrModal error={dataErr} theme={theme} setDataErr={setDataErr} />
        </Cont>
      )}
      {Loading && <LoadingModal theme={theme} />}
    </>
  );
};
const Cont = styled(Box)<{ kind?: string }>`
  width: 40vw;
  width: ${(p) => (p.kind === 'avatar' ? '400px' : '40vw')};
  min-width: ${(p) => (p.kind === 'avatar' ? '400px' : '520px')};
  min-height: 55vh;
  display: block;
  .del {
    color: red;
  }
  h1 {
    font-size: 2.7rem;
    margin-bottom: 10px;
  }
  .find-user-wrap {
    margin-top: 20px;
  }
  .box-title {
    gap: 0px;
    margin-bottom: 30px;
    .title-wrap {
      gap: 60px;
      h2 {
        font-size: 1.7rem;
        margin-bottom: 5px;
        color: ${(p) => p.theme.color.logo};
        .kor {
          font-size: 1.4rem;
        }
        //align-items: center;
        //border: 1px solid blue;
      }
    }
    .desc-wrap {
      line-height: 22px;
    }
  }
  form {
    height: fit-content;
    //border: 2px solid blue;
    .input-wrap {
      //border: 10px solid blue;
      .err-msg {
        margin-top: 15px;
      }
    }
  }
`;
