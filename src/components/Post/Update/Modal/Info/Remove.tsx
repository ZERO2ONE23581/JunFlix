import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Btn } from '../../../../../Tools/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { BtnWrap, Flex, FlexCol } from '../../../../../../styles/global';
import { color, opacityVar } from '../../../../../../styles/variants';

interface IRemovePost {
  _data: {
    theme: boolean;
    isDesk: boolean;
    setIsDelete: Dispatch<SetStateAction<boolean>>;
  };
}
export const RemovePost = ({ _data }: IRemovePost) => {
  const { theme, setIsDelete, isDesk } = _data;
  const [confirm, setConfirm] = useState(false);
  return (
    <Cont className="remove_post" isDesk={isDesk}>
      <h3>Danger zone</h3>
      {!confirm && (
        <Wrap
          exit="exit"
          animate="animate"
          initial="initial"
          variants={opacityVar}
        >
          <FlexCol>
            <span>이 포스트를 삭제하겠습니까?</span>
            <span>Do you like to delete this post?</span>
          </FlexCol>
          <Btn
            type="submit"
            onClick={() => setConfirm(true)}
            item={{ theme, name: 'Delete', isClicked: true }}
          />
        </Wrap>
      )}
      {confirm && (
        <Wrap
          exit="exit"
          initial="initial"
          animate="animate"
          variants={opacityVar}
          className="delete_confirm"
        >
          <span className="text">
            <span>! No recovery after this action.</span>
            <span>! 포스트는 삭제 후 복구가 불가합니다.</span>
          </span>
          <BtnWrap className="btns">
            <Btn
              type="button"
              onClick={() => setConfirm(false)}
              item={{ theme, name: 'Cancel' }}
            />
            <Btn
              type="submit"
              onClick={() => setIsDelete(true)}
              item={{ theme, name: 'Delete', isClicked: true }}
            />
          </BtnWrap>
        </Wrap>
      )}
    </Cont>
  );
};

const Cont = styled.div<{ isDesk: boolean }>`
  width: 100%;
  margin-top: 3rem;
  padding: 10px 20px;
  position: relative;
  border-radius: 10px;
  color: ${(p) => p.theme.color.logo};
  border: 2px solid ${(p) => p.theme.color.logo};
  font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.5rem')};
  .text {
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.5rem')};
    span {
      display: block;
    }
  }

  h3 {
    padding: 5px 10px;
    margin-bottom: 1rem;
    border-radius: 20px;
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
  }
  button {
    margin: 0 auto;
    margin-top: 2rem;
    font-size: ${(p) => (p.isDesk ? '1rem' : '2.8rem')};
    width: ${(p) => (p.isDesk ? 'fit-content' : '12rem')};
  }
  .btns {
    margin-top: 1rem;
    button {
      margin: 0;
      font-size: ${(p) => (p.isDesk ? '1rem' : '2.5rem')};
      width: fit-content;
      width: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    }
  }
`;
const Wrap = styled(FlexCol)`
  align-items: flex-start;
  > div {
    align-items: flex-start;
  }
`;
