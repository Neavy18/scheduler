/* ---------> Get APPOINTMENTS for the day <--------- */

export function getAppointmentsForDay(state, day) {
  
  let result = [];

  const filteredAppointments = state.days.map(d => {
    if(d.name === day){
      return d.appointments
    } else {return []}
  }).flat()

  if(state.appointments) {
    Object.values(state.appointments).map(appointment => {
      if(filteredAppointments.includes(appointment.id)) {
        result.push(appointment)
      }
      return result
    })
  }
  return result
}; 

/* ---------> Get INTERVIEWERS for the day <--------- */

export function getInterviewersForDay(state, day) {
  
  let result = [];

  const filteredInterviewers = state.days.map(d => {
    if(d.name === day){
      return d.appointments
    } else {return []}
  }).flat()

  if(state.interviewers) {
    Object.values(state.interviewers).map(interviewer => {
      console.log("this is interviewer ----->", interviewer.id);
      if(filteredInterviewers.includes(interviewer.id)) {
        result.push(interviewer)
      }
      return result
    })
  }
  return result
}; 

/* ---------> Get INTERVIEWS for the day <--------- */
export function getInterview(state, interview) {
  let resultObj = {};
  
  if(interview){
    Object.values(state.interviewers).map(interviewer => {
        if(interviewer.id === interview.interviewer){
          resultObj.student = interview.student
          resultObj.interviewer = interviewer
        }
        return resultObj
      });
      return resultObj;
    } else {
      return null
    }
  };
