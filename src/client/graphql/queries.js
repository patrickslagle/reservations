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
  query($Reservation: String!) {
    Reservation(Reservation: $Reservation) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

export { queryReservations, queryReservationById };