import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  Download,
  Film,
  Globe2,
  Heart,
  LogIn,
  LogOut,
  Luggage,
  Mail,
  MapPin,
  Menu,
  Minus,
  Pause,
  Plane,
  Play,
  Plus,
  QrCode,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SkipForward,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Star,
  Trash2,
  User,
  Users,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import './styles.css';

const countries = [
  { name: 'India', code: 'IN', place: 'Agra · Rajasthan · Kerala', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=78', price: 'from ₹18,900', tag: 'Heritage' },
  { name: 'Switzerland', code: 'CH', place: 'Zermatt · Lucerne · Interlaken', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=78', price: 'from ₹74,500', tag: 'Alpine' },
  { name: 'Japan', code: 'JP', place: 'Tokyo · Kyoto · Hakone', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=78', price: 'from ₹68,900', tag: 'Culture' },
  { name: 'Iceland', code: 'IS', place: 'Reykjavík · Vík · Blue Lagoon', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1400&q=78', price: 'from ₹81,200', tag: 'Wild' },
  { name: 'Dubai', code: 'AE', place: 'Dubai · Abu Dhabi · Desert', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=78', price: 'from ₹31,500', tag: 'Luxury' },
  { name: 'Italy', code: 'IT', place: 'Rome · Florence · Amalfi', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1400&q=78', price: 'from ₹76,800', tag: 'Classic' }
];

const packages = [
  {
    id: 'himalayan-escape',
    country: 'India',
    title: 'Himalayan High Altitude Escape',
    meta: '6 nights · India',
    nights: 6,
    price: '₹32,900',
    numericPrice: 32900,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=78',
    rating: '4.9',
    type: 'Adventure',
    inclusions: ['Mountain Resort Stay', 'Private 4x4 Chauffeur', 'Guided Monastery Walks', 'All Breakfasts & Dinners', 'Permits Included'],
    days: [
      { day: '01', title: 'Arrival in Manali Valley', time: '10:00', desc: 'Private transfer to alpine chalet · welcome traditional tea · acclimating walk' },
      { day: '02', title: 'Solang Valley & Rohtang Pass', time: '08:30', desc: 'Snowline exploration, glacier viewpoint, hot springs bath in Vashisht' },
      { day: '03', title: 'Spiti Border Exploration', time: '09:00', desc: 'Scenic mountain crossing, ancient mud monasteries and mountain lake visit' },
      { day: '04', title: 'Old Manali Craft Trail', time: '11:00', desc: 'Artisanal shawl weavers, cedar forests, and evening fireside dinner' },
      { day: '05', title: 'Naggar Castle & Heritage Walk', time: '09:30', desc: 'Nicholas Roerich art estate, traditional wooden Himalayan architecture' },
      { day: '06', title: 'Sunset at Jagatsukh & Departure', time: '12:00', desc: 'Farewell breakfast, souvenir market stop, airport/station transfer' }
    ]
  },
  {
    id: 'swiss-grand-tour',
    country: 'Switzerland',
    title: 'Swiss Alpine Panoramic Grand Tour',
    meta: '8 nights · Switzerland',
    nights: 8,
    price: '₹1,12,500',
    numericPrice: 112500,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=78',
    rating: '4.8',
    type: 'Alpine',
    inclusions: ['First-Class Swiss Travel Pass', 'Matterhorn Glacier Paradise Ticket', 'Lake Lucerne Cruise', '4★ Alpine Hotels', 'Daily Breakfast'],
    days: [
      { day: '01', title: 'Arrive in Zürich & Old Town', time: '09:30', desc: 'Airport welcome · panoramic lake walk · Lindt Home of Chocolate pass' },
      { day: '02', title: 'Lucerne & Steamboat Cruise', time: '10:00', desc: 'Chapel Bridge stroll, Mount Pilatus cogwheel railway ascent' },
      { day: '03', title: 'Interlaken & Jungfraujoch', time: '08:00', desc: 'Top of Europe glacier experience, Ice Palace, Eiger trail viewpoint' },
      { day: '04', title: 'Lauterbrunnen 72 Waterfalls', time: '10:30', desc: 'Valley of waterfalls, Trümmelbach falls, traditional fondue lunch' },
      { day: '05', title: 'Zermatt & The Matterhorn', time: '09:00', desc: 'Car-free alpine village, Gornergrat mountain railway, reflection lakes' },
      { day: '06', title: 'Glacier Express Scenic Journey', time: '08:45', desc: 'Panoramic carriage through Swiss valleys and snow-dusted viaducts' },
      { day: '07', title: 'Geneva Lakeside & Watchmaking', time: '11:00', desc: 'Old Town cathedral, Jet d’Eau fountain, private boutique tour' },
      { day: '08', title: 'Departure from Geneva', time: '12:30', desc: 'Farewell Swiss chocolate tasting, transfer to Geneva Cointrin airport' }
    ]
  },
  {
    id: 'japan-after-dark',
    country: 'Japan',
    title: 'Japan After Dark: Tokyo to Kyoto',
    meta: '7 nights · Japan',
    nights: 7,
    price: '₹96,400',
    numericPrice: 96400,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=78',
    rating: '4.9',
    type: 'Culture',
    inclusions: ['Shinkansen Bullet Train Passes', 'Traditional Ryokan with Onsen', 'Tokyo Night Food Walk', 'Tea Ceremony in Gion', 'Pocket Wi-Fi & IC Card'],
    days: [
      { day: '01', title: 'Tokyo / Shinjuku Neon Welcome', time: '15:00', desc: 'Check in to Shinjuku hotel, evening Omoide Yokocho izakaya food tour' },
      { day: '02', title: 'Asakusa & Shibuya Crossing', time: '09:30', desc: 'Senso-ji temple morning ritual, Meiji Shrine, Shibuya Sky panoramic deck' },
      { day: '03', title: 'Hakone Hot Springs & Mt. Fuji View', time: '08:30', desc: 'Hakone ropeway, Lake Ashi pirate ship cruise, open-air onsen bath' },
      { day: '04', title: 'Shinkansen Bullet Train to Kyoto', time: '10:00', desc: 'High-speed transit (320 km/h) · check into machiya townhouse in Gion' },
      { day: '05', title: 'Arashiyama Bamboo & Fushimi Inari', time: '07:30', desc: 'Early morning 10,000 torii gates walk, Sagano romantic train ride' },
      { day: '06', title: 'Nara Deer Park & Sake Brewery', time: '10:00', desc: 'Todai-ji giant Buddha, sacred bowing deer, artisan sake tasting' },
      { day: '07', title: 'Kyoto Farewell & Osaka Transit', time: '12:00', desc: 'Nishiki Market gourmet stroll, bullet train transfer to Kansai International' }
    ]
  },
  {
    id: 'royal-rajasthan',
    country: 'India',
    title: 'Royal Rajasthan: Palaces & Desert Forts',
    meta: '7 nights · India',
    nights: 7,
    price: '₹28,500',
    numericPrice: 28500,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=78',
    rating: '4.9',
    type: 'Heritage',
    inclusions: ['Heritage Haveli Stays', 'Private Air-Conditioned SUV', 'Thar Desert Luxury Glamping', 'Sunset Camel Safari', 'Palace Entry Passes'],
    days: [
      { day: '01', title: 'Jaipur Pink City Check-in', time: '11:00', desc: 'Traditional royal welcome with marigold garlands, Hawa Mahal sunset tea' },
      { day: '02', title: 'Amer Fort & City Palace', time: '09:00', desc: 'Elephant pathways at Amer, Sheesh Mahal mirror palace, royal observatory' },
      { day: '03', title: 'Drive to Blue City Jodhpur', time: '08:30', desc: 'Mehrangarh Fort ramparts, blue alleyway photography walk, stepwell cafe' },
      { day: '04', title: 'Jaisalmer Golden Dunes Camp', time: '10:00', desc: 'Sam sand dunes camel ride, folk Kalbelia fire dancers, stargazing dinner' },
      { day: '05', title: 'Jaisalmer Living Fort', time: '09:30', desc: 'Intricately carved sandstone Jain temples and royal cenotaphs' },
      { day: '06', title: 'Udaipur City of Lakes', time: '12:00', desc: 'Lake Pichola boat cruise past Taj Lake Palace, Bagore Ki Haveli show' },
      { day: '07', title: 'Jag Mandir & Royal Farewell', time: '10:30', desc: 'Saheliyon-ki-Bari gardens, souvenir silver shopping, Udaipur airport drop' }
    ]
  },
  {
    id: 'nordic-aurora',
    country: 'Iceland',
    title: 'Nordic Aurora & Glacial Ice Caves',
    meta: '5 nights · Iceland',
    nights: 5,
    price: '₹89,200',
    numericPrice: 89200,
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=78',
    rating: '4.9',
    type: 'Wild',
    inclusions: ['Northern Lights Chaser Tour', 'Blue Lagoon Premium Admission', 'Super-Jeep Glacier Safaris', 'Vatnajökull Ice Cave Entry', 'Thermal Lodge Stays'],
    days: [
      { day: '01', title: 'Reykjavík & Blue Lagoon Retreat', time: '13:00', desc: 'Geothermal mineral bath, silica mud mask, check into coastal lodge' },
      { day: '02', title: 'The Golden Circle Route', time: '09:00', desc: 'Thingvellir tectonic fissure, Strokkur erupting geyser, Gullfoss golden falls' },
      { day: '03', title: 'South Coast & Black Sand Beach', time: '08:30', desc: 'Seljalandsfoss walk-behind waterfall, Reynisfjara basalt columns in Vík' },
      { day: '04', title: 'Vatnajökull Blue Ice Cave', time: '09:30', desc: 'Crampon hike into deep crystal sapphire caves, Diamond Beach icebergs' },
      { day: '05', title: 'Aurora Stargazing & Departure', time: '11:00', desc: 'Private astronomy guide, thermal pool dip, Keflavík airport farewell' }
    ]
  },
  {
    id: 'amalfi-coast',
    country: 'Italy',
    title: 'Amalfi Coast & Capri Azure Voyage',
    meta: '6 nights · Italy',
    nights: 6,
    price: '₹84,000',
    numericPrice: 84000,
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=78',
    rating: '4.8',
    type: 'Scenic',
    inclusions: ['Cliffside Sea-View Hotel', 'Private Speedboat to Capri Island', 'Limoncello Orchard Tasting', 'Naples Pizza Masterclass', 'All Transfers'],
    days: [
      { day: '01', title: 'Naples to Sorrento Coastal Drive', time: '12:00', desc: 'Scenic cliff drive, welcome Aperol spritz overlooking Gulf of Naples' },
      { day: '02', title: 'Positano Pastel Village Day', time: '10:00', desc: 'Spiaggia Grande beach, cliffside boutiques, seafood dinner at cliff terrace' },
      { day: '03', title: 'Capri & Blue Grotto by Private Boat', time: '09:00', desc: 'Faraglioni sea stacks swim, Anacapri chairlift to Mount Solaro' },
      { day: '04', title: 'Ravello Cliff Gardens & Amalfi Duomo', time: '10:30', desc: 'Villa Rufolo infinity terrace, 11th-century cathedral of St. Andrew' },
      { day: '05', title: 'Path of the Gods Mountain Hike', time: '08:30', desc: 'Spectacular ridgeline trail above Mediterranean waters with picnic lunch' },
      { day: '06', title: 'Pompeii Ruins & Departure', time: '09:30', desc: 'Skip-the-line archaeologist tour of ancient Roman city, Naples airport drop' }
    ]
  },
  {
    id: 'dubai-luxury',
    country: 'Dubai',
    title: 'Dubai Starlight & Desert Oasis',
    meta: '5 nights · Dubai',
    nights: 5,
    price: '₹38,900',
    numericPrice: 38900,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=78',
    rating: '4.7',
    type: 'Luxury',
    inclusions: ['5★ Marina Hotel Suite', 'Burj Khalifa Top Lounge Ticket', 'VIP Desert Safari & BBQ', 'Private Marina Yacht Cruise', 'Daily Breakfast Buffet'],
    days: [
      { day: '01', title: 'Arrival & Dubai Marina Skyline', time: '14:00', desc: 'Luxury airport pickup, sunset yacht cruise around Palm Jumeirah' },
      { day: '02', title: 'Burj Khalifa & Downtown Fountains', time: '10:00', desc: '148th floor sky lounge, Dubai Mall aquarium, dancing fountains show' },
      { day: '03', title: 'Old Dubai & Gold Souk Abra Ride', time: '09:30', desc: 'Traditional spice souk, wooden water taxi, Al Fahidi historic district' },
      { day: '04', title: 'Red Dunes Safari & Falconry Camp', time: '15:30', desc: '4x4 dune bashing, sandboarding, gourmet Arabian barbecue under the stars' },
      { day: '05', title: 'Museum of the Future & Departure', time: '11:00', desc: 'Architectural marvel tour, duty-free shopping, airport private transfer' }
    ]
  },
  {
    id: 'kerala-backwaters',
    country: 'India',
    title: 'Kerala Backwaters & Misty Tea Trails',
    meta: '6 nights · India',
    nights: 6,
    price: '₹24,000',
    numericPrice: 24000,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=78',
    rating: '4.9',
    type: 'Heritage',
    inclusions: ['Private Houseboat Cruise in Alleppey', 'Tea Plantation Villa in Munnar', 'Authentic Ayurvedic Spa Massage', 'Kathakali Dance Show', 'All Meals Onboard'],
    days: [
      { day: '01', title: 'Kochi Heritage Harbor Check-in', time: '11:00', desc: 'Chinese fishing nets sunset, Fort Kochi colonial spice warehouse cafe' },
      { day: '02', title: 'Munnar Misty Tea Valleys', time: '08:30', desc: 'Waterfalls along the Ghats, Kolukkumalai tea estate walking tour' },
      { day: '03', title: 'Eravikulam Wildlife & Anamudi', time: '09:00', desc: 'Nilgiri Tahr spotting, spice garden tour with fresh cardamom and vanilla' },
      { day: '04', title: 'Alleppey Luxury Houseboat Boarding', time: '12:00', desc: 'Glide through palm-fringed canals, freshly caught Karimeen fish lunch' },
      { day: '05', title: 'Marari Beach Ayurvedic Rejuvenation', time: '10:00', desc: 'Herbal oil Abhyanga massage, serene white sand coastline walk' },
      { day: '06', title: 'Kochi Souvenirs & Departure', time: '11:30', desc: 'Jew Town antiques, spice shopping, Kochi International airport transfer' }
    ]
  }
];

const itinerariesData = {
  Switzerland: {
    duration: '8 DAYS · 7 NIGHTS',
    dates: 'JUN 14 — JUN 22',
    days: [
      { num: '01', title: 'Arrive in Zürich', sub: 'Airport transfer · luxury lake hotel check-in', time: '09:30' },
      { num: '02', title: 'Lucerne & Lake Cruise', sub: 'Historic wooden bridge · Mount Pilatus cogwheel ascent', time: '10:00' },
      { num: '03', title: 'Interlaken · Alps Day', sub: 'Jungfraujoch mountain rail · glacier ice palace guided hike', time: '08:45' },
      { num: '04', title: 'Zermatt & The Matterhorn', sub: 'Car-free alpine paradise · Gornergrat panorama train', time: '10:15' },
      { num: '05', title: 'Glacier Express Scenic Journey', sub: 'Panoramic luxury rail across 291 bridges and 91 tunnels', time: '09:00' }
    ]
  },
  Japan: {
    duration: '7 DAYS · 6 NIGHTS',
    dates: 'OCT 10 — OCT 17',
    days: [
      { num: '01', title: 'Tokyo Shinjuku Arrival', sub: 'Private hotel check-in · evening Omoide Yokocho lantern walk', time: '14:00' },
      { num: '02', title: 'Meiji Shrine & Shibuya Crossing', sub: 'Ancient cedar forest shrine · Shibuya Sky 360° observation', time: '09:30' },
      { num: '03', title: 'Hakone Onsen & Mt. Fuji Vista', sub: 'Open-air volcanic hot springs · Lake Ashi scenic cruise', time: '08:30' },
      { num: '04', title: 'Bullet Train Shinkansen to Kyoto', sub: 'High-speed transit · traditional Machiya townhouse check-in', time: '10:00' },
      { num: '05', title: 'Fushimi Inari 10,000 Torii Gates', sub: 'Early sunrise shrine trail · Gion private matcha ceremony', time: '07:30' }
    ]
  },
  India: {
    duration: '6 DAYS · 5 NIGHTS',
    dates: 'NOV 05 — NOV 11',
    days: [
      { num: '01', title: 'Jaipur Royal Welcome', sub: 'Pink city heritage haveli stay · marigold flower ceremony', time: '11:00' },
      { num: '02', title: 'Amer Fort & Mirror Palace', sub: 'Hilltop fortress walk · Sheesh Mahal royal astronomy tour', time: '09:00' },
      { num: '03', title: 'Jodhpur Blue City Ramparts', sub: 'Mehrangarh fort museum · stepwell boutique cafe dinner', time: '08:30' },
      { num: '04', title: 'Thar Desert Starlight Glamping', sub: 'Sunset camel safari over golden dunes · Kalbelia folk dance', time: '16:00' },
      { num: '05', title: 'Udaipur City of Lakes', sub: 'Lake Pichola sunset boat cruise past floating white palaces', time: '10:30' }
    ]
  },
  Iceland: {
    duration: '5 DAYS · 4 NIGHTS',
    dates: 'DEC 01 — DEC 06',
    days: [
      { num: '01', title: 'Reykjavík & Blue Lagoon', sub: 'Mineral-rich geothermal soak · silica mask · coastal lodge', time: '13:00' },
      { num: '02', title: 'Golden Circle & Geysir Eruptions', sub: 'Thingvellir tectonic rift · Gullfoss roaring waterfalls', time: '09:00' },
      { num: '03', title: 'Vík Black Sand & Basalt Caves', sub: 'Reynisfjara basalt columns · Skógafoss thundering mist walk', time: '08:30' },
      { num: '04', title: 'Crystal Blue Glacier Ice Cave', sub: 'Super-jeep excursion onto Vatnajökull ice cap · Diamond Beach', time: '09:30' },
      { num: '05', title: 'Aurora Borealis Night Watch', sub: 'Private guided stargazing safari away from city light pollution', time: '21:00' }
    ]
  }
};

const deskBookingsData = [
  {
    id: 'booking-1',
    label: 'Japan / Tokyo → Kyoto',
    destination: 'Japan / Tokyo → Kyoto',
    dates: 'JUL 04 — JUL 11 · 7 NIGHTS',
    collection: 'Travel Yatra Signature Collection · 2 travellers',
    price: '₹96,400',
    status: 'Confirmed',
    ref: '#TY-9241-JP',
    packageRef: 'japan-after-dark'
  },
  {
    id: 'booking-2',
    label: 'Switzerland / Alps Grand Tour',
    destination: 'Switzerland / Lucerne → Zermatt',
    dates: 'AUG 12 — AUG 20 · 8 NIGHTS',
    collection: 'Travel Yatra Alpine Premier · 2 travellers',
    price: '₹1,12,500',
    status: 'Confirmed',
    ref: '#TY-4482-CH',
    packageRef: 'swiss-grand-tour'
  },
  {
    id: 'booking-3',
    label: 'India / Rajasthan Royal Trail',
    destination: 'India / Jaipur → Udaipur',
    dates: 'OCT 05 — OCT 12 · 7 NIGHTS',
    collection: 'Travel Yatra Heritage Legacy · 4 travellers',
    price: '₹57,000',
    status: 'Ready',
    ref: '#TY-1193-IN',
    packageRef: 'royal-rajasthan'
  }
];

// ============================================================================
// ⏱️ PLANE CROSSING TIME (Preserved as configured by user)
const PLANE_CROSS_TIME = 4.65;
// ============================================================================

function FullscreenIntroVideo({ onComplete }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const [heroFaded, setHeroFaded] = useState(false);

  useEffect(() => {
    // Hide scrollbar and prevent scrolling down while video is playing
    document.body.classList.add('video-playing');
    document.documentElement.classList.add('video-playing');
    window.scrollTo(0, 0);

    // Guaranteed autoplay on start
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }

    const preventScroll = (e) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    const assets = [
      ...countries.map(c => c.image),
      ...packages.map(p => p.image)
    ];
    let loaded = 0;
    assets.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded >= Math.min(assets.length, 3)) setPreloaded(true);
      };
      img.onerror = () => {
        loaded++;
      };
      img.src = src;
    });

    return () => {
      document.body.classList.remove('video-playing');
      document.documentElement.classList.remove('video-playing');
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const handleFinish = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleFinish();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);

    if (cur >= PLANE_CROSS_TIME) {
      setHeroFaded(true);
    } else {
      setHeroFaded(false);
    }
  };

  return (
    <div className={`video-intro-overlay ${isFading ? 'intro-fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="intro-video-element"
        autoPlay
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
      >
        <source src="/intro-video.mp4" type="video/mp4" />
        <source src="/gemini_generated_video_0af181fb.mp4" type="video/mp4" />
      </video>

      <div className="intro-video-vignette" />

      {/* Top Navigation & Controls */}
      {/* <div className="intro-top-bar">
        <div className="intro-brand">
          <div className="brand-mark">Y</div>
          <div>
            <strong>TRAVEL YATRA</strong>
            <span className="intro-subtag">IMMERSIVE PREVIEW · 2026</span>
          </div>
        </div>
        <div className="intro-top-actions">
          <button className="intro-glass-btn" onClick={toggleSound} title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}>
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isMuted ? 'Unmute Sound' : 'Sound ON'}</span>
          </button>
          <button className="intro-skip-btn" onClick={handleFinish} title="Skip video">
            Skip Intro <ArrowRight size={14} />
          </button>
        </div>
      </div> */}

      {/* Center Atmospheric Title (Fades when plane crosses) */}
      <div className={`intro-center-hero ${heroFaded ? 'hero-fade-transition' : ''}`}>
        <h1 className="intro-title">YATRA <i>TRAVELS.</i></h1>
        <p className="intro-desc">Your Journey Starts Here</p>
        <div className="preload-status">
          <span className="pulse-dot" />
          {/* <span>{preloaded ? 'Marketplace Ready' : 'Preloading Next Horizon...'}</span> */}
        </div>
      </div>

      {/* Bottom Timeline & Controls */}
      {/* <div className="intro-bottom-bar">
        <div
          className="intro-timeline"
          onClick={(e) => {
            if (!videoRef.current || !duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = clickPos * duration;
          }}
          title="Scrub timeline"
        >
          <div className="intro-timeline-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="intro-controls-row">
          <div className="intro-controls-left">
            <button className="intro-icon-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="intro-icon-btn" onClick={toggleSound} title={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span className="intro-timer">
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <button className="intro-enter-btn" onClick={handleFinish}>
            Enter Marketplace <ArrowRight size={14} />
          </button>
        </div>
      </div> */}
    </div>
  );
}

function AirplaneIntro() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
      setProgress(p);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const x = progress * 32;
  const y = progress * -15;
  const rotate = -5 + progress * 9;
  const scale = 1 - progress * 0.08;

  return (
    <section className="intro" ref={ref}>
      <div className="intro-bg" />
      <div className="sun-glow" />
      <div className="mountain mountain-back" />
      <div className="mountain mountain-front" />
      <div className="intro-copy">
        <span className="eyebrow">TRAVEL YATRA · 2026</span>
        <h1>GO<br /><i>FURTHER.</i></h1>
        <p>Curated journeys for people who would rather collect stories than souvenirs.</p>
        <div className="scroll-cue">
          <span>SCROLL TO TAKE OFF</span>
          <span className="line" />
        </div>
      </div>
      <div className="flight-path" style={{ transform: `translate3d(${x}vw,${y}vh,0)` }}>
        <div className="plane" style={{ transform: `rotate(${rotate}deg) scale(${scale})` }}>
          <Plane size={88} strokeWidth={1.15} />
        </div>
      </div>
      <div className="intro-fade" />
    </section>
  );
}

function Nav({ onWatchIntro, onOpenPlan, onOpenWishlist, wishlistCount, onOpenCart, cartCount, currentUser, onOpenAuthModal }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <a className="brand" href="#top">
        <span className="brand-mark">Y</span> TRAVEL YATRA
      </a>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        <a href="#destinations" onClick={() => setOpen(false)}>Destinations</a>
        <a href="#packages" onClick={() => setOpen(false)}>Packages</a>
        <a href="#itinerary" onClick={() => setOpen(false)}>Itinerary</a>
        <a href="#booking" onClick={() => setOpen(false)}>Travel Desk</a>
      </nav>
      <div className="nav-actions">
        <button className="nav-cart-btn" onClick={onOpenCart} title="View Travel Cart">
          <ShoppingCart size={15} color={cartCount > 0 ? 'var(--yatra-accent)' : '#fff'} />
          <span>Cart</span>
          {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
        </button>
        <button className="nav-wishlist-btn" onClick={onOpenWishlist} title="View Saved Journeys">
          <Heart size={15} fill={wishlistCount > 0 ? 'var(--yatra-accent)' : 'none'} color={wishlistCount > 0 ? 'var(--yatra-accent)' : '#fff'} />
          <span>Saved</span>
          {wishlistCount > 0 && <span className="nav-wishlist-badge">{wishlistCount}</span>}
        </button>
        <button
          className="nav-auth-btn"
          onClick={onOpenAuthModal}
          title={currentUser ? `Signed in as ${currentUser.email}` : 'Sign In with Email'}
        >
          {currentUser ? (
            <>
              <div className="nav-avatar-circle">
                {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <span className="nav-auth-label">{currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}</span>
            </>
          ) : (
            <>
              <User size={15} />
              <span className="nav-auth-label">Sign In</span>
            </>
          )}
        </button>
        <button className="nav-replay-intro" onClick={onWatchIntro} title="Watch Fullscreen Intro Video">
          <Film size={14} /> Replay Intro
        </button>
        <button className="nav-cta" onClick={() => onOpenPlan()}>
          Plan a journey <ArrowRight size={15} />
        </button>
      </div>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="menu">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function SearchBar({ searchFilters, setSearchFilters, onExecuteSearch }) {
  const handleInputChange = (e) => {
    setSearchFilters(prev => ({ ...prev, query: e.target.value }));
  };

  const handleDateChange = (e) => {
    setSearchFilters(prev => ({ ...prev, date: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setSearchFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onExecuteSearch();
    }
  };

  const handleChipClick = (country) => {
    if (searchFilters.query.toLowerCase() === country.toLowerCase()) {
      setSearchFilters(prev => ({ ...prev, query: '' }));
    } else {
      setSearchFilters(prev => ({ ...prev, query: country }));
    }
    onExecuteSearch();
  };

  const clearAllFilters = () => {
    setSearchFilters({ query: '', date: 'any', category: 'all', budget: 'all' });
  };

  const hasActiveFilters = searchFilters.query || searchFilters.date !== 'any' || searchFilters.category !== 'all';

  return (
    <div className="search-container">
      <div className="search-box-dynamic">
        <div className="search-field">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search country, city or landmark (e.g. India, Alps, Kyoto)"
            value={searchFilters.query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="search-v-divider" />

        <div className="search-field">
          <CalendarDays size={17} />
          <select value={searchFilters.date} onChange={handleDateChange}>
            <option value="any">Flexible Dates</option>
            <option value="next-30">Next 30 Days</option>
            <option value="summer">Summer 2026</option>
            <option value="autumn">Autumn 2026</option>
            <option value="winter">Winter Escapes</option>
          </select>
        </div>

        <div className="search-v-divider" />

        <div className="search-field">
          <SlidersHorizontal size={17} />
          <select value={searchFilters.category} onChange={handleCategoryChange}>
            <option value="all">All Styles</option>
            <option value="Heritage">Heritage & Culture</option>
            <option value="Alpine">Alpine Peaks</option>
            <option value="Scenic">Scenic Vistas</option>
            <option value="Wild">Wild Escapes</option>
            <option value="Luxury">Ultra Luxury</option>
            <option value="Adventure">High Adventure</option>
          </select>
        </div>

        <button className="search-submit-btn" onClick={onExecuteSearch}>
          <Search size={16} /> Explore Journeys
        </button>
      </div>

      {/* Quick Destination Chips */}
      <div className="search-quick-chips">
        <span>Trending Horizons:</span>
        {['India', 'Switzerland', 'Japan', 'Iceland', 'Dubai', 'Italy'].map(c => {
          const isSelected = searchFilters.query.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              className={`quick-chip ${isSelected ? 'active' : ''}`}
              onClick={() => handleChipClick(c)}
            >
              {c}
            </button>
          );
        })}
        {hasActiveFilters && (
          <button className="quick-chip-reset" onClick={clearAllFilters}>
            <X size={12} /> Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

function DestinationRail({ onSelectDestination, onToggleWishlist, wishlist, onPlanDestination }) {
  const [active, setActive] = useState(0);

  const prevDestination = () => {
    setActive(prev => (prev === 0 ? countries.length - 1 : prev - 1));
  };

  const nextDestination = () => {
    setActive(prev => (prev === countries.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="destinations section" id="destinations">
      <div className="section-head">
        <div>
          <span className="eyebrow">THE WORLD IS OPEN</span>
          <h2>Choose your<br /><i>next horizon.</i></h2>
        </div>
        <p>One marketplace, hundreds of hand-picked journeys. Slide through destinations and find the place that feels like yours.</p>
      </div>

      <div className="destination-rail">
        {countries.map((c, i) => {
          const isWishlisted = wishlist.includes(c.name);
          return (
            <article
              key={c.code}
              className={`destination ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              style={{ backgroundImage: `url(${c.image})` }}
            >
              <div className="destination-shade" />
              <div className="destination-top">
                <span>{c.code}</span>
                <button
                  type="button"
                  className={`destination-wishlist-toggle ${isWishlisted ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(c.name, c.name);
                  }}
                  title={isWishlisted ? 'Remove from saved' : 'Save destination'}
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="destination-bottom">
                <span className="tag">{c.tag}</span>
                <h3>{c.name}</h3>
                <p>{c.place}</p>
                <strong>{c.price}</strong>
                {i === active && (
                  <div>
                    <button
                      className="destination-explore-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDestination(c.name);
                      }}
                    >
                      View Packages <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="destination-rail-header">
        <div className="rail-controls">
          <span>0{active + 1} / 0{countries.length}</span>
          <div className="rail-lines">
            {countries.map((_, i) => (
              <button
                key={i}
                className={i === active ? 'on' : ''}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        <div className="rail-nav-arrows">
          <button className="rail-arrow-btn" onClick={prevDestination} aria-label="Previous destination">
            <ChevronLeft size={18} />
          </button>
          <button className="rail-arrow-btn" onClick={nextDestination} aria-label="Next destination">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Packages({ packagesList, onSelectPackage, onToggleWishlist, wishlist, onResetFilters, activeCategory, setActiveCategory, onAddToCart }) {
  const categories = ['All', 'Heritage', 'Alpine', 'Culture', 'Adventure', 'Luxury', 'Scenic', 'Wild'];

  const displayedPackages = packagesList.filter(p => {
    if (activeCategory === 'All') return true;
    return p.type.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section className="section packages" id="packages">
      <div className="section-head">
        <div>
          <span className="eyebrow">CURATED FOR YOU</span>
          <h2>Travel packages,<br /><i>without the guesswork.</i></h2>
        </div>
        <div className="packages-result-count">
          <span>Found <strong>{displayedPackages.length}</strong> curated journeys</span>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="packages-filter-wrapper">
        <div className="packages-category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="package-grid">
        {displayedPackages.length > 0 ? (
          displayedPackages.map(p => {
            const isWishlisted = wishlist.includes(p.id);
            return (
              <article className="package" key={p.id}>
                <div className="package-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <span>{p.type}</span>
                  <button
                    className={`package-wishlist-toggle ${isWishlisted ? 'is-active' : ''}`}
                    onClick={() => onToggleWishlist(p.id, p.title)}
                    title={isWishlisted ? 'Remove from saved' : 'Save to wishlist'}
                  >
                    <Heart size={17} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="package-info">
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.meta}</p>
                  </div>
                  <div className="rating">
                    <Star size={14} fill="currentColor" /> {p.rating}
                  </div>
                </div>
                <div className="package-foot">
                  <strong>{p.price}</strong>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      className="package-cart-btn"
                      onClick={() => onAddToCart(p)}
                      title="Add to Travel Cart"
                    >
                      <ShoppingCart size={13} /> Add
                    </button>
                    <button onClick={() => onSelectPackage(p)}>
                      View trip <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="package-empty-state">
            <Compass size={40} style={{ color: 'var(--yatra-accent)' }} />
            <h3>No journeys match your exact filter</h3>
            <p>Try clearing your keyword or selecting a different travel style.</p>
            <button className="light-btn" onClick={onResetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Itinerary({ onOpenPlan }) {
  const [selectedCountry, setSelectedCountry] = useState('Switzerland');
  const currentItinerary = itinerariesData[selectedCountry] || itinerariesData['Switzerland'];

  return (
    <section className="itinerary section" id="itinerary">
      <div className="itinerary-card">
        <div className="itinerary-copy">
          <span className="eyebrow">INTERACTIVE ITINERARY VIEWER</span>
          <h2>See the whole journey<br /><i>before you book.</i></h2>
          <p>Day-by-day plans, luxury stays, private excursions and seamless transfers — laid out so you know exactly what your trip feels like.</p>

          <div className="itinerary-country-tabs">
            {Object.keys(itinerariesData).map(c => (
              <button
                key={c}
                className={`itinerary-tab-pill ${selectedCountry === c ? 'active' : ''}`}
                onClick={() => setSelectedCountry(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="checks">
            <span><Check size={15} /> Verified day-by-day schedule</span>
            <span><Check size={15} /> Curated 4★ & 5★ luxury stays</span>
            <span><Check size={15} /> Dedicated 24/7 personal concierge</span>
          </div>

          <button className="light-btn" onClick={() => onOpenPlan(selectedCountry)}>
            Customize {selectedCountry} Itinerary <ArrowRight size={16} />
          </button>
        </div>

        <div className="timeline">
          <div className="timeline-top">
            <span>{selectedCountry.toUpperCase()} · {currentItinerary.duration}</span>
            <span>{currentItinerary.dates}</span>
          </div>

          {currentItinerary.days.map((item) => (
            <div className="day" key={item.num}>
              <div className="day-no">{item.num}</div>
              <div>
                <strong>{item.title}</strong>
                <p>{item.sub}</p>
              </div>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking({ bookings = deskBookingsData, onOpenPackageById, onOpenManageBooking }) {
  const [activeBookingId, setActiveBookingId] = useState(bookings[0]?.id || 'booking-1');
  const currentBooking = bookings.find(b => b.id === activeBookingId) || bookings[0] || deskBookingsData[0];

  return (
    <section className="booking section" id="booking">
      <div className="booking-panel">
        <div>
          <span className="eyebrow">YOUR TRAVEL DESK</span>
          <h2>Everything booked.<br /><i>Nothing forgotten.</i></h2>
          <p>Access your upcoming journeys, real-time concierge alerts, flight passes, and day-by-day documents in one unified portal.</p>
        </div>

        <div className="dashboard">
          <div className="desk-selector-bar">
            {bookings.map(b => (
              <button
                key={b.id}
                className={`desk-journey-pill ${activeBookingId === b.id ? 'active' : ''}`}
                onClick={() => setActiveBookingId(b.id)}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="dash-top">
            <span>UPCOMING JOURNEY · {currentBooking.ref}</span>
            <span className="status">
              <span /> {currentBooking.status}
            </span>
          </div>

          <div className="dash-destination">
            <div>
              <small>{currentBooking.dates}</small>
              <h3>{currentBooking.destination}</h3>
              <p>{currentBooking.collection}</p>
            </div>
            <div className="dash-price">{currentBooking.price}</div>
          </div>

          <div className="dash-actions">
            <button onClick={() => onOpenPackageById(currentBooking.packageRef)}>
              Open itinerary <ArrowRight size={15} />
            </button>
            <button className="ghost" onClick={() => onOpenManageBooking(currentBooking)}>
              Manage booking
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <span className="brand-mark">Y</span>
        <div>
          <strong>TRAVEL YATRA</strong>
          <p>Journeys worth remembering.</p>
        </div>
      </div>
      <div className="footer-links">
        <div>
          <span>EXPLORE</span>
          <a href="#destinations">Destinations</a>
          <a href="#packages">Curated Packages</a>
          <a href="#itinerary">Live Itineraries</a>
        </div>
        <div>
          <span>TRAVEL DESK</span>
          <a href="#booking">Upcoming Trips</a>
          <a href="#booking">Concierge Support</a>
          <a href="#top">Travel Passports</a>
        </div>
        <div>
          <span>COMPANY</span>
          <a href="#top">Our Philosophy</a>
          <a href="#top">Curators Journal</a>
          <a href="#top">Contact Desk</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Travel Yatra. All journeys reserved.</span>
        <span>Built for the curious.</span>
      </div>
    </footer>
  );
}

/* ============================================================================
   INTERACTIVE MODALS & DRAWERS
   ============================================================================ */

function PlanJourneyModal({ isOpen, onClose, initialDestination, onShowToast }) {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState(initialDestination || 'Switzerland');
  const [month, setMonth] = useState('June 2026');
  const [duration, setDuration] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [vibe, setVibe] = useState('Scenic & Luxury');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  if (!isOpen) return null;

  // Live dynamic cost estimator based on destination, days, travelers
  const baseRates = {
    India: 4800,
    Switzerland: 14500,
    Japan: 13200,
    Iceland: 15800,
    Dubai: 7500,
    Italy: 12800
  };
  const rate = baseRates[destination] || 10000;
  const estimatedCost = Math.round(rate * duration * travelers);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const generatedRef = `#TY-${Math.floor(1000 + Math.random() * 9000)}-${destination.slice(0, 2).toUpperCase()}`;
      setBookingRef(generatedRef);
      onShowToast(`Plan Request Confirmed! Ref: ${generatedRef}`);
    }, 750);
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={resetAndClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <span className="eyebrow">CUSTOM TRAVEL CONCIERGE</span>
              <h2>Plan Your <i>Travel Yatra.</i></h2>
              <p>Tell us your vision. We handcraft your personalized private journey with verified local guides and premium stays.</p>
            </div>

            {/* Steps Progress */}
            <div className="plan-steps-bar">
              <div className={`plan-step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                <span className="step-num">{step > 1 ? <Check size={12} /> : '1'}</span>
                <span>Destination & Dates</span>
              </div>
              <div className={`plan-step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                <span className="step-num">{step > 2 ? <Check size={12} /> : '2'}</span>
                <span>Travelers & Style</span>
              </div>
              <div className={`plan-step-item ${step === 3 ? 'active' : ''}`}>
                <span className="step-num">3</span>
                <span>Details & Estimate</span>
              </div>
            </div>

            {step === 1 && (
              <div>
                <div className="plan-section-title">Select Destination</div>
                <div className="plan-options-grid">
                  {['India', 'Switzerland', 'Japan', 'Iceland', 'Dubai', 'Italy'].map(d => (
                    <button
                      key={d}
                      type="button"
                      className={`plan-option-card ${destination === d ? 'selected' : ''}`}
                      onClick={() => setDestination(d)}
                    >
                      <strong>{d}</strong>
                      <small>Curated experiences</small>
                    </button>
                  ))}
                </div>

                <div className="plan-section-title">Travel Season</div>
                <div className="plan-options-grid">
                  {['May 2026', 'June 2026', 'July 2026', 'August 2026', 'Autumn 2026', 'Winter 2026'].map(m => (
                    <button
                      key={m}
                      type="button"
                      className={`plan-option-card ${month === m ? 'selected' : ''}`}
                      onClick={() => setMonth(m)}
                    >
                      <strong>{m}</strong>
                      <small>Optimal climate</small>
                    </button>
                  ))}
                </div>

                <div className="modal-actions-row">
                  <span style={{ fontSize: '13px', color: '#8fa097' }}>Step 1 of 3</span>
                  <button className="modal-primary-btn" onClick={() => setStep(2)}>
                    Continue <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="counter-row">
                  <div>
                    <strong style={{ fontSize: '15px' }}>Number of Travellers</strong>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#8fa097' }}>Adults & companions</p>
                  </div>
                  <div className="counter-controls">
                    <button className="counter-btn" onClick={() => setTravelers(Math.max(1, travelers - 1))}>-</button>
                    <span className="counter-value">{travelers}</span>
                    <button className="counter-btn" onClick={() => setTravelers(Math.min(10, travelers + 1))}>+</button>
                  </div>
                </div>

                <div className="counter-row">
                  <div>
                    <strong style={{ fontSize: '15px' }}>Duration (Nights)</strong>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#8fa097' }}>Total days across stays</p>
                  </div>
                  <div className="counter-controls">
                    <button className="counter-btn" onClick={() => setDuration(Math.max(3, duration - 1))}>-</button>
                    <span className="counter-value">{duration}</span>
                    <button className="counter-btn" onClick={() => setDuration(Math.min(21, duration + 1))}>+</button>
                  </div>
                </div>

                <div className="plan-section-title">Preferred Travel Vibe</div>
                <div className="plan-options-grid">
                  {['Scenic & Luxury', 'Culture & Heritage', 'High Mountain Adventure', 'Relax & Wellness', 'Culinary & Nightlife', 'Family & Leisure'].map(v => (
                    <button
                      key={v}
                      type="button"
                      className={`plan-option-card ${vibe === v ? 'selected' : ''}`}
                      onClick={() => setVibe(v)}
                    >
                      <strong>{v}</strong>
                      <small>Custom tailored</small>
                    </button>
                  ))}
                </div>

                <div className="modal-actions-row">
                  <button className="modal-secondary-btn" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button className="modal-primary-btn" onClick={() => setStep(3)}>
                    Review & Quote <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="live-quote-card">
                  <div>
                    <small>Estimated Custom Itinerary</small>
                    <strong>{destination} · {duration} Nights · {travelers} Travellers</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#99aba1' }}>
                      Includes 4★/5★ stays, private inter-city transport & daily activities.
                    </p>
                  </div>
                  <div className="quote-price-tag">
                    ₹{estimatedCost.toLocaleString('en-IN')}
                    <span>est. total with taxes</span>
                  </div>
                </div>

                <div className="plan-section-title">Your Details for Concierge Dispatch</div>
                <input
                  type="text"
                  required
                  placeholder="Full Name (e.g. Aryan Sharma)"
                  className="form-input-box"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number (+91...)"
                    className="form-input-box"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="form-input-box"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="modal-actions-row">
                  <button type="button" className="modal-secondary-btn" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button type="submit" className="modal-primary-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Confirming...' : 'Confirm & Request Itinerary'} <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="success-ticket-box">
            <div className="success-badge-icon">
              <CheckCircle2 size={32} />
            </div>
            <span className="ticket-ref-pill">{bookingRef}</span>
            <h2 style={{ fontSize: '28px', margin: '0 0 8px', color: '#fff' }}>
              Your Journey is in Motion!
            </h2>
            <p style={{ color: '#8fa097', fontSize: '14px', maxWidth: '440px', margin: '0 auto 20px' }}>
              Thank you, <strong>{name || 'Traveler'}</strong>. A dedicated Travel Yatra private concierge has been assigned to prepare your custom itinerary.
            </p>

            <div className="ticket-details-summary">
              <div>
                <span>DESTINATION</span>
                <strong>{destination}</strong>
              </div>
              <div>
                <span>DATES</span>
                <strong>{month} ({duration} Nights)</strong>
              </div>
              <div>
                <span>PARTY SIZE</span>
                <strong>{travelers} Travelers</strong>
              </div>
              <div>
                <span>ESTIMATED BUDGET</span>
                <strong style={{ color: 'var(--yatra-accent)' }}>₹{estimatedCost.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button className="modal-primary-btn" onClick={resetAndClose}>
                Done & View Marketplace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TripDrawer({ pkg, isOpen, onClose, onBookPackage, onAddToCart, onInstantCheckout }) {
  if (!isOpen || !pkg) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="tag" style={{ background: 'rgba(217,243,90,0.15)', borderColor: 'var(--yatra-accent)', color: 'var(--yatra-accent)' }}>
            {pkg.type}
          </span>
          <button className="modal-close-btn" style={{ position: 'static' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <img src={pkg.image} alt={pkg.title} className="drawer-banner-img" />

        <h2 style={{ fontSize: '26px', margin: '0 0 6px', color: '#fff' }}>{pkg.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#90a097', fontSize: '13px', marginBottom: '14px' }}>
          <span><MapPin size={14} style={{ display: 'inline', verticalAlign: '-2px', color: 'var(--yatra-accent)' }} /> {pkg.country}</span>
          <span><Clock size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> {pkg.meta}</span>
          <span style={{ color: 'var(--yatra-accent)' }}><Star size={14} fill="currentColor" style={{ display: 'inline', verticalAlign: '-2px' }} /> {pkg.rating}</span>
        </div>

        <div style={{ margin: '14px 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
          <span className="plan-section-title">Curated Inclusions</span>
          <div className="drawer-inclusions-list">
            {pkg.inclusions.map((inc, i) => (
              <span key={i} className="drawer-inclusion-chip">
                <Check size={13} /> {inc}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <span className="plan-section-title">Day-by-Day Schedule</span>
          {pkg.days.map(d => (
            <div key={d.day} style={{ display: 'flex', gap: '14px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: 'var(--yatra-accent)', width: '32px' }}>
                {d.day}
              </span>
              <div>
                <strong style={{ fontSize: '13px', color: '#fff' }}>{d.title}</strong>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#8ea198' }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#7a8e84', textTransform: 'uppercase' }}>Package Price</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--yatra-accent)' }}>{pkg.price}</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              className="modal-secondary-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={() => {
                onAddToCart(pkg);
              }}
            >
              <ShoppingCart size={14} /> Add to Cart
            </button>
            <button
              className="modal-primary-btn"
              onClick={() => {
                onClose();
                onInstantCheckout(pkg);
              }}
            >
              Instant Pay (Razorpay) <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WishlistDrawer({ isOpen, onClose, wishlist, onSelectPackageById, onRemoveWishlist }) {
  if (!isOpen) return null;

  const wishlistedPackages = packages.filter(p => wishlist.includes(p.id) || wishlist.includes(p.country));

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} fill="var(--yatra-accent)" color="var(--yatra-accent)" />
            <h2 style={{ fontSize: '22px', margin: 0, color: '#fff' }}>Saved Journeys ({wishlist.length})</h2>
          </div>
          <button className="modal-close-btn" style={{ position: 'static' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {wishlistedPackages.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {wishlistedPackages.map(p => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  padding: '12px',
                  alignItems: 'center'
                }}
              >
                <img src={p.image} alt={p.title} style={{ width: '80px', height: '65px', objectFit: 'cover', borderRadius: '10px' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '13px', color: '#fff', display: 'block' }}>{p.title}</strong>
                  <span style={{ fontSize: '11px', color: '#8fa097' }}>{p.meta}</span>
                  <div style={{ color: 'var(--yatra-accent)', fontWeight: '700', fontSize: '13px', marginTop: '3px' }}>{p.price}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '600' }}
                    onClick={() => {
                      onClose();
                      onSelectPackageById(p.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    style={{ background: 'transparent', color: '#ff627d', padding: '4px', border: 0, fontSize: '11px' }}
                    onClick={() => onRemoveWishlist(p.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8ea097' }}>
            <Heart size={44} style={{ color: '#385046', marginBottom: '14px' }} />
            <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 8px' }}>Your Wishlist is Empty</h3>
            <p style={{ fontSize: '13px' }}>Tap the heart icon on any destination or package to save it here for later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   AUTOMATED BOOKING EMAIL SERVICE
   ============================================================================ */

async function sendBookingEmails({ paymentDetails, items, user, fallbackEmail }) {
  const adminEmail = 'siddhantsrivastava2005@gmail.com';
  const customerEmail = user?.email || fallbackEmail || 'siddhantsrivastava2005@gmail.com';
  const customerName = user?.name || (customerEmail ? customerEmail.split('@')[0] : 'Valued Traveler');

  const itemsListText = (items || []).map(it => 
    `• ${it.pkg?.title || 'Tour'} (${it.pkg?.country}) - ${it.travelers} Guests, Dates: ${it.travelDate}, Subtotal: ₹${((it.pkg?.numericPrice || 0) * it.travelers).toLocaleString('en-IN')}`
  ).join('\n');

  const totalAmountStr = `₹${(paymentDetails.amount || 0).toLocaleString('en-IN')}`;

  // 1. Dispatch Owner Notification Email to siddhantsrivastava2005@gmail.com
  try {
    await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `✈️ NEW TRAVEL PACKAGE PURCHASED: ${customerName} (${totalAmountStr})`,
        "Alert": "A customer has booked and paid for travel package(s) on Travel Yatra Marketplace!",
        "Customer Name": customerName,
        "Customer Email": customerEmail,
        "Customer Phone": user?.phone || 'Not provided',
        "Admin Alert Email": adminEmail,
        "Total Paid (INR)": totalAmountStr,
        "Razorpay Payment ID": paymentDetails.paymentId,
        "Razorpay Order ID": paymentDetails.orderId,
        "Payment Method": paymentDetails.method,
        "Transaction Date": new Date().toLocaleString('en-IN'),
        "Purchased Journeys": itemsListText
      })
    });
  } catch (err) {
    console.warn('Owner email dispatch notice:', err);
  }

  // 2. Dispatch Customer Confirmation Email to customer's email
  if (customerEmail && customerEmail !== adminEmail && customerEmail.includes('@')) {
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(customerEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Confirmation & Booking Pass: Your Travel Yatra Journey (${paymentDetails.paymentId})`,
          "Greeting": `Dear ${customerName}, your travel booking is confirmed!`,
          "Booking Reference": paymentDetails.paymentId,
          "Total Amount Paid": totalAmountStr,
          "Payment Method": paymentDetails.method,
          "Booked Itineraries": itemsListText,
          "Owner Notification": `Sent copy to ${adminEmail}`,
          "Support Contact": "WhatsApp Concierge & support@travelyatra.com",
          "Note": "Please present your confirmation pass or downloaded voucher during boarding."
        })
      });
    } catch (err) {
      console.warn('Customer email dispatch notice:', err);
    }
  }

  return {
    customerEmail,
    adminEmail,
    timestamp: new Date().toLocaleTimeString('en-IN')
  };
}

/* ============================================================================
   INVOICE GENERATOR & DOWNLOAD
   ============================================================================ */

function downloadInvoice(paymentDetails, items) {
  const safeItems = items || [];
  const itemsHtml = safeItems.map(it => `
    <tr>
      <td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#0f172a;display:block;">${it.pkg?.title || 'Custom Tour Package'}</strong>
        <span style="color:#64748b;font-size:12px;">${it.pkg?.country || ''} · ${it.pkg?.meta || ''}</span>
      </td>
      <td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;text-align:center;">${it.travelers} Guests</td>
      <td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;text-align:center;">${it.travelDate}</td>
      <td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:600;">₹${((it.pkg?.numericPrice || 0) * it.travelers).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Travel Yatra - Official Tax Invoice & Booking Voucher</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b; padding: 30px 15px; margin: 0; }
    .receipt { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 35px rgba(0,0,0,0.06); padding: 36px; }
    .head { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
    .brand { font-size: 22px; font-weight: 800; letter-spacing: 0.12em; color: #07110f; }
    .badge { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
    .cell { background: #f8fafc; border: 1px solid #edf2f7; padding: 12px 16px; border-radius: 10px; }
    .cell small { display: block; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
    .cell strong { color: #0f172a; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { text-align: left; background: #f1f5f9; padding: 10px; font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }
    .total-box { border-top: 2px solid #0f172a; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 800; }
    .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="head">
      <div>
        <div class="brand">TRAVEL YATRA</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 3px;">Curated Journeys & Travel Marketplace</div>
      </div>
      <div class="badge">PAID · RAZORPAY TEST</div>
    </div>

    <div class="grid">
      <div class="cell">
        <small>Payment Reference</small>
        <strong>${paymentDetails.paymentId}</strong>
      </div>
      <div class="cell">
        <small>Razorpay Order ID</small>
        <strong>${paymentDetails.orderId}</strong>
      </div>
      <div class="cell">
        <small>Payment Method</small>
        <strong>${paymentDetails.method}</strong>
      </div>
      <div class="cell">
        <small>Issuance Date</small>
        <strong>${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Curated Itinerary</th>
          <th style="text-align: center;">Travelers</th>
          <th style="text-align: center;">Dates</th>
          <th style="text-align: right;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div class="total-box">
      <span>Total Paid:</span>
      <span style="color: #0d9488;">₹${paymentDetails.amount.toLocaleString('en-IN')}</span>
    </div>

    <div class="footer">
      This is a verified digital payment receipt and booking voucher generated by Travel Yatra Marketplace.<br>
      Razorpay Payment Gateway Test Environment · Verified via PhonePe / UPI Sandbox.
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TravelYatra_Voucher_${paymentDetails.paymentId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================================
   CART DRAWER COMPONENT
   ============================================================================ */

function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateTravelers,
  onUpdateDate,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  onExplorePackages
}) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, it) => acc + (it.pkg.numericPrice * it.travelers), 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST on tour packages
  const grandTotal = subtotal + gst;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel cart-drawer-panel" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingCart size={22} color="var(--yatra-accent)" />
            <h2 style={{ fontSize: '22px', margin: 0, color: '#fff' }}>
              Travel Cart <span style={{ fontSize: '13px', color: '#8fa097', fontWeight: 'normal' }}>({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
            </h2>
          </div>
          <button className="modal-close-btn" style={{ position: 'static' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <ShoppingBag size={52} style={{ color: '#2b443b', marginBottom: '16px' }} />
            <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 8px' }}>Your Travel Cart is Empty</h3>
            <p style={{ color: '#8fa097', fontSize: '13px', maxWidth: '300px', margin: '0 auto' }}>
              Select any curated journey from our marketplace and customize your travelers to book.
            </p>
            <button
              className="modal-primary-btn"
              style={{ marginTop: '24px' }}
              onClick={() => {
                onClose();
                onExplorePackages();
              }}
            >
              Explore Packages <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="cart-drawer-content">
            <div className="cart-items-list">
              {cart.map(item => {
                const itemTotal = item.pkg.numericPrice * item.travelers;
                return (
                  <div key={item.pkg.id} className="cart-item-card">
                    <img src={item.pkg.image} alt={item.pkg.title} className="cart-item-img" />
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <strong className="cart-item-title">{item.pkg.title}</strong>
                        <button
                          className="cart-item-remove-btn"
                          onClick={() => onRemoveItem(item.pkg.id)}
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <span className="cart-item-meta">{item.pkg.country} · {item.pkg.nights} Nights</span>
                      
                      <div className="cart-item-date-row">
                        <CalendarDays size={12} color="var(--yatra-accent)" />
                        <span>{item.travelDate}</span>
                      </div>

                      <div className="cart-item-controls-row">
                        <div className="cart-stepper">
                          <button
                            onClick={() => onUpdateTravelers(item.pkg.id, -1)}
                            disabled={item.travelers <= 1}
                            title="Decrease guests"
                          >
                            <Minus size={11} />
                          </button>
                          <span>{item.travelers} {item.travelers === 1 ? 'Guest' : 'Guests'}</span>
                          <button
                            onClick={() => onUpdateTravelers(item.pkg.id, 1)}
                            title="Increase guests"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <div className="cart-item-price">
                          ₹{itemTotal.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary-section">
              <div className="cart-summary-row">
                <span>Base Journeys:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary-row">
                <span>GST & Tourism Taxes (5%):</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary-total-row">
                <span>Grand Total:</span>
                <span className="cart-grand-price">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="cart-actions-wrapper">
                <button
                  className="cart-checkout-razorpay-btn"
                  onClick={() => {
                    onClose();
                    onProceedCheckout(cart);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} />
                    <span>Pay via Razorpay</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="razorpay-btn-badge">UPI QR / Cards</span>
                    <ArrowRight size={14} />
                  </div>
                </button>

                <button
                  className="cart-clear-btn"
                  onClick={onClearCart}
                >
                  Clear Cart
                </button>
              </div>

              <div className="cart-trust-footer">
                <span><ShieldCheck size={12} color="var(--yatra-accent)" /> Razorpay Sandbox Test Mode</span>
                <span>•</span>
                <span>PhonePe Scan Enabled</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   RAZORPAY TEST PAYMENT MODAL (WITH PHONEPE UPI SCAN)
   ============================================================================ */

function RazorpayModal({
  isOpen,
  onClose,
  checkoutItems = [],
  onPaymentSuccess,
  onShowToast,
  currentUser
}) {
  if (!isOpen) return null;

  const subtotal = checkoutItems.reduce((acc, it) => acc + (it.pkg.numericPrice * it.travelers), 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  const [orderId] = useState(() => 'order_' + Math.random().toString(36).substring(2, 9).toUpperCase());
  const [activeTab, setActiveTab] = useState('upi');
  const [upiMode, setUpiMode] = useState('qr');
  const [upiIdInput, setUpiIdInput] = useState('success@razorpay');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [cardNumber, setCardNumber] = useState('4111 1111 1111 1111');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [cardName, setCardName] = useState(currentUser?.name || 'Siddhant Srivastava');
  const [customerEmailInput, setCustomerEmailInput] = useState(currentUser?.email || 'siddhantsrivastava2005@gmail.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [emailDispatchResult, setEmailDispatchResult] = useState(null);
  const [qrTimer, setQrTimer] = useState(599);

  useEffect(() => {
    if (currentUser?.email) {
      setCustomerEmailInput(currentUser.email);
    }
    if (currentUser?.name) {
      setCardName(currentUser.name);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isSuccess || !isOpen) return;
    const interval = setInterval(() => {
      setQrTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSuccess, isOpen]);

  const minutes = Math.floor(qrTimer / 60);
  const seconds = qrTimer % 60;
  const timerFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Standard NPCI UPI payload recognized by PhonePe, Google Pay, Paytm, CRED
  const upiPayload = `upi://pay?pa=travelyatra.test@razorpay&pn=Travel%20Yatra%20Marketplace&am=${grandTotal.toFixed(2)}&cu=INR&tn=Booking%20Ref%20${orderId}&tr=${orderId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(upiPayload)}`;

  const handleSimulatePayment = (methodName) => {
    setIsProcessing(true);
    setProcessingMsg(`Initiating ${methodName}...`);

    setTimeout(() => {
      setProcessingMsg(`Authorizing ₹${grandTotal.toLocaleString('en-IN')} with Razorpay Sandbox...`);
    }, 700);

    setTimeout(() => {
      const payId = 'pay_' + Math.random().toString(36).substring(2, 12).toUpperCase();
      const res = {
        paymentId: payId,
        orderId,
        method: methodName,
        amount: grandTotal,
        date: new Date().toISOString()
      };
      setPaymentResult(res);
      setIsProcessing(false);
      setIsSuccess(true);
      onPaymentSuccess(res);

      // Trigger automatic emails: 1 to User, 1 to Owner (siddhantsrivastava2005@gmail.com)
      sendBookingEmails({
        paymentDetails: res,
        items: checkoutItems,
        user: currentUser,
        fallbackEmail: customerEmailInput
      }).then((dispatchRes) => {
        setEmailDispatchResult(dispatchRes);
      });

      onShowToast(`Booking confirmed! Emails sent to ${customerEmailInput} & siddhantsrivastava2005@gmail.com`);
    }, 1700);
  };

  return (
    <div className="razorpay-backdrop" onClick={onClose}>
      <div className="razorpay-modal" onClick={e => e.stopPropagation()}>
        {/* Razorpay Brand Header */}
        <div className="razorpay-header">
          <div className="razorpay-brand-wrap">
            <div className="razorpay-logo">
              <svg viewBox="0 0 120 28" height="20" fill="none">
                <path d="M12.8 1.5L2.2 16.8h8.5L8.4 26.5l14.2-16.7h-8.8l2-8.3z" fill="#00baef"/>
                <text x="30" y="19" fill="#ffffff" fontWeight="700" fontSize="15" fontFamily="system-ui, sans-serif">Razorpay</text>
              </svg>
            </div>
            <div className="razorpay-test-mode-badge">TEST MODE</div>
          </div>

          <div className="razorpay-biz-info">
            <div className="razorpay-biz-title">Travel Yatra Marketplace</div>
            <div className="razorpay-amount-display">₹{grandTotal.toLocaleString('en-IN')}</div>
          </div>

          <button className="razorpay-close-btn" onClick={onClose} aria-label="Close Razorpay">
            <X size={18} />
          </button>
        </div>

        {isSuccess && paymentResult ? (
          /* Payment Confirmation Screen */
          <div className="razorpay-success-container">
            <div className="razorpay-success-icon-wrap">
              <CheckCircle2 size={54} color="#10b981" />
            </div>
            <h2 className="razorpay-success-title">Payment Successful!</h2>
            <p className="razorpay-success-sub">
              Your travel booking is confirmed via Razorpay Sandbox Test Gateway.
            </p>

            <div className="razorpay-receipt-card">
              <div className="receipt-row">
                <span>Payment Reference:</span>
                <strong className="code-font">{paymentResult.paymentId}</strong>
              </div>
              <div className="receipt-row">
                <span>Order Reference:</span>
                <strong className="code-font">{paymentResult.orderId}</strong>
              </div>
              <div className="receipt-row">
                <span>Payment Method:</span>
                <strong>{paymentResult.method}</strong>
              </div>
              <div className="receipt-row">
                <span>Amount Paid:</span>
                <strong style={{ color: '#10b981', fontSize: '15px' }}>₹{paymentResult.amount.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="razorpay-booked-items-list">
              <span className="receipt-section-label">CONFIRMED ITINERARIES ({checkoutItems.length})</span>
              {checkoutItems.map((it, idx) => (
                <div key={idx} className="receipt-item-line">
                  <div>
                    <strong>{it.pkg.title}</strong>
                    <small>{it.pkg.country} · {it.travelers} Guests · {it.travelDate}</small>
                  </div>
                  <span>₹{(it.pkg.numericPrice * it.travelers).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Automated Email Notifications Status */}
            <div className="razorpay-email-notification-banner">
              <div className="email-notif-header">
                <Mail size={16} color="#00baef" />
                <strong>Automated Booking Confirmation & Owner Alert Dispatched</strong>
              </div>
              <div className="email-target-list">
                <div className="email-target-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>Customer Confirmation Voucher sent to: <strong>{emailDispatchResult?.customerEmail || customerEmailInput}</strong></span>
                </div>
                <div className="email-target-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>Owner Purchase Alert sent to: <strong>siddhantsrivastava2005@gmail.com</strong></span>
                </div>
              </div>
            </div>

            <div className="razorpay-success-actions">
              <button
                className="razorpay-download-invoice-btn"
                onClick={() => downloadInvoice(paymentResult, checkoutItems)}
              >
                <Download size={15} /> Download Booking Voucher & Invoice
              </button>
              <button
                className="razorpay-goto-desk-btn"
                onClick={() => {
                  onClose();
                  const el = document.getElementById('booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View in Travel Desk <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          /* Payment Tab Interface */
          <div className="razorpay-body">
            {/* Sidebar with Payment Methods */}
            <div className="razorpay-tabs-sidebar">
              <button
                className={`razorpay-tab-item ${activeTab === 'upi' ? 'active' : ''}`}
                onClick={() => setActiveTab('upi')}
              >
                <QrCode size={18} />
                <div>
                  <strong>UPI / QR Code</strong>
                  <small>PhonePe, GPay, Paytm</small>
                </div>
              </button>

              <button
                className={`razorpay-tab-item ${activeTab === 'card' ? 'active' : ''}`}
                onClick={() => setActiveTab('card')}
              >
                <CreditCard size={18} />
                <div>
                  <strong>Cards (Test)</strong>
                  <small>Visa, Mastercard, RuPay</small>
                </div>
              </button>

              <button
                className={`razorpay-tab-item ${activeTab === 'netbanking' ? 'active' : ''}`}
                onClick={() => setActiveTab('netbanking')}
              >
                <Building2 size={18} />
                <div>
                  <strong>Netbanking</strong>
                  <small>HDFC, SBI, ICICI, Axis</small>
                </div>
              </button>
            </div>

            {/* Right Details Panel */}
            <div className="razorpay-tab-content">
              <div className="razorpay-customer-email-bar">
                <Mail size={13} color="#0284c7" />
                <span>Confirmation Pass Email:</span>
                <input
                  type="email"
                  className="razorpay-email-quick-input"
                  value={customerEmailInput}
                  onChange={e => setCustomerEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  title="Confirmation will be sent here and to siddhantsrivastava2005@gmail.com"
                />
              </div>
              {activeTab === 'upi' && (
                <div className="razorpay-upi-view">
                  <div className="upi-sub-switch">
                    <button
                      className={upiMode === 'qr' ? 'active' : ''}
                      onClick={() => setUpiMode('qr')}
                    >
                      <QrCode size={14} /> Scan with PhonePe / UPI
                    </button>
                    <button
                      className={upiMode === 'id' ? 'active' : ''}
                      onClick={() => setUpiMode('id')}
                    >
                      <Smartphone size={14} /> Enter UPI ID
                    </button>
                  </div>

                  {upiMode === 'qr' ? (
                    <div className="upi-qr-card">
                      <div className="upi-qr-frame">
                        <img
                          src={qrUrl}
                          alt="Razorpay Test UPI QR Code for PhonePe"
                          className="upi-qr-image"
                        />
                      </div>

                      <div className="upi-apps-icons-row">
                        <span className="upi-badge phonepe-badge">PhonePe</span>
                        <span className="upi-badge gpay-badge">Google Pay</span>
                        <span className="upi-badge paytm-badge">Paytm</span>
                        <span className="upi-badge bhim-badge">BHIM</span>
                      </div>

                      <div className="upi-vpa-copy-box">
                        <span>UPI VPA: <strong>travelyatra.test@razorpay</strong></span>
                        <span className="upi-timer-badge">Expires in {timerFormatted}</span>
                      </div>

                      <div className="razorpay-scan-instruction">
                        <Sparkles size={16} color="#00baef" />
                        <div>
                          <strong>PhonePe Scan Test Ready:</strong> Point your mobile camera using <b>PhonePe</b> at this QR code. PhonePe will detect <i>Travel Yatra Marketplace</i> and <b>₹{grandTotal.toLocaleString('en-IN')}</b>.
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                            *No real monetary debit occurs. Click below to confirm test receipt:*
                          </div>
                        </div>
                      </div>

                      <button
                        className="razorpay-primary-submit-btn"
                        onClick={() => handleSimulatePayment('UPI (PhonePe QR Scan)')}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="razorpay-spinner" /> {processingMsg}
                          </>
                        ) : (
                          <>
                            <Check size={16} /> Simulate PhonePe Payment Approval
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="upi-id-form">
                      <label className="razorpay-field-label">Enter UPI Virtual Payment Address (VPA)</label>
                      <input
                        type="text"
                        className="razorpay-input"
                        placeholder="e.g. yourname@ybl or success@razorpay"
                        value={upiIdInput}
                        onChange={e => setUpiIdInput(e.target.value)}
                      />
                      <div className="upi-quick-chips">
                        <button type="button" onClick={() => setUpiIdInput('success@razorpay')}>@razorpay (Pass)</button>
                        <button type="button" onClick={() => setUpiIdInput('user@ybl')}>@ybl (PhonePe)</button>
                        <button type="button" onClick={() => setUpiIdInput('user@okhdfcbank')}>@okhdfc (GPay)</button>
                      </div>

                      <button
                        className="razorpay-primary-submit-btn"
                        style={{ marginTop: '20px' }}
                        onClick={() => handleSimulatePayment(`UPI ID (${upiIdInput || 'PhonePe'})`)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="razorpay-spinner" /> {processingMsg}
                          </>
                        ) : (
                          <>
                            Verify & Pay ₹{grandTotal.toLocaleString('en-IN')}
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'card' && (
                <div className="razorpay-card-view">
                  <div className="card-mock-notice">
                    Razorpay Sandbox Test Card Preloaded
                  </div>
                  <div className="razorpay-field-group">
                    <label className="razorpay-field-label">Card Number</label>
                    <input
                      type="text"
                      className="razorpay-input"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                    />
                  </div>

                  <div className="razorpay-field-row">
                    <div className="razorpay-field-group">
                      <label className="razorpay-field-label">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        className="razorpay-input"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="razorpay-field-group">
                      <label className="razorpay-field-label">CVV</label>
                      <input
                        type="text"
                        className="razorpay-input"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="razorpay-field-group">
                    <label className="razorpay-field-label">Cardholder Name</label>
                    <input
                      type="text"
                      className="razorpay-input"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                    />
                  </div>

                  <button
                    className="razorpay-primary-submit-btn"
                    style={{ marginTop: '24px' }}
                    onClick={() => handleSimulatePayment('Card (Visa Test)')}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="razorpay-spinner" /> {processingMsg}
                      </>
                    ) : (
                      <>
                        Pay ₹{grandTotal.toLocaleString('en-IN')} (Test OTP)
                      </>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'netbanking' && (
                <div className="razorpay-netbanking-view">
                  <label className="razorpay-field-label">Select Popular Indian Bank</label>
                  <div className="netbanking-grid">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map(b => (
                      <button
                        key={b}
                        type="button"
                        className={`bank-card-chip ${selectedBank === b ? 'active' : ''}`}
                        onClick={() => setSelectedBank(b)}
                      >
                        <Building2 size={16} />
                        <span>{b}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    className="razorpay-primary-submit-btn"
                    style={{ marginTop: '24px' }}
                    onClick={() => handleSimulatePayment(`Netbanking (${selectedBank})`)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="razorpay-spinner" /> {processingMsg}
                      </>
                    ) : (
                      <>
                        Pay via {selectedBank}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Razorpay Security Bar */}
        <div className="razorpay-footer-bar">
          <span>🔒 Secured by <strong>Razorpay</strong> · 256-bit SSL Test Sandbox</span>
          <span className="razorpay-help-link">Test Mode Active</span>
        </div>
      </div>
    </div>
  );
}

function ManageBookingModal({ booking, isOpen, onClose, onShowToast }) {
  if (!isOpen || !booking) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-header">
          <span className="eyebrow">TRAVEL YATRA CONCIERGE DESK</span>
          <h2>Manage Booking <i>{booking.ref}</i></h2>
          <p>{booking.destination} · {booking.dates}</p>
        </div>

        <div className="ticket-details-summary" style={{ marginBottom: '20px' }}>
          <div>
            <span>BOOKING STATUS</span>
            <strong style={{ color: 'var(--yatra-accent)' }}>{booking.status}</strong>
          </div>
          <div>
            <span>PAYMENT TOTAL</span>
            <strong>{booking.price}</strong>
          </div>
          <div>
            <span>TIER</span>
            <strong>Signature Concierge</strong>
          </div>
          <div>
            <span>AIRPORT MEET & GREET</span>
            <strong>Included (Terminal 3)</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="plan-option-card"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            onClick={() => {
              onShowToast('Travel Pass PDF downloaded to device');
              onClose();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Download size={16} color="var(--yatra-accent)" />
              <div>
                <strong>Download Boarding & Itinerary Pass</strong>
                <small>Offline PDF with barcode & contact info</small>
              </div>
            </div>
            <ArrowRight size={14} />
          </button>

          <button
            className="plan-option-card"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            onClick={() => {
              onShowToast('Dedicated Concierge connected on WhatsApp');
              onClose();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Compass size={16} color="var(--yatra-accent)" />
              <div>
                <strong>Contact 24/7 Personal Concierge</strong>
                <small>Average response time &lt; 3 minutes</small>
              </div>
            </div>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   USER AUTHENTICATION (LOGIN & EMAIL) MODAL
   ============================================================================ */

function AuthModal({ isOpen, onClose, currentUser, onLogin, onLogout }) {
  if (!isOpen) return null;

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    const finalName = name.trim() || email.split('@')[0];
    onLogin({
      name: finalName,
      email: email.trim().toLowerCase(),
      phone: phone.trim()
    });
  };

  const handleQuickDemoLogin = () => {
    onLogin({
      name: 'Siddhant Srivastava',
      email: 'siddhantsrivastava2005@gmail.com',
      phone: '+91 98765 43210'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card auth-modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {currentUser ? (
          <div>
            <div className="modal-header">
              <span className="eyebrow">YOUR TRAVEL YATRA ACCOUNT</span>
              <h2>Welcome, <i>{currentUser.name}</i></h2>
              <p>Manage your registered booking contact and communication preferences.</p>
            </div>

            <div className="auth-profile-box">
              <div className="auth-avatar-large">
                {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <strong style={{ fontSize: '16px', color: '#fff', display: 'block' }}>{currentUser.name}</strong>
                <span style={{ fontSize: '13px', color: '#a0b0a7', display: 'block' }}>{currentUser.email}</span>
                <span style={{ fontSize: '12px', color: 'var(--yatra-accent)' }}>{currentUser.phone || 'Verified Traveler'}</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button
                className="modal-secondary-btn"
                style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#ff627d' }}
                onClick={onLogout}
              >
                <LogOut size={15} /> Sign Out
              </button>
              <button
                className="modal-primary-btn"
                style={{ flex: 1 }}
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <span className="eyebrow">TRAVEL YATRA PASSPORT</span>
              <h2>Sign in with <i>Email.</i></h2>
              <p>Sign in to save your journeys, access your Travel Desk, and receive booking confirmation passes directly in your inbox.</p>
            </div>

            <div className="plan-field-group" style={{ marginBottom: '14px' }}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Siddhant Srivastava"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="plan-field-group" style={{ marginBottom: '14px' }}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="e.g. siddhantsrivastava2005@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="plan-field-group" style={{ marginBottom: '20px' }}>
              <label>Mobile Number (For WhatsApp Itinerary)</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="submit" className="modal-primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <LogIn size={15} /> Continue & Sign In
              </button>
              
              <button
                type="button"
                className="auth-quick-btn"
                onClick={handleQuickDemoLogin}
              >
                <Sparkles size={14} color="var(--yatra-accent)" /> 1-Click Sign In as Siddhant (siddhantsrivastava2005@gmail.com)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   MAIN APP
   ============================================================================ */

function App() {
  // Intro video plays every time on the start / load / refresh
  const [showIntro, setShowIntro] = useState(true);

  const handleCompleteIntro = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    if (showIntro) {
      document.body.classList.add('video-playing');
      document.documentElement.classList.add('video-playing');
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove('video-playing');
      document.documentElement.classList.remove('video-playing');
    }
    return () => {
      document.body.classList.remove('video-playing');
      document.documentElement.classList.remove('video-playing');
    };
  }, [showIntro]);

  // User Login State (persisted across page refresh)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('yatra_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('yatra_user', JSON.stringify(userData));
    } catch (e) {}
    setIsAuthModalOpen(false);
    triggerToast(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('yatra_user');
    } catch (e) {}
    setIsAuthModalOpen(false);
    triggerToast('Signed out of Travel Yatra');
  };

  // Dynamic Search state
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    date: 'any',
    category: 'all',
    budget: 'all'
  });

  const [activePackageCategory, setActivePackageCategory] = useState('All');

  // Modals & Drawers
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [planInitialDest, setPlanInitialDest] = useState('');
  const [selectedDrawerPackage, setSelectedDrawerPackage] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [manageBookingTarget, setManageBookingTarget] = useState(null);

  // Saved Wishlist
  const [wishlist, setWishlist] = useState(['swiss-grand-tour', 'japan-after-dark']);

  // Cart State (Preloaded with 1 default journey for immediate testing)
  const [cart, setCart] = useState([
    {
      pkg: packages[0],
      travelers: 2,
      travelDate: 'JUL 15 — JUL 21, 2026'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Razorpay Checkout State
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);

  // Travel Desk Bookings State
  const [bookings, setBookings] = useState(deskBookingsData);

  // Floating Toast
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleAddToCart = (pkg, travelers = 2, travelDate = 'AUG 10 — AUG 16, 2026') => {
    setCart(prev => {
      const existing = prev.find(item => item.pkg.id === pkg.id);
      if (existing) {
        return prev.map(item =>
          item.pkg.id === pkg.id
            ? { ...item, travelers: item.travelers + 1 }
            : item
        );
      }
      return [...prev, { pkg, travelers, travelDate }];
    });
    triggerToast(`Added "${pkg.title}" to Cart`);
    setIsCartOpen(true);
  };

  const handleUpdateTravelers = (packageId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.pkg.id === packageId) {
        const next = Math.max(1, Math.min(12, item.travelers + delta));
        return { ...item, travelers: next };
      }
      return item;
    }));
  };

  const handleUpdateDate = (packageId, newDate) => {
    setCart(prev => prev.map(item => {
      if (item.pkg.id === packageId) {
        return { ...item, travelDate: newDate };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (packageId) => {
    setCart(prev => prev.filter(item => item.pkg.id !== packageId));
    triggerToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
    triggerToast('Cart cleared');
  };

  const handleProceedCheckout = (items) => {
    setCheckoutItems(items && items.length > 0 ? items : cart);
    setIsCartOpen(false);
    setIsRazorpayOpen(true);
  };

  const handleInstantCheckout = (pkg) => {
    const item = {
      pkg,
      travelers: 2,
      travelDate: 'AUG 15 — AUG 21, 2026'
    };
    setCheckoutItems([item]);
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    // Clear cart upon payment
    setCart([]);

    // Add confirmed journeys to bookings desk
    const newBookings = checkoutItems.map((item, idx) => ({
      id: `booking-${Date.now()}-${idx}`,
      label: `${item.pkg.country} / ${item.pkg.title}`,
      destination: `${item.pkg.country} / ${item.pkg.place || item.pkg.meta}`,
      dates: `${item.travelDate.toUpperCase()} · ${item.pkg.nights} NIGHTS`,
      collection: `Travel Yatra Signature · ${item.travelers} guest${item.travelers > 1 ? 's' : ''}`,
      price: `₹${(item.pkg.numericPrice * item.travelers).toLocaleString('en-IN')}`,
      status: 'Confirmed (Paid via UPI)',
      ref: `#TY-${paymentDetails.paymentId.slice(-6).toUpperCase()}`,
      packageRef: item.pkg.id,
      paymentRef: paymentDetails.paymentId,
      paymentMethod: paymentDetails.method
    }));

    setBookings(prev => [...newBookings, ...prev]);
  };

  const handleToggleWishlist = (id, title) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        triggerToast(`Removed "${title}" from saved`);
        return prev.filter(x => x !== id);
      } else {
        triggerToast(`Saved "${title}" to your Wishlist`);
        return [...prev, id];
      }
    });
  };

  const handleOpenPlan = (destinationName = '') => {
    setPlanInitialDest(destinationName);
    setIsPlanModalOpen(true);
  };

  const handleExecuteSearch = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDestinationSelect = (countryName) => {
    setSearchFilters(prev => ({ ...prev, query: countryName }));
    setActivePackageCategory('All');
    handleExecuteSearch();
  };

  const handleOpenPackageById = (packageId) => {
    const found = packages.find(p => p.id === packageId);
    if (found) {
      setSelectedDrawerPackage(found);
    }
  };

  // Filter packages dynamically
  const filteredPackages = packages.filter(p => {
    if (searchFilters.query) {
      const q = searchFilters.query.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCountry = p.country.toLowerCase().includes(q);
      const matchMeta = p.meta.toLowerCase().includes(q);
      const matchType = p.type.toLowerCase().includes(q);
      if (!matchTitle && !matchCountry && !matchMeta && !matchType) return false;
    }
    if (searchFilters.category !== 'all') {
      if (p.type.toLowerCase() !== searchFilters.category.toLowerCase()) return false;
    }
    return true;
  });

  return (
    <>
      {showIntro && <FullscreenIntroVideo onComplete={handleCompleteIntro} />}
      <div id="top" />
      <AirplaneIntro />
      <Nav
        onWatchIntro={() => setShowIntro(true)}
        onOpenPlan={() => handleOpenPlan('')}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main>
        <section className="hero-market">
          <div className="hero-inner">
            <span className="eyebrow">TRAVEL PACKAGE MARKETPLACE</span>
            <h2>Your next story<br /><i>starts here.</i></h2>
            <p>Compare domestic and international packages, filter by budget, explore every day of the itinerary, and book when it feels right.</p>

            <SearchBar
              searchFilters={searchFilters}
              setSearchFilters={setSearchFilters}
              onExecuteSearch={handleExecuteSearch}
            />

            <div className="hero-trust">
              <span><ShieldCheck size={15} /> Verified packages</span>
              <span><Compass size={15} /> Local experts</span>
              <span><Globe2 size={15} /> 40+ countries</span>
            </div>
          </div>
        </section>

        <DestinationRail
          onSelectDestination={handleDestinationSelect}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          onPlanDestination={handleOpenPlan}
        />

        <Packages
          packagesList={filteredPackages}
          onSelectPackage={setSelectedDrawerPackage}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          onResetFilters={() => {
            setSearchFilters({ query: '', date: 'any', category: 'all', budget: 'all' });
            setActivePackageCategory('All');
          }}
          activeCategory={activePackageCategory}
          setActiveCategory={setActivePackageCategory}
          onAddToCart={handleAddToCart}
        />

        <Itinerary onOpenPlan={handleOpenPlan} />

        <Booking
          bookings={bookings}
          onOpenPackageById={handleOpenPackageById}
          onOpenManageBooking={setManageBookingTarget}
        />
      </main>

      <Footer />

      {/* Plan Journey Interactive Modal */}
      <PlanJourneyModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        initialDestination={planInitialDest}
        onShowToast={triggerToast}
      />

      {/* Trip Details Drawer */}
      <TripDrawer
        pkg={selectedDrawerPackage}
        isOpen={!!selectedDrawerPackage}
        onClose={() => setSelectedDrawerPackage(null)}
        onBookPackage={handleOpenPlan}
        onAddToCart={handleAddToCart}
        onInstantCheckout={handleInstantCheckout}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateTravelers={handleUpdateTravelers}
        onUpdateDate={handleUpdateDate}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCheckout}
        onExplorePackages={() => {
          const el = document.getElementById('packages');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Razorpay Test Payment Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        checkoutItems={checkoutItems}
        onPaymentSuccess={handlePaymentSuccess}
        onShowToast={triggerToast}
        currentUser={currentUser}
      />

      {/* User Login & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onSelectPackageById={handleOpenPackageById}
        onRemoveWishlist={(id) => handleToggleWishlist(id, 'Item')}
      />

      {/* Manage Booking Modal */}
      <ManageBookingModal
        booking={manageBookingTarget}
        isOpen={!!manageBookingTarget}
        onClose={() => setManageBookingTarget(null)}
        onShowToast={triggerToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="yatra-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
