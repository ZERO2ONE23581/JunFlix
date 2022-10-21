import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Blur, FlexPage, Layer } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { IGetBoard } from '../../../src/types/board';
import { HeadTitle } from '../../../src/Tools/head_title';
import { LoadingModal } from '../../../src/Tools/Modal/loading_modal';
import { ModalSchema } from '../../../src/Tools/Modal/schema';
import { Board } from '../../../src/components/board/read/board_box';

const Board_Page: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { board_id } = router.query;
  const { data } = useSWR<IGetBoard>(board_id && `/api/board/${board_id}`);
  const [type, setType] = useState('');
  const [createPost, setCreatePost] = useState(false);

  //
  return (
    <>
      <HeadTitle title={data?.board?.title!} />
      <AnimatePresence>
        <Cont>
          {data?.board && (
            <>
              <Board theme={theme} board={data?.board} setType={setType} />
              <Layer className="layer">
                <h1>posts</h1>
              </Layer>
              <ModalSchema
                type={type}
                theme={theme}
                original={data?.board}
                modal={Boolean(type)}
                closeModal={() => setType('')}
              />
            </>
          )}
          {!data?.board && <LoadingModal theme={theme} />}
        </Cont>
      </AnimatePresence>
    </>
  );
};
export default Board_Page;

const Cont = styled(FlexPage)`
  gap: 50px;
  flex-direction: column;
  justify-content: flex-start;
  .board-box {
    padding-top: 50px;
    .board-title {
      max-width: 50vw;
    }
    .content-text {
      max-width: 25vw;
    }
  }
  .test {
    border: 10px solid blanchedalmond;
    width: 100vw;
    height: 20vh;
  }
`;
