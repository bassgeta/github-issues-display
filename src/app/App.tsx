import { useGetIssues } from '@data-access/github-api/issues/use-get-issues';

function App() {
  const { data } = useGetIssues();
  console.log('got dejta', data);

  return <div>App!</div>;
}

export default App;
