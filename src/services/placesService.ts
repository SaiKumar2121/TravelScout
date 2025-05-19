
import { Place, Location } from "@/types";
import { calculateDistance, formatDistance } from "./locationService";
import { toast } from "@/components/ui/use-toast";

// Comprehensive data for famous places in India organized by state
const mockPlaces: Place[] = [
  // Uttarakhand
  {
    id: "1",
    name: "Kedarnath Temple",
    description: "Kedarnath is a sacred Hindu town located in the Indian state of Uttarakhand, nestled in the Himalayas near the Mandakini River. It is famous for the Kedarnath Temple, dedicated to Lord Shiva, and is revered as the 11th of the 12 Jyotirlingas—the most sacred Shiva shrines in India. Situated at an altitude of 3,583 meters, Kedarnath is also part of the Char Dham pilgrimage and is known for its spiritual significance, breathtaking mountain views, and challenging treks.",
    imageUrl: "https://images.unsplash.com/photo-1621351183012-9e630a45c1a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.pexels.com/photos/15031440/pexels-photo-15031440.jpeg?cs=srgb&dl=pexels-alok-kumar-273007-15031440.jpg&fm=jpg",
      "https://images.unsplash.com/photo-1623952146070-f13fc902f769?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VkYXJuYXRofGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/515855602/photo/kedarnath-in-india.jpg?s=612x612&w=0&k=20&c=_KmnQbbvqRftKusDTU_JUjVM3V80Mo2jBqaCNx948us=",
      "https://media.istockphoto.com/id/530813962/photo/kedarnath-in-india.jpg?s=612x612&w=0&k=20&c=gVOIye8JuGFyRDfXsZ_3R9WfFc2SVW90W1W1wntwu-U=",
      "https://media.istockphoto.com/id/1209865783/photo/view-of-the-kedarnath-temple-lights-at-night-with-mountains-in-the-background-in-uttarakhand.jpg?s=612x612&w=0&k=20&c=FZmfRT12jMsmr62MrJb7_RetqWcVXba_cLP1psLzzoc=",
      "https://media.istockphoto.com/id/1311174191/photo/mount-nanda-devi-india-himalaya-mountain-landscape.jpg?s=612x612&w=0&k=20&c=EhLdPH0us8ts4Cn8IibWdstyO3K0dOSnslWnJHY3t2Y="
    ],
    location: { latitude: 30.734546027972122, longitude: 79.06711753725709 },
    rating: 4.9,
    category: "Temple",
    features: ["Pilgrimage", "Trekking", "Mountain Views", "Water Falls"],
    state: "Uttarakhand"
  },
  {
    id: "2",
    name: "Valley of Flowers",
    description: "A UNESCO World Heritage Site in Uttarakhand known for its meadows of alpine flowers and outstanding natural beauty. The valley is home to rare and endangered flora and fauna and offers breathtaking trekking experiences.",
    imageUrl: "https://images.unsplash.com/photo-1592385518901-5b4845ab3e0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://www.advenchar.com/wp-content/uploads/2023/02/Valley-of-Flowers-Trek-Advenchar-16.jpg",
      "https://vl-prod-static.b-cdn.net/system/images/000/677/601/3e7f1c632b898211f92e45d7f42d11f5/original/VOF-1.jpg?1682400189",
      "https://rishikeshdaytour.com/blog/wp-content/uploads/2024/03/Valley-of-Flowers-Trek-Distance-Best-Time-to-Visit.jpg"
    ],
    location: { latitude: 30.7283, longitude: 79.6073 },
    rating: 4.8,
    category: "Nature",
    features: ["Alpine Flowers", "Hiking", "Wildlife"],
    state: "Uttarakhand"
  },
  {
    id: "3",
    name: "Rishikesh",
    description: "Looking for contrasting yet equally enchanting Indian getaways? Head north to Rishikesh, where the spiritual heart of yoga beats alongside thrilling river adventures in the majestic Himalayas. Feel the energy of ashrams, witness the captivating Ganga Aarti ceremony on the riverbanks, and challenge yourself with white-water rafting or trekking expeditions into the surrounding mountains. The iconic suspension bridges, Ram Jhula and Lakshman Jhula, offer stunning views and a taste of the local life. Or journey south to Munnar, Kerala's verdant jewel, where rolling hills are draped in emerald tea and mist hangs heavy, inviting peaceful exploration. Wander through endless tea estates, learn about tea processing, and breathe in the fragrant air. Discover cascading waterfalls, trek to panoramic viewpoints like Top Station, and perhaps even soar above the landscape on a zipline. The serene lakes and dams add to the tranquility of this hill station, offering moments of quiet reflection amidst breathtaking scenery. Two distinct landscapes, two unforgettable experiences, each promising a unique connection with India's diverse beauty and culture.",
    
    imageUrl: "https://images.unsplash.com/photo-1591017775916-4f07138e133e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://s7ap1.scene7.com/is/image/incredibleindia/lakshman-jhula-bridge-rishikesh-uttrakhand-city-1-hero?qlt=82&ts=1726646259495",
      "https://cdn-web.firstrek.in/wp-content/uploads/2024/02/Ganga-Aarti-in-Rishikesh.jpg",
      "https://breathedreamgo.com/wp-content/uploads/2020/08/Ganga-Aarti-Ram-Jhula-Rishikesh.jpg",
      "https://i.ytimg.com/vi/rjvv8lv1_4k/sddefault.jpg",
      "https://www.choicemyhotel.com/wp-content/uploads/2017/12/camp-in-rishikesh.jpg",
      "https://5.imimg.com/data5/DH/QK/MY-15337513/river-rafting-and-camping-in-rishikesh.jpeg",
      "https://www.hoteldekho.com/storage/img/tourattraction/1651305640ram%20jhula%20rishikesh.jpg",
      "https://media.istockphoto.com/id/1752927325/photo/lord-shiva-statue-on-the-banks-of-the-sacred-ganges-river-in-rishikesh-india.jpg?s=612x612&w=0&k=20&c=pcO82gl0g3hPejL6pf9X4HhOJ7wwlnmoyxIsQu3aNpc=",
      "https://rishikeshdaytour.com/blog/wp-content/uploads/2024/08/Neer-Waterfalls-in-Rishikesh.jpg",
      "https://vl-prod-static.b-cdn.net/system/images/000/452/434/0d0494f35ef78fac0fd5f96c838b6f47/banner/Rafting-Shivpuri-1.jpg?1709377285"
    ],
    location: { latitude: 30.1087, longitude: 78.2933 },
    rating: 4.7,
    category: "Spiritual",
    features: ["Yoga", "Ganga Aarti", "Laxman Jhula and Ram Jhula", "River Rafting","Bungee Jumping","Giant Swing", "Kayaking", "Camping", "Zipline", "Sky Cycle", "Temples"],
    state: "Uttarakhand"
  },

  // Kerala
  {
    id: "4",
    name: "Munnar Tea Gardens",
    description: "Munnar, a captivating hill station in Kerala's Western Ghats, is renowned for its vast, verdant tea plantations blanketing rolling hills and its perpetually misty atmosphere. This idyllic retreat offers a cool climate and stunning landscapes perfect for exploring endless tea estates, trekking to panoramic viewpoints like Top Station, marveling at beautiful waterfalls, enjoying peaceful boat rides, encountering wildlife in national parks, and engaging in thrilling activities such as ziplining and hiking.",
    imageUrl: "https://images.unsplash.com/photo-1598604213913-9b878f6b9397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://www.holidify.com/images/cmsuploads/compressed/Munnar66_20181211014155.jpg",
      "https://www.trawell.in/blog/wp-content/uploads/2021/08/Kolukkumalai_Tea_Estate_Main.jpg",
      "https://www.stayvista.com/blog/wp-content/uploads/2024/10/sourav-dhar-P4xeyW97gPg-unsplash-1-edited-scaled.jpg",
      "https://www.hlimg.com/images/places2see/738X538/15_1490272451p.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Munnar_hillstation_kerala.jpg",
      "https://www.explorebees.com/uploads/Devikulam.jpg",
      "https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/Paragliding-In-Kerala_6th-jan.jpg",
      "https://www.munnar.holiday/munnartourism/wp-content/uploads/2018/05/Munnar-Waterfalls.png",
      "https://www.munnar.holiday/munnartourism/wp-content/uploads/2018/05/Nyayamakad-Waterfalls.jpg",
      "https://www.munnar.holiday/munnartourism/wp-content/uploads/2018/05/Kuthumkal-Waterfalls.jpg",
      "https://www.munnar.holiday/munnartourism/wp-content/uploads/2018/05/Thoovanam-Waterfalls.jpg"
    ],
    location: { latitude: 10.0889, longitude: 77.0595 },
    rating: 4.7,
    category: "Nature",
    features: ["Tea Plantations", "Hill Station", "Photography", "Zipline", " Paragliding", "Waterfalls"],
    state: "Kerala"
  },
  {
    id: "5",
    name: "Alleppey Backwaters",
    description: "The network of lagoons, lakes, and canals in Kerala, often called the 'Venice of the East'. Famous for its houseboat cruises that offer a glimpse of village life along the serene backwaters surrounded by coconut trees.",
    imageUrl: "https://images.unsplash.com/photo-1578932017755-6f66fe010497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1578932017755-6f66fe010497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580289445498-a05eb71010df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 9.4981, longitude: 76.3388 },
    rating: 4.6,
    category: "Waterscape",
    features: ["Houseboats", "Backwaters", "Village Life"],
    state: "Kerala"
  },
  {
    id: "6",
    name: "Wayanad",
    description: "A lush green hill station in Kerala known for its coffee plantations, wildlife sanctuaries, and ancient caves. The region is dotted with waterfalls, trekking trails, and offers a glimpse into tribal culture.",
    imageUrl: "https://images.unsplash.com/photo-1623936247318-8dba534ebe76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1623936247318-8dba534ebe76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600703090899-c93d017862b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1621622646238-2302977f9740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 11.6854, longitude: 76.1320 },
    rating: 4.6,
    category: "Hill Station",
    features: ["Wildlife", "Coffee Plantations", "Trekking"],
    state: "Kerala"
  },

  // Tamil Nadu
  {
    id: "7",
    name: "Meenakshi Amman Temple",
    description: "A historic Hindu temple located in Madurai, Tamil Nadu. Known for its stunning Dravidian architecture with thousands of colorful sculptures, towering gopurams (gateway towers), and intricate art that depicts ancient tales.",
    imageUrl: "https://images.unsplash.com/photo-1604171598147-e2f249d5d907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1604171598147-e2f249d5d907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1621397323368-8a5c7983d357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1573555657105-74c0c73208a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 9.9195, longitude: 78.1193 },
    rating: 4.8,
    category: "Temple",
    features: ["Architecture", "History", "Sculptures"],
    state: "Tamil Nadu"
  },
  {
    id: "8",
    name: "Ooty",
    description: "A popular hill station in the Nilgiri hills of Tamil Nadu, known for its tea gardens, colonial architecture, and pleasant weather. The toy train ride through the hills is a major attraction.",
    imageUrl: "https://images.unsplash.com/photo-1583057341924-14a609bee94b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1583057341924-14a609bee94b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583656698682-8cd505f09ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1627301517642-8c913f1b1ab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 11.4064, longitude: 76.6932 },
    rating: 4.5,
    category: "Hill Station",
    features: ["Tea Gardens", "Toy Train", "Botanical Gardens"],
    state: "Tamil Nadu"
  },

  // Uttar Pradesh
  {
    id: "9",
    name: "Taj Mahal",
    description: "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. Built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal, it is one of the world's most iconic monuments and a symbol of India's rich history.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 27.1751, longitude: 78.0421 },
    rating: 4.9,
    category: "Monument",
    features: ["Architecture", "History", "UNESCO Site"],
    state: "Uttar Pradesh"
  },
  {
    id: "10",
    name: "Varanasi Ghats",
    description: "The sacred ghats of Varanasi along the river Ganges, where spiritual ceremonies, cremations, and daily rituals take place. These ancient steps leading to the water are central to Hindu religious practices and offer a unique cultural experience.",
    imageUrl: "https://images.unsplash.com/photo-1561693326-73866365e515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1561693326-73866365e515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567445480962-ba642b3c3927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 25.3176, longitude: 83.0106 },
    rating: 4.7,
    category: "Spiritual",
    features: ["Ghats", "Boat Rides", "Evening Aarti"],
    state: "Uttar Pradesh"
  },

  // Goa
  {
    id: "11",
    name: "Goa Beaches",
    description: "Famous for its pristine beaches, nightlife, and laid-back coastal atmosphere. Goa's beaches range from popular spots with water sports and beach shacks to secluded stretches perfect for relaxation.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577472153505-5a7df2d74c5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1528493448633-7ba8d62a5878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 15.2993, longitude: 74.1240 },
    rating: 4.6,
    category: "Beach",
    features: ["Beaches", "Nightlife", "Water Sports"],
    state: "Goa"
  },
  {
    id: "12",
    name: "Basilica of Bom Jesus",
    description: "A UNESCO World Heritage Site in Goa housing the mortal remains of St. Francis Xavier. This baroque architecture marvel is one of the best examples of Jesuit architecture in India and attracts visitors for its historical and religious significance.",
    imageUrl: "https://images.unsplash.com/photo-1533114282175-fa7e7c22609c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1533114282175-fa7e7c22609c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581326173213-4d009541a295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 15.5009, longitude: 73.9125 },
    rating: 4.5,
    category: "Historical",
    features: ["Church", "Architecture", "Religious Site"],
    state: "Goa"
  },

  // West Bengal
  {
    id: "13",
    name: "Darjeeling Tea Estates",
    description: "Famous for its tea plantations and the spectacular view of Mount Kanchenjunga, the third highest peak in the world. The toy train, colonial architecture, and vibrant local culture make it a perfect hill station getaway.",
    imageUrl: "https://images.unsplash.com/photo-1544234605-161726706c1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544234605-161726706c1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535535113570-834833933b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1563775581598-5ab874490465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 27.0410, longitude: 88.2663 },
    rating: 4.7,
    category: "Hill Station",
    features: ["Tea Gardens", "Mountain Views", "Colonial Heritage"],
    state: "West Bengal"
  },
  {
    id: "14",
    name: "Victoria Memorial",
    description: "A magnificent white marble building in Kolkata dedicated to Queen Victoria. The museum inside houses a collection of colonial-era artifacts, paintings, and exhibits that showcase the history of British rule in India.",
    imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1568652449083-03ad476e4220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1624005340764-efa67e3a7014?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 22.5448, longitude: 88.3426 },
    rating: 4.7,
    category: "Historical",
    features: ["Museum", "Architecture", "Gardens"],
    state: "West Bengal"
  },

  // Rajasthan
  {
    id: "15",
    name: "Jaipur City Palace",
    description: "A stunning blend of Rajasthani and Mughal architecture in the Pink City of Jaipur. The palace complex includes courtyards, gardens, and buildings that were once the seat of the Maharaja of Jaipur.",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1587295656906-b242aeeb9a82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 26.9255, longitude: 75.8236 },
    rating: 4.6,
    category: "Palace",
    features: ["Architecture", "Museum", "Royal Heritage"],
    state: "Rajasthan"
  },
  {
    id: "16",
    name: "Udaipur Lake Palace",
    description: "A luxury hotel situated on an island in Lake Pichola, Udaipur. Originally built as a royal summer palace, it is now one of the most romantic hotels in the world, offering spectacular views of the lake and surrounding mountains.",
    imageUrl: "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1601281080048-59f20e443d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1562832135-14a35d25edef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 24.5754, longitude: 73.6810 },
    rating: 4.9,
    category: "Palace",
    features: ["Luxury Hotel", "Lake Views", "Royal Experience"],
    state: "Rajasthan"
  },

  // Maharashtra
  {
    id: "17",
    name: "Gateway of India",
    description: "An iconic arch monument in Mumbai built during the British Raj. This seaside landmark commemorates the visit of King George V and Queen Mary and is a popular spot for tourists and locals alike.",
    imageUrl: "https://images.unsplash.com/photo-1567384384024-08582f0a501f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1567384384024-08582f0a501f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 18.9217, longitude: 72.8347 },
    rating: 4.6,
    category: "Monument",
    features: ["Architecture", "Harbor Views", "Historical Site"],
    state: "Maharashtra"
  },
  {
    id: "18",
    name: "Ajanta and Ellora Caves",
    description: "UNESCO World Heritage sites near Aurangabad featuring rock-cut Buddhist, Hindu, and Jain cave temples. The Ajanta caves contain paintings and sculptures considered masterpieces of Buddhist religious art, while Ellora showcases the largest single monolithic excavation in the world.",
    imageUrl: "https://images.unsplash.com/photo-1590077082429-ebfae123add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1590077082429-ebfae123add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618309686144-0c8e2b7a782f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585128903994-4d42c3df3053?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    location: { latitude: 20.5519, longitude: 75.7032 },
    rating: 4.8,
    category: "Historical",
    features: ["Cave Temples", "Rock-cut Architecture", "Ancient Art"],
    state: "Maharashtra"
  }
];

export const getNearbyPlaces = async (
  selectedState: string | null = null
): Promise<Place[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // Filter by state if selected
    let filteredPlaces = selectedState 
      ? mockPlaces.filter(place => place.state === selectedState)
      : mockPlaces;
    
    return filteredPlaces;
  } catch (error) {
    console.error("Error fetching places:", error);
    toast({
      title: "Error",
      description: "Failed to fetch places",
      variant: "destructive"
    });
    return [];
  }
};

export const getPlaceById = async (id: string): Promise<Place | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlaces.find(place => place.id === id);
};

export const getPlaceCategories = (): string[] => {
  const categories = mockPlaces.map(place => place.category);
  return [...new Set(categories)];
};

export const getPlaceStates = (): string[] => {
  const states = mockPlaces.map(place => place.state);
  return [...new Set(states)];
};
