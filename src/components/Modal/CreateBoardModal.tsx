import { useRouter } from 'next/router';
import { ModalClose, SmallModalCont } from '../../../styles/components/modal';
import { BoardInfo } from '../../types/mutation';
import { Btn } from '../Btn';

export const CreateBoardModal = ({ boardId, creatorId }: BoardInfo) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/user/${creatorId}/board/${boardId}`);
  };
  //
  return (
    <>
      <SmallModalCont>
        <h1>보드를 성공적으로 생성하셨습니다.</h1>
        <Btn
          btnName="확인"
          onClick={handleClick}
          type="move-to-created-board"
        />
      </SmallModalCont>
      <ModalClose />
    </>
  );
};
