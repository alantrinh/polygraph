import { useState } from 'react';
import { useQuery, gql } from '@apollo/client'
import LineGraph from './components/LineGraph';
import BarGraph from './components/BarGraph';

const GET_GDP = gql`
  query {
    gdp {
      country
      year
      amount
    }
  }
`;

const GET_RANDOM_GDP = gql`
  query {
    gdp(dataSource: "random") {
      country
      year
      amount
    }
  }
`;

const BUTTON_CLASSES='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-6';

function App() {
  const [graphType, setGraphType] = useState('line');
  const [graphData, setGraphData] = useState('db');

  const { loading, error, data, refetch } = useQuery(graphData === 'db' ? GET_GDP : GET_RANDOM_GDP, { fetchPolicy: GET_RANDOM_GDP ? 'network-only' : 'cache-first' });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <div className="flex flex-col items-center h-96">
        <h1>GDP Per Capita</h1>
        {graphType === 'bar' && <BarGraph data={data} />}
        {graphType === 'line' && <LineGraph data={data} />}
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setGraphType(graphType === 'line' ? 'bar' : 'line')}
          className={BUTTON_CLASSES}
        >
          {`Switch to ${graphType === 'line' ? 'Bar' : 'Line'} Graph`}
        </button>
        <button
          onClick={() => setGraphData(graphData === 'db' ? 'random' : 'db')}
          className={BUTTON_CLASSES}
        >
          {`Use ${graphData === 'db' ? 'Random' : 'Database'} Data`}
        </button>
        <button
          onClick={() => refetch()}
          className={`${BUTTON_CLASSES} ${graphData === 'db' ? 'pointer-events-none opacity-50' : ''}`}
        >
          Refresh Random Data
        </button>
      </div>
    </div>
  )
}

export default App;
