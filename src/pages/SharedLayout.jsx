import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Sidebar from 'components/Sidebar/Sidebar';
import Section from 'components/Section/Section';
import ContentPanel from 'components/ContentPanel/ContentPanel';
import Navbar from 'components/Navbar/Navbar';

const SharedLayout = () => {
  return (
    <Section>
      <Sidebar>
        <Navbar />
      </Sidebar>
      <ContentPanel>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </ContentPanel>
    </Section>
  );
};

export default SharedLayout;
