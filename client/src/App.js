import React, {useEffect, Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import SearchBar from './components/layout/SearchBar';
import './App.css';
import Logs from './components/logs/Logs';
import Addbtn from './components/layout/AbbBtn'
import AddLogModal from './components/logs/AddLogModal'
import EditLogModal from './components/logs/EditLogModal'
import AddTechModal from './components/techs/AddTechModal'
import TechListModal from './components/techs/TechListModal'
import { Provider } from 'react-redux';
import store from './store';
const App = () => {
  useEffect(()=>{
    //Init Materializr JS
    M.AutoInit();
  })
  return (
    <Provider store={store}>
      <Fragment>
      <SearchBar/>
      <div className="container">
        <Addbtn/>
        <AddLogModal/>
        <EditLogModal/>
        <AddTechModal/>
        <TechListModal/>
        <Logs/>
      </div>
      </Fragment>
    </Provider>
    
  );
}

export default App;
