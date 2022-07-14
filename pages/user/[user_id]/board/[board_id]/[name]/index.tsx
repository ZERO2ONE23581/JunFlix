import useSWR from 'swr';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../../src/types/board';
import { AVATAR_BG, Page } from '../../../../../../styles/global';
import { Title } from '../../../../../../src/components/Layout/Title';
import { ReadBoard } from '../../../../../../src/components/Board/Read';

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
      <Page>
        <Cont avatar={data?.board?.avatar!} preview={preview}>
          {data?.board && (
            <ReadBoard
              board={data?.board}
              edit={edit}
              setEdit={setEdit}
              setPreview={setPreview}
            />
          )}
          {!data?.board && <h1>NO BOARD FOUND..</h1>}
        </Cont>
      </Page>
    </>
  );
};
export default BoardPage;

const Cont = styled(AVATAR_BG)<{ preview: string }>`
  min-width: 1200px;
  min-height: 800px;
  padding: 3% 12%;
  background-color: ${(p) => p.theme.color.font};
  background: ${(p) =>
    p.preview && `url(${p.preview}) center / cover no-repeat`};
`;
