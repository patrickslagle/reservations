import { gql } from 'apollo-boost';

const reservations = gql`
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

const reservationById = gql`
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

export { reservations, reservationById };