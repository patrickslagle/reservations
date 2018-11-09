import { gql } from 'apollo-boost';

const queryEveryReservation = gql`
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

const queryReservationById = gql`
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

export { queryEveryReservation, queryReservationById };