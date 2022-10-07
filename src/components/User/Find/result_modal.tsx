import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';
import { AnimatePresence } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { modalVar } from '../../../../styles/variants';
import { Modal, Overlay } from '../../../../styles/global';

interface IResultModal extends ITheme {
  userId: string;
  verified: boolean;
}
export const ResultModal = ({ theme, userId, verified }: IResultModal) => {
  const router = useRouter();
  const isPassword = Boolean(userId && userId === 'isPassword');
  return (
    <AnimatePresence>
      {verified && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="result-modal"
            custom={theme}
            variants={modalVar}
          >
            <Svg
              size="2rem"
              type="close"
              theme={theme}
              onClick={() => router.replace('/user/login')}
            />
            <div className="wrap">
              {!isPassword && (
                <>
                  <span className="kor">
                    <span>회원님의 아이디는</span>
                    <span className="red">{`"${userId}"`}</span>
                    <span>입니다.</span>
                  </span>
                  <span className="eng">
                    <span>Your ID is</span>
                    <span className="red">{`"${userId}"`}</span>.
                  </span>
                </>
              )}
              {isPassword && (
                <>
                  <span className="kor">새로운 비밀번호를 생성하였습니다.</span>
                  <span className="eng">
                    New password is created successfully.
                  </span>
                </>
              )}
              <Btn
                name="OK"
                type="button"
                theme={theme}
                onClick={() => router.replace('/user/login')}
              />
            </div>
          </Cont>
          <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  width: 30vw;
  height: 35vh;
  min-width: 200px;
  min-height: 250px;
  padding: 20px;
  font-size: 22px;
  .red {
    color: ${(p) => p.theme.color.logo};
    margin: 10px;
  }
  .wrap {
    //border: 1px solid yellow;
    width: 100%;
    > span {
      //      border: 1px solid yellowgreen;
      width: 100%;
      display: block;
      padding: 10px;
      text-align: center;
      span {
      }
    }
  }
  button {
    width: 80px;
    margin: 10px auto 0;
  }
`;
