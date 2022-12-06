import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Flex, FlexCol } from '../../../../styles/global';
import { useCapLetters } from '../../../libs/client/useTools';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IUpdateUserTitle {
  _data: {
    type: string;
    theme: boolean;
    delAcct: boolean;
    setDelAcct: Dispatch<SetStateAction<boolean>>;
  };
}
export const Title = ({ _data }: IUpdateUserTitle) => {
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
    <Cont>
      {isDel && (
        <IsDel>
          <h1>
            <span>Delete</span>
            <Svg theme={theme} type="delete_user" item={{ fill: 'red' }} />
          </h1>
          <Flex className="sub_title">
            <span className="eng">Delete Account</span>
            <span className="kor">(계정삭제)</span>
          </Flex>
          <FlexCol className="warning">
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
          </FlexCol>
        </IsDel>
      )}
      {!isDel && (
        <Txt>
          <h1>
            <span>Edit</span>
            <Svg theme={theme} type="pen_square" item={{ size: '1.5rem' }} />
          </h1>
          <Flex className="sub_title">
            <Svg theme={theme} type="circle" item={{ size: '0.5rem' }} />
            <span className="eng">{title.eng}</span>
            <span className="kor">({title.kor})</span>
          </Flex>
        </Txt>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  h1 {
    gap: 1rem;
    display: flex;
    font-size: 2.2rem;
    align-items: center;
    margin-bottom: 0.2rem;
    .txt {
      margin-right: 0.5rem;
    }
  }
  svg {
    pointer-events: none;
  }
  .sub_title {
    gap: 0.5rem;
    opacity: 0.8;
    .eng {
      font-size: 1.5rem;
    }
    .kor {
      font-size: 1.2rem;
    }
  }
`;
const Txt = styled.div`
  gap: 0.5rem;
  padding-left: 0.2rem;
  padding-bottom: 0.2rem;
  justify-content: flex-start;
`;
const IsDel = styled.div`
  color: ${(p) => p.theme.color.logo};
  .sub_title {
    font-size: 1.5rem;
    justify-content: flex-start;
  }
  .warning {
    margin-top: 0.5rem;
    font-style: italic;
    align-items: flex-start;
  }
`;
