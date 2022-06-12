import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Btn } from '../../../../styles/btn';

export const BtnWrap = ({ user, data, setDelModal }: any) => {
  const router = useRouter();
  const BtnShow = Boolean(user && data?.review?.UserID === user?.id);
  const clickEdit = () =>
    router.push(
      `/user/${data?.review?.UserID}/review/${data?.review?.id}/edit`
    );
  const [openSetup, setOpenSetup] = useState(false);
  return (
    <>
      <Cont>
        <Button type="button" onClick={() => router.push(`/all/reviews`)}>
          Review
        </Button>
        {BtnShow && (
          <>
            <Button type="button" onClick={() => setOpenSetup((p) => !p)}>
              {openSetup ? 'Back' : 'Setting'}
            </Button>
            {openSetup && (
              <Cont>
                <Button type="button" onClick={clickEdit}>
                  Edit
                </Button>
                <Button
                  type="button"
                  onClick={() => setDelModal((p: boolean) => !p)}
                >
                  Delete
                </Button>
              </Cont>
            )}
          </>
        )}
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 6px;
  display: flex;
  align-items: center;
`;

const Button = styled(Btn)`
  font-size: 1rem;
  width: 90px;
  height: 40px;
`;
