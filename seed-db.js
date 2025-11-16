require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

const dataSchema = new mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String,
});

const planetModel = mongoose.model('planets', dataSchema);

const planets = [
  {
    id: 1,
    name: "Mercury",
    description: "Mercury is the smallest planet in our solar system and closest to the Sun.",
    image: "/images/mercury.png",
    velocity: "47.87 km/s",
    distance: "57.9 million km from Sun"
  },
  {
    id: 2,
    name: "Venus",
    description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor.",
    image: "/images/venus.png",
    velocity: "35.02 km/s",
    distance: "108.2 million km from Sun"
  },
  {
    id: 3,
    name: "Earth",
    description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
    image: "/images/earth.png",
    velocity: "29.78 km/s",
    distance: "149.6 million km from Sun"
  },
  {
    id: 4,
    name: "Mars",
    description: "Mars is the fourth planet from the Sun and is often called the Red Planet.",
    image: "/images/mars.png",
    velocity: "24.07 km/s",
    distance: "227.9 million km from Sun"
  },
  {
    id: 5,
    name: "Jupiter",
    description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System.",
    image: "/images/jupiter.png",
    velocity: "13.07 km/s",
    distance: "778.5 million km from Sun"
  },
  {
    id: 6,
    name: "Saturn",
    description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System.",
    image: "/images/saturn.png",
    velocity: "9.69 km/s",
    distance: "1.43 billion km from Sun"
  },
  {
    id: 7,
    name: "Uranus",
    description: "Uranus is the seventh planet from the Sun and has the third-largest diameter.",
    image: "/images/uranus.png",
    velocity: "6.81 km/s",
    distance: "2.87 billion km from Sun"
  },
  {
    id: 8,
    name: "Neptune",
    description: "Neptune is the eighth and farthest known planet from the Sun in the Solar System.",
    image: "/images/neptune.png",
    velocity: "5.43 km/s",
    distance: "4.50 billion km from Sun"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
    });
    console.log("MongoDB connection successful");

    // Clear existing planets
    await planetModel.deleteMany({});
    console.log("Cleared existing planets");

    // Insert new planets
    await planetModel.insertMany(planets);
    console.log("Successfully seeded database with 8 planets");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();