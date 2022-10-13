import styled from '@emotion/styled';

export const HostDetail = () => {
  return (
    <Detail className="detail">
      <ul className="follow">
        <li>
          <label>Follower:</label>
          <span>0</span>
        </li>
        <li>
          <label>Following:</label>
          <span>0</span>
        </li>
      </ul>
      <ul className="contents">
        <li>
          <label>Boards:</label>
          <span>0</span>
        </li>
        <li>
          <label>Posts:</label>
          <span>0</span>
        </li>
        <li>
          <label>Reviews:</label>
          <span>0</span>
        </li>
      </ul>
    </Detail>
  );
};
const Detail = styled.div`
  font-size: 1.6em;
  width: fit-content;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.logo};
  }
  h1 {
    gap: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 2.3rem;
    }
  }
  ul {
    width: fit-content;
    gap: 20px;
    display: flex;
    align-items: center;
    li {
      width: 100%;
      gap: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .contents {
    li {
      flex-direction: row;
    }
  }
`;
