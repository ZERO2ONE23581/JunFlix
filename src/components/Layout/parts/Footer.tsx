import styled from '@emotion/styled';
import useSWR from 'swr';

export const Footer = () => {
  const { data } = useSWR(`/api/user/login`);
  console.log(data);
  //
  return (
    <>
      <Cont>Footer</Cont>
    </>
  );
};
export const Cont = styled.section`
  background-color: black;
  padding: 20px;
  color: white;
`;
