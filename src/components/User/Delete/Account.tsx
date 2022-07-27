import { useState } from 'react';
import { DelModal } from './Modal';
import styled from '@emotion/styled';
import { Box } from '../Edit/UserId';
import { Heading } from '../Join/Heading';
import { IconBtn } from '../../Style/Button/IconBtn';

export const DeleteAccount = () => {
  const [delAcct, setDelAcct] = useState(false);
  return (
    <>
      <Cont>
        <Heading type="delete-acct" h1="Delete Account (계정삭제)" />
        <IconBtn
          size="2rem"
          type="button"
          svgType="trash"
          onClick={() => setDelAcct((p: boolean) => !p)}
        />
      </Cont>
      {delAcct && <DelModal setDelAcct={setDelAcct} />}
    </>
  );
};
const Cont = styled(Box)`
  width: 400px;
  padding: 20px;
  max-width: 400px;
  min-height: 100px;
  color: ${(p) => p.theme.color.logo};
  .heading {
    margin: 0 auto;
    .flex {
      gap: 8px;
      h1 {
        font-size: 1.4rem;
      }
    }
  }
`;
