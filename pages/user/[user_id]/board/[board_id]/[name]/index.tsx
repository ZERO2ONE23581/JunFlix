import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Page } from '../../../../../../styles/global';
import { IGetBoard } from '../../../../../../src/types/board';
import { AVATAR_BG } from '../../../../../../src/components/Avatar';
import { Title } from '../../../../../../src/components/Layout/Title';
import { ReadBoard } from '../../../../../../src/components/Board/Read';
import { PageBtns } from '../../../../../../src/components/Board/Read/Page/Board/Btns';

const BoardPage: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState('');
  return (
    <>
      <Title title={data?.board?.title!} />
      <Cont>
        <PageBtns setPreview={setPreview} edit={edit} setEdit={setEdit} />
        <AVATAR_PAGE avatar={data?.board?.avatar!} preview={preview}>
          {data?.board && (
            <ReadBoard board={data?.board} edit={edit} setEdit={setEdit} />
          )}
          {!data?.board && <h1>NO BOARD FOUND..</h1>}
        </AVATAR_PAGE>
      </Cont>
    </>
  );
};
export default BoardPage;

const Cont = styled(Page)``;
const AVATAR_PAGE = styled(AVATAR_BG)<{ preview: string }>`
  height: 100vh;
  padding: 3% 12%;
  background: ${(p) =>
    p.preview && `url(${p.preview}) center / cover no-repeat`};
`;
