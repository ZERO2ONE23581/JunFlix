import styled from '@emotion/styled';

export const Footer = () => {
  return (
    <Cont>
      <h1>Footer</h1>
    </Cont>
  );
};

const Cont = styled.footer`
  position: fixed;
  width: 100vw;
  bottom: 0;
  background-color: ${(p) => p.theme.color.font};
  color: ${(p) => p.theme.color.bg};
  border: ${(p) => p.theme.border};
  padding: 20px;
`;
