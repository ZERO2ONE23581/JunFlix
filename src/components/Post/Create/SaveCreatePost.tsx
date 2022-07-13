import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { LoadingModal } from '../../LoadingModal';
import { Modal, DimBackground } from '../../../../styles/global';
import { ICreatePostRes } from './CreatePost';

interface IClosePostModalProps {
  loading: boolean | null;
  data: ICreatePostRes | undefined;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const SaveCreatePost = ({
  data,
  loading,
  closeModal,
}: IClosePostModalProps) => {
  return (
    <>
      {!data && (
        <>
          {!loading && (
            <Cont>
              <h1>작성하신 게시물을 제출하시겠습니까?</h1>
              <h2>게시물은 추후에 수정이 가능합니다.</h2>
              <div className="btn-wrap">
                <Btn name="제출하기" type="submit" />
                <Btn
                  name="돌아가기"
                  type="button"
                  onClick={() => closeModal(false)}
                />
              </div>
            </Cont>
          )}
          {loading && (
            <LoadingModal
              zIndex={103}
              text={{
                kor: '새로운 포스트 저장중...',
                eng: 'Saving new Post...',
              }}
            />
          )}
          <DimBackground zIndex={102} />
        </>
      )}
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 103;
`;
