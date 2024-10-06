import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';


//Code splitting
const HomePage = React.lazy(() => import('./components/HomePage'));

const App = () => {
  return (
    //Routes
    <Router>
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <ClipLoader color="#36D7B7" size={50} />
        </div>
      }>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App