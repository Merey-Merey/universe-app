import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

const jobs = [
  {
    title: "Frontend Developer",
    company: "Kaspi.kz",
    companyLogo: "K",
    companyColor: "#E84B2A",
    type: "Full-time",
    mode: "Hybrid",
    salary: "₸400k–600k",
    location: "Almaty",
    skills: ["React", "TypeScript", "CSS"],
    description: "Join Kaspi's product team and build interfaces used by millions.",
    accentColor: "#E84B2A",
    featured: true,
  },
  {
    title: "UI/UX Designer",
    company: "Kolesa Group",
    companyLogo: "KG",
    companyColor: "#2563EB",
    type: "Full-time",
    mode: "Remote",
    salary: "₸300k–450k",
    location: "Shymkent",
    skills: ["Figma", "Prototyping", "User Research"],
    description: "Design beautiful, user-centered experiences for our automotive platform.",
    accentColor: "#2563EB",
  },
  {
    title: "Backend Intern",
    company: "Jusan Bank",
    companyLogo: "J",
    companyColor: "#059669",
    type: "Internship",
    mode: "On-site",
    salary: "₸150k–200k",
    location: "Nur-Sultan",
    skills: ["Node.js", "PostgreSQL", "REST API"],
    description: "Great opportunity to learn backend development in a fintech environment.",
    accentColor: "#059669",
  },
];

const announcements = [
  {
    title: "SKSU Scholarship 2026",
    body: "South Kazakhstan State University opens applications for merit-based scholarships covering 100% tuition.",
    category: "Scholarship",
    amount: "₸750,000",
    deadline: "May 20, 2026",
    tags: ["SKSU", "Scholarship", "Deadline soon"],
    urgent: true,
  },
  {
    title: "Hackathon: Build for KZ",
    body: "48-hour hackathon for student developers. Build solutions for real Kazakh businesses. Prizes up to ₸500k.",
    category: "Hackathon",
    amount: "₸500,000",
    deadline: "May 25, 2026",
    tags: ["Hackathon", "Prize", "Developers"],
  },
  {
    title: "Free English Courses",
    body: "British Council Kazakhstan offers free online English courses for university students. Limited spots available.",
    category: "Education",
    tags: ["English", "Free", "Online"],
  },
];

const housing = [
  {
    name: "Studio near SKSU",
    address: "Al-Farabi St, Shymkent",
    price: "₸60,000",
    priceShort: "₸60k",
    rooms: "1 room",
    area: "32 m²",
    floor: "3rd floor",
    amenities: ["Wi-Fi", "Furnished", "Bills incl.", "Parking"],
    about: "Cozy fully furnished studio, 5 min walk from SKSU. Quiet neighborhood, all utilities included. Perfect for students.",
    available: true,
    lat: 42.3417, lng: 69.5901,
    owner: { name: "Aiman Bekova", initials: "AB", role: "Private landlord", phone: "+7 701 234 5678", whatsapp: "+7 701 234 5678", telegram: "@aiman_bekova" },
  },
  {
    name: "2-room apartment near YUFU",
    address: "Tauke Khan Ave, Shymkent",
    price: "₸120,000",
    priceShort: "₸120k",
    rooms: "2 rooms",
    area: "54 m²",
    floor: "5th floor",
    amenities: ["Wi-Fi", "Parking", "Elevator", "Security"],
    about: "Spacious 2-room apartment in the heart of Shymkent. Modern renovation, new appliances, close to all amenities.",
    available: true,
    lat: 42.32, lng: 69.587,
    owner: { name: "Daniyar Seitkali", initials: "DS", role: "Agency representative", phone: "+7 702 345 6789", whatsapp: "+7 702 345 6789", telegram: "@daniyar_s" },
  },
  {
    name: "Cozy room in shared flat",
    address: "Abay St, Shymkent",
    price: "₸45,000",
    priceShort: "₸45k",
    rooms: "1 room",
    area: "18 m²",
    floor: "2nd floor",
    amenities: ["Wi-Fi", "Bills included", "Mixed"],
    about: "Affordable private room in a friendly shared apartment. Great for students who want company and low costs.",
    available: true,
    lat: 42.31, lng: 69.562,
    owner: { name: "Aliya Nurova", initials: "AN", role: "Private landlord", phone: "+7 705 456 7890", whatsapp: "+7 705 456 7890", telegram: "@aliya_nur" },
  },
  {
    name: "1-room near UniVerse",
    address: "Ryskulov Ave, Shymkent",
    price: "₸75,000",
    priceShort: "₸75k",
    rooms: "1 room",
    area: "38 m²",
    floor: "1st floor",
    amenities: ["Wi-Fi", "Bills incl.", "Quiet area"],
    about: "Neat 1-room apartment just 3 minutes from UniVerse campus. Ideal for focused students who need a quiet space.",
    available: false,
    lat: 42.33, lng: 69.61,
    owner: { name: "Marat Akhmetov", initials: "MA", role: "Private landlord", phone: "+7 707 567 8901", whatsapp: "+7 707 567 8901", telegram: "@marat_a" },
  },
];

const events = [
  {
    day: "Monday, May 12",
    month: "MAY",
    date: 12,
    title: "Tech Career Fair 2026",
    venue: "Shymkent IT Hub",
    time: "10:00 AM",
    category: "Career",
    price: null,
    spots: 200,
    featured: true,
    accentColor: "#4C1D95",
  },
  {
    day: "Saturday, May 17",
    month: "MAY",
    date: 17,
    title: "Startup Pitch Night",
    venue: "UniVerse Hub",
    time: "6:00 PM",
    category: "Startup",
    price: "₸500",
    accentColor: "#4C1D95",
  },
  {
    day: "Friday, May 23",
    month: "MAY",
    date: 23,
    title: "UI/UX Design Workshop",
    venue: "Online · Zoom",
    time: "2:00 PM",
    category: "Design",
    price: null,
    accentColor: "#A78BFA",
  },
  {
    day: "Wednesday, May 28",
    month: "MAY",
    date: 28,
    title: "Student Networking Evening",
    venue: "Rixos Hotel",
    time: "7:00 PM",
    category: "Networking",
    price: "₸1,000",
    accentColor: "#4C1D95",
  },
  {
    day: "Monday, June 1",
    month: "JUN",
    date: 1,
    title: "AI & Future of Work Panel",
    venue: "UniVerse Hub",
    time: "5:00 PM",
    category: "Career",
    price: null,
    accentColor: "#4C1D95",
  },
];

export const seedAllData = async () => {
  console.log("🌱 Seeding Firestore...");

  for (const job of jobs) {
    await addDoc(collection(db, "jobs"), { ...job, createdAt: serverTimestamp() });
  }
  console.log("✅ Jobs seeded");

  for (const ann of announcements) {
    await addDoc(collection(db, "announcements"), { ...ann, createdAt: serverTimestamp() });
  }
  console.log("✅ Announcements seeded");

  for (const h of housing) {
    await addDoc(collection(db, "housing"), { ...h, createdAt: serverTimestamp() });
  }
  console.log("✅ Housing seeded");

  for (const e of events) {
    await addDoc(collection(db, "events"), { ...e, createdAt: serverTimestamp() });
  }
  console.log("✅ Events seeded");

  console.log("🎉 All data seeded successfully!");
};