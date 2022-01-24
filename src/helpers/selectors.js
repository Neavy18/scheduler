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
