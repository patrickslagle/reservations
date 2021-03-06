const addReservationMutation = `
  mutation($name: String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!) {
    addReservation(name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

const deleteReservationMutation = `
  mutation($id: String!){
    deleteReservation(id: $id){
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

export {
  addReservationMutation,
  deleteReservationMutation,
};