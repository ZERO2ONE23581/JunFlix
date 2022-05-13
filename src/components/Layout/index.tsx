import { Btn } from '../Btn';
import { Footer } from './parts/Footer';
import { Header } from './parts/Header';

export const Layout = ({ children, onClick, btnName }: any) => {
  //
  return (
    <>
      <Header />
      <Btn type="theme" btnName={btnName} onClick={onClick} />
      {children}
      <Footer />
    </>
  );
};
