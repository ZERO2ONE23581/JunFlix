import { Btn } from '..';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../libs/client/useUser';
import { DimBackground, Modal } from '../../../../styles/global';

export interface IModalBtn {
  setSetting: Dispatch<SetStateAction<boolean>>;
}
export const ModalBtn = ({ setSetting }: IModalBtn) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const handleClick = (type: string) => {
    setSetting(false);
    if (type === 'setting')
      router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/setting`
      );
    if (type === 'profile')
      router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/dashboard/profile`
      );
  };
  return (
    <>
      <ModalBtnCont>
        <Btn
          type="button"
          name="설정 (Setting)"
          onClick={() => handleClick('setting')}
          svg={{ type: 'setting', size: '1.4rem', location: { left: true } }}
        />
        <Btn
          type="button"
          name="프로필 보기 (See Profile)"
          onClick={() => handleClick('profile')}
          svg={{ type: 'profile', size: '1.4rem', location: { left: true } }}
        />
      </ModalBtnCont>
      <DimBackground zIndex={1} onClick={() => setSetting(false)} />
    </>
  );
};
export const ModalBtnCont = styled(Modal)`
  gap: 0;
  width: 60vw;
  z-index: 201;
  border: none;
  overflow: hidden;
  border-radius: 5px;
  background-color: transparent;
  button {
    width: 100%;
    padding: 5px;
    font-weight: 400;
    border-radius: 0%;
    font-size: 1.2rem;
    border-bottom: 1px solid #2d3436;
    :nth-of-type(3) {
      border: none;
    }
  }
`;
