import { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
