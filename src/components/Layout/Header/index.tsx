import { NavBar } from './nav';
import { useState } from 'react';
import { UserNav } from './user';
import { Btn } from '../../Button';
import styled from '@emotion/styled';

export const Header = ({ theme, themeClick }: any) => {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <Cont>
      <div className="flex">
        <NavBar />
        <div className="usernav-bar-wrap">
          <UserNav
            theme={theme}
            themeClick={themeClick}
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
          />
          <Btn type="button" name={theme} onClick={themeClick} />
        </div>
      </div>
      {/* <>
        {openProfile ? (
          <NavModalClose onClick={() => setOpenProfile(false)} />
        ) : openCreate ? (
          <NavModalClose onClick={() => setOpenCreate(false)} />
        ) : openBoard ? (
          <NavModalClose onClick={() => setOpenBoard(false)} />
        ) : openPost ? (
          <NavModalClose onClick={() => setOpenPost(false)} />
        ) : openReview ? (
          <NavModalClose onClick={() => setOpenReview(false)} />
        ) : openMovie ? (
          <NavModalClose onClick={() => setOpenMovie(false)} />
        ) : null}
      </> */}
    </Cont>
  );
};
const Cont = styled.section`
  padding: 10px 20%;
  margin-bottom: 5px;
  border-bottom: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .usernav-bar-wrap {
      gap: 40px;
      display: flex;
      align-items: center;
    }
  }
`;
