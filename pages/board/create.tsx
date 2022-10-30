import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FlexPage } from '../../styles/global';
import { HeadTitle } from '../../src/Tools/head_title';
import { CreateBoardBox } from '../../src/components/Board/create';
import useMutation from '../../src/libs/client/useMutation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoadingModal } from '../../src/Tools/Modal/loading_modal';
import { AnimatePresence } from 'framer-motion';
import { MsgModal } from '../../src/Tools/msg_modal';
import { IRes } from '../../src/types/global';

const CreateBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [post, { loading, data }] = useMutation<IRes>(`/api/board/create`);
  const [Loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
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
  return (
    <>
      <HeadTitle title="보드생성" />
      <Cont>
        <AnimatePresence>
          {!Loading && (
            <CreateBoardBox
              theme={theme}
              post={post}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          <MsgModal
            msg={msg}
            theme={theme}
            Loading={Loading}
            closeModal={() => setMsg('')}
          />
          {Loading && <LoadingModal theme={theme} />}
        </AnimatePresence>
      </Cont>
    </>
  );
};
export default CreateBoard;

const Cont = styled(FlexPage)`
  .box {
    width: 50vw;
    min-width: 700px;
    min-height: 500px;
    margin-bottom: 50px;
  }
`;
