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

// export function getInterviewersForDay(state, day) {
  
//   let result = [];

//   const filteredInterviewers = state.days.map(d => {
//     if(d.name === day){
//       return d.appointments
//     } 
//   }).flat()

//   if(state.interviewers) {
//     Object.values(state.interviewers).map(interviewer => {
//       if(filteredInterviewers.includes(interviewer.id)) {
//         result.push(interviewer)
//       }
//       return result
//     })
//   }
//   return result
// }; 

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(item => item.name === day);
  if (filteredDay && filteredDay.interviewers.length !== 0) {
    return filteredDay.interviewers.map(app => state.interviewers[app])
  } else {
    return [];
  }
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
