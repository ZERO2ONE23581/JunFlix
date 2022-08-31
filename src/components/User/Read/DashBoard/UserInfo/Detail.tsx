import styled from '@emotion/styled';

export interface IDetail {
  name: string;
  email: string;
  userId: string;
  username: string;
  isMyDash?: boolean;
}
export const Detail = ({
  name,
  email,
  userId,
  username,
  isMyDash,
}: IDetail) => {
  return (
    <Cont>
      <Flex>
        <li className="username">
          <label>Username</label>
          <span>{username}</span>
        </li>
        <li className="name">
          <label>Name</label>
          <span>{name ? name : 'Anonymous'}</span>
        </li>
      </Flex>
      {isMyDash && (
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
      )}
    </Cont>
  );
};
const Cont = styled.ul`
  gap: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const Flex = styled.div`
  gap: 50px;
  display: flex;
  align-items: center;
  span {
    font-size: 1.2rem;
  }
  li {
    gap: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    label {
      opacity: 0.8;
      display: block;
      color: ${(p) => p.theme.color.logo};
    }
  }
  .name,
  .username {
    min-height: 47px;
    span {
      font-size: 1.8rem;
    }
  }
  .name {
    label {
      margin-bottom: 5px;
    }
    span {
      font-size: 1.4rem;
    }
  }
`;
