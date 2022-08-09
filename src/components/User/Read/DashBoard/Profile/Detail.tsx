import styled from '@emotion/styled';

export interface IDetail {
  name: string;
  userId: string;
  email: string;
}
export const Detail = ({ name, userId, email }: IDetail) => {
  return (
    <Cont>
      <Name>
        <label>Name</label>
        <span>{name ? name : 'Anonymous'}</span>
      </Name>
      <Flex>
        <li>
          <label>ID</label>
          <span>{userId}</span>
        </li>
        <li>
          <label>Email</label>
          <span>{email}</span>
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
