import styled from '@emotion/styled';
import { PageAnswer } from '../Answer';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { SettingWrap } from './Setting';
import { Dispatch, SetStateAction, useState } from 'react';
import useUser from '../../../../../../libs/client/useUser';
import { IconBtn } from '../../../../../Style/Button/IconBtn';

interface IBtnWrap {
  board?: Board;
  edit: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({ edit, setPreview, setEdit }: IBtnWrap) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));
  const [editBg, setEditBg] = useState(false);

  const [setting, setSetting] = useState(false);

  return (
    <>
      <Cont>
        {/* <IconBtn
          size="2.2rem"
          type="button"
          svgType="question"
          onClick={() => setAnwser((p) => !p)}
        />
        <IconBtn
          size="2.2rem"
          type="button"
          svgType="compass"
          isDisable={edit || editBg}
          onClick={() => router.push(`/user/all/boards`)}
        /> */}
        {isMyBoard && (
          <SettingWrap
            edit={edit}
            editBg={editBg}
            setEdit={setEdit}
            setting={setting}
            setEditBg={setEditBg}
            setPreview={setPreview}
            setSetting={setSetting}
          />
        )}
      </Cont>
    </>
  );
};
const Cont = styled.article`
  top: 2rem;
  right: 2rem;
  position: absolute;
  gap: 20px;
  display: flex;
  align-items: center;
`;
