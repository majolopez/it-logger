
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from '../../actions/techActions' 
import TechItem from './TechItem';

const TechListModal = ( {getTechs, tech: { techs, loading}}) => {
  useEffect(()=>{
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technitian List</h4>
        <ul className="collection with-header">
          {!loading && techs === null  ? (<p className="center">No logs to show</p>):
          ( !loading &&
            techs !== null && techs.map(tech => <TechItem tech={tech} key={tech._id}/>)
          )
          }
        </ul>
      </div>
    </div>
    
  )
}
TechListModal.propTypes = {
  getTechs: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  tech: state.tech
});
export default connect(mapStateToProps, { getTechs }) (TechListModal)
