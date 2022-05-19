import { useRouter } from 'next/router';
import { ModalClose, SmallModalCont } from '../../../styles/components/modal';
import { CreateBlogResponse } from '../../types/postResponse';
import { Btn } from '../Btn';

export const CreateBlogModal = ({
  boardId,
  boardTitle,
  creatorId,
}: CreateBlogResponse) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/user/${creatorId}/blog/${boardTitle}`);
  };
  //
  return (
    <>
      <SmallModalCont>
        <h1>보드를 성공적으로 생성하셨습니다.</h1>
        <Btn type="move-to-created-blog" btnName="확인" onClick={handleClick} />
      </SmallModalCont>
      <ModalClose />
    </>
  );
};
