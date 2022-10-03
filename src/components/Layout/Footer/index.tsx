import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';

export const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <Cont className="footer">
      <h1>Footer</h1>
      <div>Nav Bar Scroll to Top</div>
      <div>SNS</div>
      <CopyRight>
        <span>&copy;</span>
        <span>{currentYear !== 2022 && '2022 -'}</span>
        <span>{currentYear}</span>
        <span>Junflix.</span>
        <span>All Rights Reserved.</span>
      </CopyRight>
    </Cont>
  );
};

const Cont = styled.footer``;
const CopyRight = styled.article`
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
  span {
    margin-right: 3px;
  }
`;
