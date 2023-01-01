import { Title } from './Title';
import { Email } from './Email';
import { UserInfo } from './Info';
import styled from '@emotion/styled';
import { IsPassword } from './IsPw';
import { UserAvatar } from './UserAvatar';
import { DeleteUser } from '../Delete/DeleteUser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IRes } from '../../../types/global';
import { FlexCol } from '../../../../styles/global';
import { ErrModal } from '../../../Tools/Modal/Error';
import { useUser } from '../../../libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { MsgModal } from '../../../Tools/Modal/Message';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/Loading';

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
      <AnimatePresence initial={false} custom={back}>
        <Cont
          key={page}
          exit="exit"
          custom={back}
          variants={vars}
          initial="initial"
          animate="animate"
        >
          {!Loading && (
            <Box className="box">
              <Title _data={{ theme, type, delAcct, setDelAcct }} />
              <Email _data={__data} />
              <IsPassword _data={__data} />
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
  );
};
const Cont = styled(motion.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  position: absolute;
`;
const Box = styled(FlexCol)`
  width: 80%;
  padding: 40px;
  margin: 0 auto;
  border-radius: 5px;
  align-items: flex-start;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;

const vars = {
  exit: (back: boolean) => ({
    x: back ? 1000 : -1000,
    transition: { duration: 1 },
  }),
  animate: () => ({ x: 0, transition: { duration: 1 } }),
  initial: (back: boolean) => ({ x: back ? -1000 : 1000 }),
};
