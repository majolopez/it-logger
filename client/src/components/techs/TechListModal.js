
import React, {useState, useEffect} from 'react';
import TechItem from './TechItem';

const TechListModal = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getTechs();

    // eslint-disable-next-line
  }, []);

  const getTechs = async () => {
    setLoading(true);
    const res = await fetch('/api/techs');
    const data = await res.json();

    setTechs(data);
    setLoading(false);
  }

  if(loading){
  }

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technitian List</h4>
        <ul className="collection with-header">
          {!loading && techs.length === 0 ? (<p className="center">No logs to show</p>):
          (
            techs.map(tech => <TechItem tech={tech} key={tech._id}/>)
          )
          }
        </ul>
      </div>
    </div>
    
  )
}

export default TechListModal

//<TechItem tech={tech} key={tech._id}/>
