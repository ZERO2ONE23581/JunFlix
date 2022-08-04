import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { DimBackground, SmallModal } from '../../../../styles/global';

interface ILoadingModal {
  type: string;
  zIndex: number;
}
export const LoadingModal = ({ type, zIndex }: ILoadingModal) => {
  return (
    <>
      <Cont zIndex={zIndex} className="loading">
        {Texts(type)}
        <Svg type="loading" size="2rem" />
      </Cont>
      <DimBackground zIndex={99} />
    </>
  );
};
const Cont = styled(SmallModal)<{ zIndex?: number }>`
  gap: 10px;
  min-width: 300px;
  align-items: center;
  z-index: ${(p) => p.zIndex && p.zIndex};
`;
const Texts = (type: string) => {
  return (
    <>
      {type === 'update' && (
        <>
          <span>업데이트중...</span>
          <span>Updating...</span>
        </>
      )}
      {type === 'delete' && (
        <>
          <span>삭제중...</span>
          <span>Deleting...</span>
        </>
      )}
      {type === 'confirm-delete-board' && (
        <>
          <span>보드 삭제...</span>
          <span>Deleting BOARD...</span>
        </>
      )}
      {type === 'delete-user' && (
        <>
          <span>계정 삭제...</span>
          <span>Deleting Account...</span>
        </>
      )}
      {type === 'update-board' && (
        <>
          <span>보드 업데이트...</span>
          <span>Updating BOARD...</span>
        </>
      )}
      {type === 'update-review' && (
        <>
          <span>리뷰 업데이트...</span>
          <span>Updating REVIEW...</span>
        </>
      )}
      {type === 'create-board' && (
        <>
          <span>보드 생성...</span>
          <span>Creating BOARD...</span>
        </>
      )}
      {type === 'create-review' && (
        <>
          <span>리뷰 생성...</span>
          <span>Creating REVIEW...</span>
        </>
      )}
      {type === 'delete-review' && (
        <>
          <span>리뷰 삭제...</span>
          <span>Deleting REVIEW...</span>
        </>
      )}
      {type === 'delete-review-avatar' && (
        <>
          <span>사진 삭제...</span>
          <span>Deleting the photo...</span>
        </>
      )}
      {type === 'create-post' && (
        <>
          <span>새로운 포스트 저장...</span>
          <span>Saving new POST...</span>
        </>
      )}
      {type === 'delete-post' && (
        <>
          <span>포스트 삭제...</span>
          <span>Deleting current POST...</span>
        </>
      )}
      {type === 'update-board-avatar' && (
        <>
          <span>배경 업데이트...</span>
          <span>Updating Background...</span>
        </>
      )}
      {type === 'delete-board-avatar' && (
        <>
          <span>배경 삭제...</span>
          <span>Deleting Background...</span>
        </>
      )}
    </>
  );
};
