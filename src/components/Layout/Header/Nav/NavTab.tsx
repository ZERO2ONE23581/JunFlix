import styled from '@emotion/styled';
import { NavTabDetail } from './NavTabDetail';

export const NavTab = ({ type, setType, title }: any) => {
  const Title = (type: string) => {
    return type?.charAt(0).toUpperCase() + type?.substring(1);
  };
  const onClick = (type: string) => {
    if (type) setType(type);
  };
  return (
    <>
      <Cont>
        <div className="click" onClick={() => onClick(title)}>
          <span className="title">{Title(`${title}`)}</span>
        </div>
        {type === title && (
          <NavTabDetail
            title={Title(`${title}`)}
            type={type}
            setType={setType}
          />
        )}
      </Cont>
    </>
  );
};
const Cont = styled.div`
  position: relative;
  .click {
    cursor: pointer;
    font-size: 1.2rem;
    &:hover {
      color: ${(p) => p.theme.color.logo};
    }
    .title {
      margin-left: 5px;
    }
  }
`;