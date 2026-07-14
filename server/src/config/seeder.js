const Destination = require('../models/Destination');

const sampleDestinations = [
  {
    name: 'Kyoto',
    location: 'Kyoto, Japan',
    imageUrl: '/images/kyoto.jpg',
    rating: 4.9,
    description: 'Immerse yourself in traditional temples, stunning gardens, and classic teahouses.',
    detailedDescription: 'Kyoto is the cultural heart of Japan. From the iconic golden pavilion of Kinkaku-ji to the towering bamboo groves of Arashiyama and the historic streets of Gion, Kyoto offers an unparalleled glimpse into ancient Japanese traditions.',
    highlights: ['Fushimi Inari Shrine', 'Kinkaku-ji Temple', 'Arashiyama Bamboo Grove', 'Gion Historic District'],
    bestTimeToVisit: 'October - November (Autumn Leaves) or April (Cherry Blossom)'
  },
  {
    name: 'Paris',
    location: 'Paris, France',
    imageUrl: '/images/paris.jpg',
    rating: 4.8,
    description: 'Experience romantic bistros, legendary museums, and iconic Parisian architecture.',
    detailedDescription: 'Paris is a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine, featuring world-famous monuments such as the Eiffel Tower and the Notre-Dame cathedral.',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Montmartre'],
    bestTimeToVisit: 'May - September (Spring/Summer)'
  },
  {
    name: 'Rome',
    location: 'Rome, Italy',
    imageUrl: '/images/rome.jpg',
    rating: 4.7,
    description: 'Step back in time amidst historic ruins, spectacular fountains, and unmatched culinary art.',
    detailedDescription: 'Rome is a sprawling cosmopolitan city with nearly 3,000 years of globally influential art, architecture, and culture. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire.',
    highlights: ['The Colosseum', 'Vatican Museums', 'Trevi Fountain', 'The Pantheon'],
    bestTimeToVisit: 'April - June or September - October'
  },
  {
    name: 'Bali',
    location: 'Bali, Indonesia',
    imageUrl: '/images/bali.jpg',
    rating: 4.6,
    description: 'Relax on pristine sandy beaches, visit scenic clifftop temples, and explore tropical forests.',
    detailedDescription: 'Bali is a popular Indonesian island known for its forested volcanic mountains, iconic rice paddies, sandy beaches, and coral reefs. The island is also home to religious sites such as cliffside Uluwatu Temple.',
    highlights: ['Ubud Monkey Forest', 'Uluwatu Temple', 'Tegallalang Rice Terraces', 'Seminyak Beaches'],
    bestTimeToVisit: 'April - October (Dry Season)'
  },
  {
    name: 'Reykjavik',
    location: 'Reykjavik, Iceland',
    imageUrl: '/images/iceland.jpg',
    rating: 4.8,
    description: 'Explore active hot springs, massive volcanic craters, and see the Northern Lights.',
    detailedDescription: 'Reykjavik is the capital of Iceland and home to the National and Saga museums, tracing Iceland’s Viking history. It is the perfect starting point to explore the country’s dramatic landscapes, geysers, and waterfalls.',
    highlights: ['Blue Lagoon Geothermal Spa', 'Hallgrimskirkja Church', 'Golden Circle Route', 'Northern Lights Viewing'],
    bestTimeToVisit: 'September - March (for Northern Lights) or June - August (for Midnight Sun)'
  },
  {
    name: 'Sydney',
    location: 'Sydney, Australia',
    imageUrl: '/images/sydney.jpg',
    rating: 4.6,
    description: 'Surf on famous sandy beaches, tour modern harbor landmarks, and enjoy scenic walks.',
    detailedDescription: 'Sydney, capital of New South Wales and one of Australia’s largest cities, is best known for its Sydney Opera House, with a distinctive sail-like design. The massive Darling Harbour and the smaller Circular Quay port are hubs of waterside life.',
    highlights: ['Sydney Opera House', 'Sydney Harbour Bridge', 'Bondi Beach', 'Darling Harbour'],
    bestTimeToVisit: 'September - November or March - May'
  },
  {
    name: 'New York City',
    location: 'New York, USA',
    imageUrl: '/images/new_york.jpg',
    rating: 4.7,
    description: 'Enjoy world-class Broadway shows, wander green park paths, and view towering city skyscrapers.',
    detailedDescription: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that is among the world’s major commercial, financial, and cultural centers.',
    highlights: ['Empire State Building', 'Central Park', 'Times Square & Broadway', 'Statue of Liberty'],
    bestTimeToVisit: 'September - November (Autumn) or December (Holiday Season)'
  },
  {
    name: 'Cairo',
    location: 'Cairo, Egypt',
    imageUrl: '/images/cairo.jpg',
    rating: 4.5,
    description: 'Gaze at ancient towering pyramids, visit bustling marketplaces, and explore historic museums.',
    detailedDescription: 'Cairo, Egypt’s dusty capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum, a trove of antiquities including royal mummies and gilded King Tutankhamun artifacts.',
    highlights: ['Pyramids of Giza', 'The Egyptian Museum', 'Khan el-Khalili Bazaar', 'Al-Azhar Mosque'],
    bestTimeToVisit: 'October - April (Cooler Weather)'
  }
];

const seedDestinations = async () => {
  try {
    const count = await Destination.countDocuments();
    if (count === 0) {
      await Destination.insertMany(sampleDestinations);
      console.log('Database successfully seeded with 8 sample destinations!');
    }
  } catch (error) {
    console.error(`Error seeding destinations database: ${error.message}`);
  }
};

module.exports = seedDestinations;
