import { Title } from './Title';
import { Email } from './Email';
import { UserInfo } from './Info';
import styled from '@emotion/styled';
import { Password } from './Password';
import { UserAvatar } from './Avatar';
import { DeleteUser } from '../Delete';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IRes } from '../../../types/global';
import { AnimatePresence } from 'framer-motion';
import { MsgModal } from '../../../Tools/Msg';
import { Box, Flex } from '../../../../styles/global';
import { useUser } from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { ErrModal } from '../../../Tools/Error/Modal';

interface IBoxType {
  _data: {
    page: number;
    back: boolean;
    type: string;
    theme: boolean;
  };
}
export const BoxType = ({ _data }: IBoxType) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [api, setApi] = useState('');
  const [msg, setMsg] = useState('');
  const { loggedInUser: User } = useUser();
  const { theme, page, back, type } = _data;
  const [Loading, setLoading] = useState(false);
  const [delAcct, setDelAcct] = useState(false);
  const [update, { loading, data }] = useMutation<IRes>(api && api);
  useEffect(() => {
    if (type && user_id) {
      if (type === 'delete') setApi(`/api/user/${user_id}/delete`);
      else setApi(`/api/user/${user_id}/update/${type}`);
    }
  }, [setApi, type, user_id]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (!data.ok) {
          if (data.msg) setMsg(data.msg);
          if (data.error) setMsg(data.error);
        }
        if (data.ok && type === 'delete') return router.replace(`/`);
      }, 1000);
    }
  }, [data, type, router, setMsg, setLoading]);

  const __data = {
    User,
    type,
    update,
    theme,
    delAcct,
    loading,
    setDelAcct,
    setLoading,
    data_err: msg,
  };
  const layoutId = 'user_setting';
  return (
    <>
      <>
        <AnimatePresence initial={false} custom={back}>
          <Cont
            key={page}
            custom={back}
            variants={slideVar}
            exit="exit"
            initial="initial"
            animate="animate"
          >
            {!Loading && (
              <Box>
                <Title _data={{ theme, type, delAcct, setDelAcct }} />
                <Email _data={__data} />
                <Password _data={__data} />
                <UserInfo _data={__data} />
                <UserAvatar _data={__data} />
                <DeleteUser _data={__data} />
              </Box>
            )}
          </Cont>
        </AnimatePresence>
        <ErrModal _data={{ theme, error: msg }} />
        <MsgModal _data={{ msg: data?.msg!, theme, layoutId }} />
        {Loading && <LoadingModal theme={theme} layoutId={layoutId} />}
      </>
    </>
  );
};
const Cont = styled(Flex)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: fit-content;
  position: absolute;
  .overlay {
    // background-color: palevioletred;
  }
`;

const slideVar = {
  initial: (back: boolean) => ({
    scale: 0,
    opacity: 0,
    x: back ? -1000 : 1000,
  }),
  animate: () => ({
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { type: 'tween', duration: 1 },
  }),
  exit: (back: boolean) => ({
    scale: 0,
    opacity: 0,
    x: back ? 1000 : -1000,
    transition: { type: 'tween', duration: 1 },
  }),
};
