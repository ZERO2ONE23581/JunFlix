import { Footer } from './parts/Footer';
import { Header } from './parts/Header';

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
