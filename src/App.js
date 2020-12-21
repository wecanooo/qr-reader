import React from 'react'
import QrReader from 'react-qr-reader'

function App() {
  const [data, setData] = React.useState('')

  const handleError = err => {
    console.error(err)
  }

  return (
    <div className="App">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={data => setData(data)}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </div>
  );
}

export default App;
