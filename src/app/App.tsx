import { useGetIssues } from '@data-access/github-api/issues/use-get-issues';
import './app.css';
import { IssuesTable } from '../components/issues-table/issues-table';

function App() {
  const { data } = useGetIssues();
  console.log('got dejta', data);

  return (
    <div className="app-screen">
      <h1>Welcome to your issues!</h1>
      <IssuesTable />
    </div>
  );
}

export default App;
