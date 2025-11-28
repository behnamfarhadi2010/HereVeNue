import HarbourviewHall from "/src/assets/HarbourviewHall.png";
import SeasidePavilion from "/src/assets/SeasidePavilion.png";
import GreenGarden from "/src/assets/GreenGarden.png";
import CozyLoft from "/src/assets/CozyLoft.png";

const venues = [
  {
    id: 1,
    eventType: "Wedding",
    guests: 200,
    city: "St. John's",
    title: "Harbourview Hall",
    image: HarbourviewHall,
  },
  {
    id: 2,
    eventType: "Conference",
    guests: 120,
    city: "St. John's",
    title: "Seaside Pavilion",
    image: SeasidePavilion,
  },
  {
    id: 3,
    eventType: "Party",
    guests: 80,
    city: "Mount Pearl",
    title: "Green Garden",
    image: GreenGarden,
  },
  {
    id: 4,
    eventType: "Wedding",
    guests: 50,
    city: "Avalon",
    title: "Cozy Loft",
    image: CozyLoft,
  },
];

export default venues;
