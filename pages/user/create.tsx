import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Page } from '../../styles/global';
import { BoxTitle } from '../../src/Tools/Title';
import { ICreateUserRes } from '../../src/types/global';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageModal } from '../../src/Tools/msg_modal';
import { HeadTitle } from '../../src/components/head_title';
import useMutation from '../../src/libs/client/useMutation';
import { LoadingModal } from '../../src/Tools/Modal/loading';
import { TweenTrans, variants } from '../../styles/variants';
import { CreateUserId } from '../../src/components/user/create/userId';
import { CreateUserInfo } from '../../src/components/user/create/userInfo';
import { CreateUserAvatar } from '../../src/components/user/create/avatar';

const Create_User: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [api, setApi] = useState('');
  const [type, setType] = useState('userId');
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [id, setId] = useState({ userId: '', user_id: 0 });
  const array = ['userId', 'userInfo', 'avatar'].filter((e) => e === type);

  //api
  const [post, { loading, data }] = useMutation<ICreateUserRes>(api && api);
  useEffect(() => {
    if (type) setApi(`/api/user/create/${type}`);
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (!data.ok) {
          if (data.error) setMessage(data.error);
          if (data.message) setMessage(data.message);
        }
        if (data.ok) {
          if (data.type === 'userId') {
            if (data.userId) {
              setType('userInfo');
              return setId({ userId: data.userId, user_id: 0 });
            }
          }
          if (data.type === 'userInfo') {
            setType('avatar');
            return setId({ userId: '', user_id: data.user_id });
          }
          if (data.type === 'avatar') {
            setType('');
            return setMessage('create-user-done');
          }
        }
      }, 1000);
    }
  }, [type, setApi, setId, data, setLoading, setMessage, setType, router]);
  const isType = (text: string) => Boolean(type === text);
  const wrap = { theme, loading, post, id, setLoading, isType };
  //
  return (
    <>
      <HeadTitle title="회원가입" />
      <Cont>
        <AnimatePresence>
          {!Loading && (
            <>
              <Wrap className={type}>
                {array.map((element) => (
                  <Box
                    className="box"
                    exit="exit"
                    initial="initial"
                    animate="animate"
                    custom={theme}
                    variants={variants}
                    transition={TweenTrans}
                    key={array?.indexOf(element)}
                  >
                    <BoxTitle theme={theme} type={`create-user-${type}`} />
                    <CreateUserId wrap={wrap} isType={isType('userId')} />
                    <CreateUserInfo wrap={wrap} isType={isType('userInfo')} />
                    <CreateUserAvatar wrap={wrap} isType={isType('avatar')} />
                  </Box>
                ))}
              </Wrap>
              <MessageModal
                theme={theme}
                message={message}
                setMessage={setMessage}
              />
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </AnimatePresence>
      </Cont>
    </>
  );
};
export default Create_User;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  .userId {
    .box {
      gap: 20px;
      width: 510px;
      max-width: 510px;
      .box-title {
        .desc {
          font-size: 1.2rem;
        }
      }
      form {
        .input-wrap {
          gap: 15px;
        }
        gap: 15px;
      }
    }
  }
  .userInfo {
    .box {
      width: 620px;
      max-width: 620px;
    }
  }
`;
const Wrap = styled(motion.section)`
  form {
    .flex {
      align-items: flex-start;
    }
  }
`;
