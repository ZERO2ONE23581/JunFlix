import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { FlexCol_, Flex_ } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCapLetters, useResponsive } from '../../../libs/client/useTools';

interface IUpdateUserTitle {
  _data: {
    type: string;
    theme: boolean;
    delAcct: boolean;
    setDelAcct: Dispatch<SetStateAction<boolean>>;
  };
}
export const Title = ({ _data }: IUpdateUserTitle) => {
  const { isDesk } = useResponsive();
  const size = isDesk ? '2rem' : '3rem';
  const { theme, type, delAcct } = _data;
  const isDel = Boolean(type === 'delete');
  const [title, setTitle] = useState({ eng: '', kor: '' });
  useEffect(() => {
    if (type) {
      const eng = useCapLetters(type);
      if (type === 'email') setTitle({ eng, kor: '이메일 수정' });
      if (type === 'password') setTitle({ eng, kor: '비밀번호 수정' });
      if (type === 'userInfo') setTitle({ eng, kor: '유저정보 수정' });
      if (type === 'avatar') setTitle({ eng, kor: '아바타 수정' });
    }
  }, [setTitle, type]);
  return (
    <Cont isDesk={isDesk}>
      {!isDel && (
        <Txt>
          <h1>
            <span>Edit</span>
            <Svg theme={theme} type="pen_square" item={{ size }} />
          </h1>
          <Sub isDesk={isDesk}>
            <span className="eng">{title.eng}</span>
            <span className="kor">({title.kor})</span>
          </Sub>
        </Txt>
      )}
      {isDel && (
        <IsDel isDesk={isDesk}>
          <h1>
            <span>Delete</span>
            <Svg
              theme={theme}
              type="delete_user"
              item={{ fill: 'red', size }}
            />
          </h1>
          <Sub isDesk={isDesk}>
            <span className="eng">Delete Account</span>
            <span className="kor">(계정삭제)</span>
          </Sub>
          <Warn isDesk={isDesk}>
            {!delAcct && (
              <>
                <span>* 본계정은 삭제 후 복구가 불가합니다.</span>
                <span>* Recovery is unabled after deletion.</span>
              </>
            )}
            {delAcct && (
              <>
                <span>* 비밀번호를 인증 해주세요.</span>
                <span>* Please Verify your Password.</span>
              </>
            )}
          </Warn>
        </IsDel>
      )}
    </Cont>
  );
};

const Cont = styled.article<{ isDesk: boolean }>`
  h1 {
    gap: 1rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    font-size: ${(p) => (p.isDesk ? '2.2rem' : '4rem')};
    .txt {
      margin-right: 0.5rem;
    }
  }
  svg {
    pointer-events: none;
  }
`;
const Sub = styled(Flex_)`
  gap: 0.5rem;
  opacity: 0.8;
  align-items: flex-end;
  .eng {
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
  }
  .kor {
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.3rem')};
  }
`;
const Txt = styled.div``;
const IsDel = styled(Txt)<{ isDesk: boolean }>`
  color: ${(p) => p.theme.color.logo};
  .eng {
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
  }
  .kor {
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2rem')};
  }
`;
const Warn = styled(FlexCol_)`
  margin: 2rem 0;
  text-align: center;
  font-style: italic;
  font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.5rem')};
`;
