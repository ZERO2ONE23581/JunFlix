import styled from '@emotion/styled';

export const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <Cont>
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

const Cont = styled.footer`
  padding: 10px 8%;
  border-top: ${(p) => p.theme.border};
  color: whitesmoke;
  background-color: #262424;
`;
const CopyRight = styled.article`
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
  span {
    margin-right: 3px;
  }
`;
