import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { SmallModal, DimBackground } from '../../../../styles/global';
import useUser from '../../../libs/client/useUser';
import { Btn } from '../Button';
import { IconBtn } from '../Button/Icon';

interface IMoveToCreate {
  type: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

export const Move = ({ type, closeModal }: IMoveToCreate) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const onClick = () => {
    if (type === 'board')
      return router.push(`/user/${loggedInUser?.id}/board/create`);
    if (type === 'post') return router.push(`/all/my/boards`);
  };
  return (
    <>
      <Cont>
        <IconBtn
          size="2rem"
          type="button"
          svgType="close"
          onClick={() => closeModal(false)}
        />
        {type === 'board' && (
          <>
            <span>보드작성 페이지로 이동</span>
            <span>Move to create board</span>
          </>
        )}
        {type === 'post' && (
          <>
            <span>포스트를 생성하려면 본인의 보드를 선택해주세요.</span>
            <span className="small">
              * 보드페이지에서 포스트 아이콘을 클릭하면 포스트를 만들수
              있습니다.
            </span>
            <span>Please select your board to create.</span>
            <span className="small">
              * Click the icon at the board page to create post.
            </span>
          </>
        )}
        <Btn name="GO" type="button" onClick={onClick} />
      </Cont>
      <DimBackground
        zIndex={102}
        onClick={() => {
          closeModal(false);
        }}
      />
    </>
  );
};
const Cont = styled(SmallModal)`
  gap: 10px;
  z-index: 103;
  align-items: center;
  button {
    width: 70px;
    height: 35px;
    font-weight: 500;
    font-size: 1.2rem;
  }
`;
