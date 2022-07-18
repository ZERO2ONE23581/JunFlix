import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../../src/types/board';
import { AVATAR_BG, Page } from '../../../../../../styles/global';
import { Board } from '../../../../../../src/components/Board/Read';
import { Title } from '../../../../../../src/components/Layout/Title';
import { FixedBtn } from '../../../../../../src/components/Board/Read/Page/Board/FixedBtn';

const BoardPage: NextPage = () => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState('');
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  return (
    <>
      <Title title={data?.board?.title!} />
      <Cont>
        <section className="wrap">
          <BG avatar={data?.board?.avatar!} preview={preview}>
            {data?.board && (
              <Board
                board={data?.board}
                edit={edit}
                setEdit={setEdit}
                setPreview={setPreview}
              />
            )}
            {!data?.board && <h1>NO BOARD FOUND..</h1>}
          </BG>
          <FixedBtn />
        </section>
      </Cont>
    </>
  );
};
export default BoardPage;

const Cont = styled(Page)`
  .wrap {
    position: relative;
    min-width: 1200px;
    min-height: 800px;
  }
`;
const BG = styled(AVATAR_BG)<{ preview: string }>`
  padding: 3% 12%;
  background-color: ${(p) => p.theme.color.font};
  background: ${(p) =>
    p.preview && `url(${p.preview}) center / cover no-repeat`};
`;
const Btns = styled.div`
  bottom: 50%;
  right: -6%;
  position: absolute;
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;
