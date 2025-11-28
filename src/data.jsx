import HarbourviewHall from "/src/assets/HarbourviewHall.png";
import SeasidePavilion from "/src/assets/SeasidePavilion.png";
import GreenGarden from "/src/assets/GreenGarden.png";
import CozyLoft from "/src/assets/CozyLoft.png";

const venues = [
  {
    id: 1,
    venueTypes: ["Wedding", "Party"],
    venueSize: 200,
    city: "St. John's",
    venueName: "Harbourview Hall",
    floorPlanImages: [{ url: HarbourviewHall }],
  },
  {
    id: 2,
    venueTypes: ["Conference", "Meeting"],
    venueSize: 120,
    city: "St. John's",
    venueName: "Seaside Pavilion",
    floorPlanImages: [{ url: SeasidePavilion }],
  },
  {
    id: 3,
    venueTypes: ["Party", "Gathering"],
    venueSize: 80,
    city: "Mount Pearl",
    venueName: "Green Garden",
    floorPlanImages: [{ url: GreenGarden }],
  },
  {
    id: 4,
    venueTypes: ["Wedding", "Intimate"],
    venueSize: 50,
    city: "Avalon",
    venueName: "Cozy Loft",
    floorPlanImages: [{ url: CozyLoft }],
  },
];

export default venues;
