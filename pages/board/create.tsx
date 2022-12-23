import { IPage } from '../_app';
import { useState } from 'react';
import type { NextPage } from 'next';
import { FlexPage } from '../../styles/global';
import { Head_ } from '../../src/Tools/Title/Head';
import { MsgModal } from '../../src/Tools/Modal/Message';
import { useLogin } from '../../src/libs/client/useLogin';
import { LoadingModal } from '../../src/Tools/Modal/Loading';
import { BoardBox } from '../../src/components/Board/Create';

const CreateBoard: NextPage<IPage> = ({ theme }) => {
  useLogin();
  const layoutId = 'create-board';
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  return (
    <>
      <Head_ title="보드생성" />
      <FlexPage>
        <MsgModal _data={{ msg, theme, layoutId }} />
        <BoardBox _data={{ theme, setMsg, setLoading, layoutId, Loading }} />
        {Loading && <LoadingModal theme={theme} />}
      </FlexPage>
    </>
  );
};
export default CreateBoard;
