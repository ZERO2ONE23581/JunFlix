import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children, onClick, btnName }: any) => {
  return (
    <>
      <Header btnName={btnName} onClick={onClick} />
      {children}
      <Footer />
    </>
  );
};
