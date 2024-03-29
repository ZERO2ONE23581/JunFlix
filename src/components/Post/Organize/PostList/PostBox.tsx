import { CheckBox } from './Box/CheckBox';
import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';
import { avatarLink } from '../../../../Tools/Avatar';
import { UseCapLetters } from '../../../../libs/client/useTools';
import { PostCover } from '../../../../../styles/global';

interface IPostBox {
  _data: {
    title: string;
    theme: boolean;
    post_id: number;
    isChecked: boolean;
    image: string | null;
    onClick: (id: number) => void;
    register: UseFormRegister<any>;
  };
}
export const PostBox = ({ _data }: IPostBox) => {
  const { register, title, image, theme, post_id, isChecked } = _data;
  const Title = (text: string) => {
    const length = text.length;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const isKor = korean.test(title);
    if (isKor && length > 15) return UseCapLetters(text.slice(0, 15)) + '...';
    else if (length <= 24) return UseCapLetters(text);
    else return UseCapLetters(text.slice(0, 24)) + '...';
  };
  return (
    <>
      {avatarLink(image) && (
        <Cont key={post_id}>
          <img alt="박스커버이미지" src={avatarLink(image)} />
          <h2>{Title(title)}</h2>
          <CheckBox _data={{ post_id, register, isChecked, theme }} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(PostCover)`
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
`;
