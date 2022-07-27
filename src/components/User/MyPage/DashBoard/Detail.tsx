import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';

export const Detail = () => {
  const { loggedInUser } = useUser();
  return (
    <Cont>
      <Name>
        <label>Name</label>
        <span>{loggedInUser?.name ? loggedInUser?.name : 'Anonymous'}</span>
      </Name>
      <Flex>
        <li>
          <label>ID</label>
          <span>{loggedInUser?.userId}</span>
        </li>
        <li>
          <label>Email</label>
          <span>{loggedInUser?.email}</span>
        </li>
      </Flex>
    </Cont>
  );
};
const Cont = styled.ul`
  li {
    width: 100%;
    label {
      opacity: 0.8;
      display: block;

      margin-bottom: 3px;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
const Name = styled.li`
  margin-bottom: 10px;
  span {
    font-size: 1.8rem;
  }
`;
const Flex = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  span {
    font-size: 1.2rem;
  }
`;
