import { 
        GET_LOGS, 
        SET_LOADING, 
        LOGS_ERROR, 
        SEARCH_LOG,
        ADD_LOG, 
        DELETE_LOG, 
        SET_CURRENT, 
        CLEAR_CURRENT,
        UPDATE_LOG } from './types';

//get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/api/logs');
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
}

//add new log
export const addLog = (log) => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/api/logs',{ 
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
}

//Delete logs from server
export const deleteLog = (id) => async dispatch => {
  try {
    setLoading();
    await fetch(`/api/logs/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
}

//Update log
export const updateLog = (log) => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/api/logs/${log._id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
}

//get logs from server
export const searchLogs = (text) => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/api/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
}

//Set current log
export const setCurrent = log =>{
  return {
    type: SET_CURRENT,
    payload: log
  }
} 

//Clear current log
export const clearCurrent = log =>{
  return {
    type: CLEAR_CURRENT
  }
} 

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}