import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData () {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({...state, day });


  // --> All axios API calls <--
  useEffect(() => {
    const apiDays = "/api/days"
    const apiAppoint = "/api/appointments"
    const apiInterviewers = "/api/interviewers"

    Promise.all([
     axios.get(apiDays),
     axios.get(apiAppoint),
     axios.get(apiInterviewers)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  // --> Save function <--
    function bookInterview(id, interview) {    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { 
      interview
    }).then(() => {
      const firstState = { ...state, appointments }
      const remainingSpotsState = spotsRemaining(firstState, firstState.day);
      setState(remainingSpotsState)
    }) 
  }
  
  //--> Delete function <--
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
          ...state.appointments,
          [id]:appointment
        };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const firstState = { ...state, appointments }
      const remainingSpotsState = spotsRemaining(firstState, firstState.day);
      setState(remainingSpotsState)
    })
  }

  //--> Spots remaining <--
  function spotsRemaining(state, day) {
    const remainingDay = day || state.day;
    const objectDay = state.days.find(day => day.name === remainingDay);
    const listId = objectDay.appointments;
    const spots = listId.filter(appointmentID => !state.appointments[appointmentID].interview).length;

    const newDay = {...objectDay, spots};
    const newDays = [...state.days];
    const dayObjIndex = state.days.findIndex(day=> day.name === remainingDay);
    newDays[dayObjIndex] = newDay;
    return{...state, days: newDays};
  }

  return {state, setDay, bookInterview, cancelInterview}
}