import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnchorBtn } from '../Layout/parts/Header';
import { NavWrapper } from './NavModal';

interface INavModalProps {
  loggedInUserId?: number;
}
export const NavReviewModal = ({ loggedInUserId }: INavModalProps) => {
  const router = useRouter();
  const createReview = () => {
    router.push(`/review/create`);
  };
  //
  return (
    <>
      <NavCont>
        <NavWrapper>
          <li>
            <AnchorBtn onClick={() => router.push(`/review`)}>All</AnchorBtn>
          </li>
          <li>
            <AnchorBtn onClick={createReview}>Create</AnchorBtn>
          </li>
        </NavWrapper>
      </NavCont>
    </>
  );
};

const NavCont = styled.nav`
  top: 40px;
  left: 0px;
  z-index: 999;
  position: absolute;
  width: 100px;
  border-radius: 5px;
  padding-bottom: 3px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
