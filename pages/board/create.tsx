import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IRes } from '../../src/types/global';
import { FlexPage } from '../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { MsgModal } from '../../src/Tools/msg_modal';
import { HeadTitle } from '../../src/Tools/head_title';
import useMutation from '../../src/libs/client/useMutation';
import { CreateBox } from '../../src/components/Board/Create';
import { LoadingModal } from '../../src/Tools/Modal/loading_modal';

const CreateBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const [post, { loading, data }] = useMutation<IRes>(`/api/board/create`);
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMsg(data.error);
        if (data.ok)
          return router.replace(`/board/${data.board.id}/${data.board.title}`);
      }, 1000);
    }
  }, [data, router, setMsg, setTimeout, setLoading]);
  //
  const layoutId = 'create-board';
  return (
    <>
      <HeadTitle title="보드생성" />
      <Cont>
        <CreateBox
          _data={{
            post,
            theme,
            loading,
            layoutId,
            setLoading,
            open: !Loading,
          }}
        />
        {Loading && <LoadingModal theme={theme} />}
        <MsgModal _data={{ msg, theme, layoutId }} />
      </Cont>
    </>
  );
};
export default CreateBoard;

const Cont = styled(FlexPage)`
  margin-top: 8rem;
`;
