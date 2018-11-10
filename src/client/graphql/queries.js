const queryReservations = `
  {
    everyReservation {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

const queryReservationById = `
  query($id: String!) {
    reservation(id: $id) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

export { queryReservations, queryReservationById };