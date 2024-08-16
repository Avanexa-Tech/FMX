import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import FMXHeader from './components/header/FMXHeader';
import WorkOrder from './components/work-order/WorkOrder';

function App() {

  return (
    <>
      <div className='fmx-product'>
        <Sidebar />
        <div className='fmx-page-container'>
          <FMXHeader/>
          <WorkOrder/>
        </div>
      </div>
    </>
  );
}

export default App
