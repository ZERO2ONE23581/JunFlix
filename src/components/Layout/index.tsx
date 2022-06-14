import { Header } from './Header';
import { Footer } from './Footer';
import { Default } from '../../../styles/global';

export const Layout = ({ children, onClick, btnName }: any) => {
  return (
    <Default>
      <Header theme={btnName} themeClick={onClick} />
      {children}
      <Footer />
    </Default>
  );
};
