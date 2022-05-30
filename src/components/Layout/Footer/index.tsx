import styled from '@emotion/styled';

export const Footer = () => {
  return (
    <Cont>
      <h1>Footer</h1>
    </Cont>
  );
};

const Cont = styled.footer`
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
`;
