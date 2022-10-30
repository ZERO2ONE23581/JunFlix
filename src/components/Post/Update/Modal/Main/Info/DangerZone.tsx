import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Btn } from '../../../../../../Tools/Button';
import { BtnWrap, Flex } from '../../../../../../../styles/global';
import { color, opacityVar } from '../../../../../../../styles/variants';

interface IDangerZone {
  theme: boolean;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
}
export const DangerZone = ({ theme, setIsDelete }: IDangerZone) => {
  const delete_vars = {
    animate: (theme: boolean) => ({
      color: '#E50914',
      backgroundColor: color(!theme),
    }),
  };
  const [confirm, setConfirm] = useState(false);
  return (
    <Container className="danger-zone">
      <Title variants={delete_vars} custom={theme} animate="animate">
        Danger zone
      </Title>
      {!confirm && (
        <Wrap
          exit="exit"
          animate="animate"
          initial="initial"
          variants={opacityVar}
          className="delete_text"
        >
          <span className="text">
            <span>이 포스트를 삭제하겠습니까?</span>
            <span>Do you like to delete this post?</span>
          </span>
          <Btn
            type="submit"
            onClick={() => setConfirm(true)}
            item={{ theme, name: 'Delete' }}
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
          <BtnWrap className="btn-wrap">
            <Btn
              type="button"
              onClick={() => setConfirm(false)}
              item={{ theme, name: 'Cancel' }}
            />
            <Btn
              type="submit"
              onClick={() => setIsDelete(true)}
              item={{ theme, name: 'Confirm Delete' }}
            />
          </BtnWrap>
        </Wrap>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  border-radius: 10px;
  position: relative;
  padding: 10px 20px;
  color: ${(p) => p.theme.color.logo};
  border: 2px solid ${(p) => p.theme.color.logo};
  .delete_confirm {
    flex-direction: column;
    span {
      font-size: 1.1rem;
    }
  }
`;
const Wrap = styled(Flex)`
  padding: 10px;
  line-height: 18px;
  justify-content: space-between;
  span {
    display: block;
    font-size: 1rem;
    font-style: italic;
  }
  button {
    width: fit-content;
  }
  .btn-wrap {
    width: 90%;
    padding: 10px;
    button {
      width: 100%;
    }
  }
`;
const Title = styled(motion.h3)`
  top: -1rem;
  left: 1rem;
  padding: 5px 10px;
  font-size: 1.2rem;
  position: absolute;
  border-radius: 20px;
`;
