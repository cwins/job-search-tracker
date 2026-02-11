import { Flex } from '@chakra-ui/react';
import './App.css';
import { PageHeader } from './components/page-header';
import { PageContent } from './components/page-content';
import { JobsTable } from './components/jobs-table';

function App() {
  return (
    <Flex direction="column" align="center" alignItems="stretch" width="100%" minHeight="100vh" boxShadow="md">
      <PageHeader />
      <PageContent>
        <JobsTable />
      </PageContent>
    </Flex>
  );
}

export default App;
