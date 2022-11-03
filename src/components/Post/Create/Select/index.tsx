import { Layer } from './Layer';
import styled from '@emotion/styled';
import { QuickSave } from './QuickSave';
import { useRouter } from 'next/router';
import { BoardsList } from './MyBoards';
import { IRes } from '../../../../types/global';
import { OverlayBg } from '../../../../Tools/overlay';
import { variants } from '../../../../../styles/variants';
import { useUser } from '../../../../libs/client/useUser';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FlexCol, Modal } from '../../../../../styles/global';
import useMutation from '../../../../libs/client/useMutation';

interface ISelectBoardModal {
  _data: {
    theme: boolean;
    _modal: boolean;
    post_id?: number;
    layoutId: string;
    setMsg: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setListModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const SelectModal = ({ _data }: ISelectBoardModal) => {
  const open = _data?._modal!;
  const theme = _data?.theme!;
  const setMsg = _data?.setMsg!;
  const post_id = _data?.post_id!;
  const layoutId = _data?.layoutId!;
  const setLoading = _data?.setLoading!;
  const setListModal = _data?.setListModal!;
  //
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const host_id = loggedInUser?.id!;
  //
  const [post, { data, loading }] = useMutation<IRes>(
    `/api/post/${post_id}/select_board`
  );

  const onFinal = async (success: boolean) => {
    setListModal(false);
    if (success) {
      if (!user_id) return router.push(`/user/${loggedInUser?.id}/posts`);
      return setMsg('created');
    }
    if (!success) return alert('fail');
  };
  const onClick = ({ board_id }: any) => {
    if (loading) return;
    setLoading(true);
    if (!post_id) return onFinal(false);
    if (!board_id) {
      setTimeout(() => {
        setLoading(false);
        return onFinal(true);
      }, 3000);
    } else return post({ board_id });
  };
  const clickQuick = () => onClick({});
  const clickBoard = (board_id: number) => onClick({ board_id });
  const __data = { theme, clickQuick };
  const ___data = { ...__data, host_id, clickBoard };
  const layer_data = { ...__data, isCreate: true };
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.ok) return onFinal(true);
        if (!data.ok && data.error) return setMsg(data.error);
      }, 2000);
    }
  }, [data, setLoading, onFinal, setMsg]);
  return (
    <>
      {open && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            animate="animate"
            initial="initial"
            variants={variants}
            layoutId={layoutId}
          >
            <Layer _data={{ ...layer_data }} />
            <FlexCol className="wrap">
              <QuickSave _data={{ ...___data }} />
              <BoardsList _data={{ ...___data }} />
            </FlexCol>
          </Cont>
          <OverlayBg dark={0.8} zIndex={113} />
        </>
      )}
    </>
  );
};
const Cont = styled(Modal)`
  top: -3rem;
  padding: 0;
  width: 33vw;
  z-index: 114;
  max-width: 40vw;
  min-width: 500px;
  margin-top: 10rem;
  height: fit-content;
  .wrap {
    padding: 10px;
  }
`;
