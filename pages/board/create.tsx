import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FlexPage } from '../../styles/global';
import { HeadTitle } from '../../src/Tools/head_title';
import { CreateBoardBox } from '../../src/components/board/create';
import useMutation from '../../src/libs/client/useMutation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoadingModal } from '../../src/Tools/Modal/loading_modal';
import { AnimatePresence } from 'framer-motion';
import { MessageModal } from '../../src/Tools/msg_modal';
import { IRes } from '../../src/types/global';

const CreateBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [post, { loading, data }] = useMutation<IRes>(`/api/board/create`);
  const [Loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMessage(data.error);
        if (data.ok)
          return router.replace(`/board/${data.board.id}/${data.board.title}`);
      }, 1000);
    }
  }, [data, router, setMessage, setTimeout, setLoading]);
  //
  return (
    <>
      <HeadTitle title="보드생성" />
      <Cont>
        <AnimatePresence>
          {!Loading && (
            <>
              <CreateBoardBox
                theme={theme}
                post={post}
                loading={loading}
                setLoading={setLoading}
              />
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
export default CreateBoard;

const Cont = styled(FlexPage)`
  .box {
    width: 50vw;
    min-width: 700px;
    min-height: 500px;
    margin-bottom: 50px;
  }
`;