import styled from '@emotion/styled';

interface IDeletePostCmtModalProps {
  delLoading?: boolean;
  postDelete?: () => void;
  cancelDelete?: () => void;
}

export const DeletePostCmtModal = ({
  delLoading,
  postDelete,
  cancelDelete,
}: IDeletePostCmtModalProps) => {
  <DelModal>
    {delLoading ? (
      <span>Loading...</span>
    ) : (
      <>
        <div>정말로 삭제하시겠습니까?</div>
        <div>
          <button onClick={postDelete}>yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      </>
    )}
  </DelModal>;
};
const DelModal = styled.article`
  border: 3px solid red;
  width: 300px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;
