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
import { joinBoxVar, TweenTrans } from '../../../../styles/variants';
import { FindUserWrap } from '../Read/Links/Find';

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
    if (type === 'edit-user4') setType('delete');
  }, [type, setType]);
  //
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id } = router.query;
  const userId = loggedInUser?.userId;
  //
  const [api, setApi] = useState('');
  const [update, { loading, data }] = useMutation<IData>(api && api);
  useEffect(() => {
    if (Type && user_id) setApi(`/api/user/${user_id}/update/${Type}`);
  }, [setApi, Type, user_id]);
  //
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  useEffect(() => {
    if (userId) setValue('userId', userId);
  }, [userId, setValue]);

  const [dataErr, setDataErr] = useState('');
  const [Loading, setLoading] = useState(false);
  const onValid = ({ userId }: IUserForm) => {
    if (loading) return;
    setLoading(true);
    if (Type === 'userId') {
      if (userId) return update({ userId: userId.toUpperCase() });
    }
  };
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (!data.ok) {
          if (data.error) setDataErr(data.error);
          if (data.message) setDataErr(data.message);
        }
        if (data.ok) {
          if (data.message) setDataErr(data.message);
          setTimeout(() => {
            router.reload();
          }, 2000);
        }
      }, 1000);
    }
  }, [data, Type, router, setDataErr, setLoading]);
  //
  return (
    <>
      {!Loading && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          custom={theme}
          variants={joinBoxVar}
          transition={TweenTrans}
          className="box"
        >
          {type !== 'edit-user5' && <h1>Edit</h1>}
          {type === 'edit-user5' && <h1 className="del">Delete</h1>}
          {type && <BoxTitle type={type} theme={theme} />}
          <form onSubmit={handleSubmit(onValid)}>
            <InputWrap
              type="text"
              id="userId"
              theme={theme}
              label="User ID"
              watch={watch('userId')}
              error={errors.userId?.message}
              register={register('userId', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
                  message:
                    '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
                },
              })}
            />
            <Btn theme={theme} name="Update" type="submit" />
          </form>
          <FindUserWrap />
          <ErrModal error={dataErr} theme={theme} setDataErr={setDataErr} />
        </Cont>
      )}
      {Loading && <LoadingModal theme={theme} />}
    </>
  );
};
export const Cont = styled(Box)`
  min-width: 30vw;
  min-height: 50vh;
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
    gap: 15px;
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
