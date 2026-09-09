import React, { useState, useEffect } from 'react';
import {
  Users,
  MapPin,
  Calendar,
  Trophy,
  HeartHandshake,
  ArrowRight,
  Clock,
  Flame,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Activity,
  Compass,
  Sun,
  Award,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Types
interface RouteInfo {
  id: string;
  name: string;
  distance: string;
  elevation: string;
  terrain: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging';
  description: string;
  image: string;
  highlights: string[];
}

interface ScheduleEvent {
  day: string;
  time: string;
  title: string;
  location: string;
  distance: string;
  pace: string;
  level: string;
  badgeColor: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);
  const [scheduleFilter, setScheduleFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  // Pace calculator state
  const [calcDistance, setCalcDistance] = useState<number>(5); // km
  const [calcHours, setCalcHours] = useState<number>(0);
  const [calcMinutes, setCalcMinutes] = useState<number>(30);
  const [calcSeconds, setCalcSeconds] = useState<number>(0);

  // Membership modal state
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'Beginner',
    tshirtSize: 'M',
    preferredDay: 'Weekend Runs'
  });

  // Active FAQ index
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Calculate Pace
  const calculatePace = () => {
    const totalSeconds = calcHours * 3600 + calcMinutes * 60 + calcSeconds;
    if (totalSeconds <= 0 || calcDistance <= 0) return { paceMin: 0, paceSec: 0, speedKmH: 0 };

    const paceInSecondsPerKm = totalSeconds / calcDistance;
    const paceMin = Math.floor(paceInSecondsPerKm / 60);
    const paceSec = Math.round(paceInSecondsPerKm % 60);
    const speedKmH = (calcDistance / (totalSeconds / 3600)).toFixed(1);

    return { paceMin, paceSec, speedKmH };
  };

  const calculatedPace = calculatePace();

  // Recommended group based on calculated pace
  const getRecommendedGroup = (paceMin: number) => {
    if (paceMin === 0) return 'Select time to calculate';
    if (paceMin < 5) return 'Group A (Elite & Fast Tempo - < 5:00 min/km)';
    if (paceMin < 6) return 'Group B (Steady Endurance - 5:00 - 6:00 min/km)';
    if (paceMin < 7) return 'Group C (Social Pace - 6:00 - 7:00 min/km)';
    return 'Group D (Walk-Run & Beginners - > 7:00 min/km)';
  };

  const routes: RouteInfo[] = [
    {
      id: 'lake-round',
      name: 'Kurunegala Lake Round Loop',
      distance: '4.8 km per lap',
      elevation: '12 m (Flat)',
      terrain: 'Paved Lake Track',
      difficulty: 'Easy',
      description: 'The heartbeat of Kurunegala runners! A lush, shaded circuit encircling the historic Kurunegala Lake (Wewa Ruma) with breezes off the water and majestic backdrop views of Ethagala.',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Water stations available', 'Well-lit for early morning/sunset', 'Zero vehicular traffic on inner track']
    },
    {
      id: 'ethagala-peak',
      name: 'Ethagala (Elephant Rock) Summit Challenge',
      distance: '3.5 km',
      elevation: '325 m (Steep Climb)',
      terrain: 'Asphalt & Hill Trail',
      difficulty: 'Challenging',
      description: 'Conquer Kurunegala\'s iconic landmark! Starting from the town center up the winding road to the giant Buddha statue atop Ethagala Rock. Rewarding 360-degree panoramic views of the city.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Incredible elevation training', 'Sunrise view over Kurunegala city', 'Giant Ethagala Buddha landmark']
    },
    {
      id: 'bathalagoda-loop',
      name: 'Bathalagoda Rural Endurance Trail',
      distance: '14.0 km',
      elevation: '65 m (Rolling)',
      terrain: 'Gravel & Paved Roads',
      difficulty: 'Moderate',
      description: 'An idyllic countryside long run weaving past paddy fields, coconut groves, and the serene Bathalagoda Reservoir. Perfect for half-marathon and marathon build-up.',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Breathtaking rural Sri Lanka scenery', 'Low traffic roads', 'Ideal for weekend endurance']
    },
    {
      id: 'stadium-track',
      name: 'Welagedara Stadium Interval Loop',
      distance: '400 m Track / 2.5 km Perimeter',
      elevation: 'Flat',
      terrain: 'Synthetic Track & Turf',
      difficulty: 'Easy',
      description: 'Used for Stride Run Club\'s Thursday Night Speed Sessions. Great for track intervals, stride work, and 5K time trials in the heart of Kurunegala.',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Floodlit evening sessions', 'Coach-led tempo workouts', 'Hydration station']
    }
  ];

  const scheduleEvents: ScheduleEvent[] = [
    {
      day: 'Tuesday Morning',
      time: '5:30 AM - 6:30 AM',
      title: 'Sunrise Social Lake Run',
      location: 'Kurunegala Lake Round (Near Clock Tower Gate)',
      distance: '5 km (1 Lap)',
      pace: 'Conversational (6:00 - 7:30 min/km)',
      level: 'Beginner Friendly',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      day: 'Thursday Evening',
      time: '6:00 PM - 7:15 PM',
      title: 'Track & Interval Night',
      location: 'Welagedara Stadium, Kurunegala',
      distance: '4 - 6 km Total (Intervals)',
      pace: 'Variable / Speed Drills',
      level: 'All Levels',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      day: 'Saturday Morning',
      time: '6:00 AM - 7:30 AM',
      title: 'Ethagala Hill Summit Stride',
      location: 'Ethagala Foothills Park Entrance',
      distance: '7 km Out & Back',
      pace: 'Power Hill Run & Jog',
      level: 'Intermediate / Advanced',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    },
    {
      day: 'Sunday Morning',
      time: '5:15 AM - 8:00 AM',
      title: 'Sunday Endurance Long Run',
      location: 'Kurunegala Lake Round to Bathalagoda Circuit',
      distance: '10 km / 15 km / 21 km Options',
      pace: 'Group Pace Options (5:00 - 7:00 min/km)',
      level: 'Intermediate & Marathoners',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  ];

  const filteredSchedule = scheduleEvents.filter(event => {
    if (scheduleFilter === 'All') return true;
    if (scheduleFilter === 'Beginner') return event.level.includes('Beginner') || event.level.includes('All Levels');
    if (scheduleFilter === 'Intermediate') return event.level.includes('Intermediate') || event.level.includes('All Levels');
    if (scheduleFilter === 'Advanced') return event.level.includes('Advanced') || event.level.includes('Marathoners');
    return true;
  });

  const faqs = [
    {
      q: "Do I need to be a fast runner to join Stride Run Club Kurunegala?",
      a: "Absolutely not! Stride Run Club is open to all fitness levels—from complete beginners who walk-run to seasoned marathoners. We always have designated pace group leaders who ensure no runner is left behind."
    },
    {
      q: "Is there any membership fee to join weekly runs?",
      a: "Our regular weekly community runs (Tuesday, Thursday, Saturday, Sunday) are 100% FREE! We believe fitness and community support should be accessible to everyone in Kurunegala."
    },
    {
      q: "Where do we meet for runs in Kurunegala?",
      a: "Our main meeting spot is near the Kurunegala Lake Round main pavilion (close to the Clock Tower side). Thursday speed sessions meet at Welagedara Stadium."
    },
    {
      q: "What should I bring for my first Stride run?",
      a: "Wear comfortable running shoes, breathable athletic clothing, bring a refillable water bottle, and bring your energy! We provide water refill stations at main weekend runs."
    },
    {
      q: "How can I join the official Stride WhatsApp community?",
      a: "Simply click the 'Join Stride Run Club' button on this site and complete the quick registration form. You'll receive an instant link to our official Stride Kurunegala WhatsApp announcement group!"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1416] text-[#f3f4f6] selection:bg-[#e25822] selection:text-white font-sans">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#0f1416]/90 backdrop-blur-md border-b border-[#2a383e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/images/stride-logo-dark.jpeg"
                alt="Stride Run Club Logo"
                className="h-12 w-12 rounded-full border border-orange-500/40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                  STRIDE <span className="text-[#e25822]">RUN CLUB</span>
                </span>
                <span className="text-xs text-[#9ca3af] tracking-wider uppercase font-semibold">
                  Kurunegala • Sri Lanka
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#about" className="hover:text-[#e25822] transition-colors">About Us</a>
              <a href="#schedule" className="hover:text-[#e25822] transition-colors">Weekly Schedule</a>
              <a href="#routes" className="hover:text-[#e25822] transition-colors">Kurunegala Routes</a>
              <a href="#calculator" className="hover:text-[#e25822] transition-colors">Pace Tool</a>
              <a href="#faq" className="hover:text-[#e25822] transition-colors">FAQ</a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => setIsJoinModalOpen(true)}
                className="bg-[#e25822] hover:bg-[#f97316] text-white font-semibold px-5 py-2.5 rounded-full shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer"
              >
                Join Stride Club
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#182023]"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#2a383e] bg-[#122023] px-4 pt-2 pb-6 space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium hover:text-[#e25822]"
            >
              About Us
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium hover:text-[#e25822]"
            >
              Weekly Schedule
            </a>
            <a
              href="#routes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium hover:text-[#e25822]"
            >
              Kurunegala Routes
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium hover:text-[#e25822]"
            >
              Pace Tool
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium hover:text-[#e25822]"
            >
              FAQ
            </a>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsJoinModalOpen(true);
              }}
              className="w-full mt-2 bg-[#e25822] hover:bg-[#f97316] text-white font-semibold py-3 rounded-xl"
            >
              Join Stride Club
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#2a383e]">
        {/* Grid Background Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
          <div className="grid grid-cols-12 h-full divide-x divide-white/10">
            <div className="col-span-1" />
            <div className="col-span-3" />
            <div className="col-span-4" />
            <div className="col-span-3" />
            <div className="col-span-1" />
          </div>
        </div>

        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          {/* Gradient Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1416] via-[#0f1416]/80 to-[#0f1416]/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl px-6 py-20 text-center mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#f97316] text-sm font-semibold mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Kurunegala's Premier Running Community</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
            FIND YOUR STRIDE UNDER THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#e25822] to-amber-400">ELEPHANT ROCK</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 font-normal leading-relaxed mb-10">
            Connecting runners of all levels around the scenic Kurunegala Lake Round, Ethagala trails, and lush North Western roads. Community, fitness, and passion in every stride.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => setIsJoinModalOpen(true)}
              className="w-full sm:w-auto bg-[#e25822] hover:bg-[#f97316] text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-orange-500/25 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Join Next Group Run</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <a href="#schedule" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-gray-600 bg-[#182023]/80 hover:bg-[#182023] text-gray-200 hover:text-white font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300"
              >
                View Weekly Schedule
              </Button>
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#182023]/90 border border-[#2a383e] backdrop-blur-sm max-w-4xl mx-auto">
            <div className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#e25822]">250+</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Active Members</div>
            </div>
            <div className="text-center p-2 border-l border-[#2a383e]">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">4 Runs</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Weekly Meetups</div>
            </div>
            <div className="text-center p-2 border-l border-[#2a383e]">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Free Community</div>
            </div>
            <div className="text-center p-2 border-l border-[#2a383e]">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">4.8 KM</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Iconic Lake Circuit</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#2a383e] shadow-2xl bg-[#182023] group">
              <img
                src="/images/stride-logo-light.jpeg"
                alt="Stride Run Club Kurunegala Crest"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1416] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#e25822] text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  Official Crest
                </span>
                <p className="text-white font-bold text-lg mt-2">
                  Stride Run Club • Kurunegala, Sri Lanka
                </p>
                <p className="text-gray-300 text-xs">
                  Surrounded by Ethagala Elephant Rock & Lake Round
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-[#212d32] border border-[#2a383e] p-4 rounded-2xl shadow-xl">
              <div className="p-3 bg-orange-500/20 text-[#e25822] rounded-xl">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-sm font-bold text-white">Kurunegala, Wayamba</p>
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#e25822] font-semibold text-sm uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A Running Community Built for Kurunegala
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Founded in the shadow of the legendary Ethagala (Elephant Rock), <strong className="text-white">Stride Run Club</strong> brings together runners, joggers, walkers, and fitness enthusiasts across Kurunegala and the Wayamba province.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              Whether you are preparing for your very first 5K around Kurunegala Lake Round, tackling hill repeats up Ethagala, or training for a full marathon, Stride provides the motivation, camaraderie, and coaching structure to help you hit your goals.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#182023] border border-[#2a383e]">
                <Users className="w-6 h-6 text-[#e25822] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Inclusive Pace Groups</h4>
                  <p className="text-xs text-gray-400 mt-1">From beginner walk-runners (7:30+ min/km) to elite paces (&lt;4:30 min/km).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#182023] border border-[#2a383e]">
                <MapPin className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Scenic Local Routes</h4>
                  <p className="text-xs text-gray-400 mt-1">Lake Round, Ethagala trails, Bathalagoda green tracks & Welagedara stadium.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#182023] border border-[#2a383e]">
                <HeartHandshake className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Zero Fees</h4>
                  <p className="text-xs text-gray-400 mt-1">Free to join all community group runs, sunrise sessions, and post-run tea chats.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#182023] border border-[#2a383e]">
                <Trophy className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Events & Time Trials</h4>
                  <p className="text-xs text-gray-400 mt-1">Monthly 5K benchmark runs, trail adventures, and annual night runs.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section id="schedule" className="py-20 bg-[#122023] border-y border-[#2a383e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[#e25822] font-semibold text-sm uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Weekly Meetups</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Weekly Run Schedule
            </h2>
            <p className="text-gray-300 mt-4 text-base sm:text-lg">
              We run 4 days a week in Kurunegala. All sessions are coach-guided with hydration and pace leaders.
            </p>

            {/* Level Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setScheduleFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer",
                    scheduleFilter === filter
                      ? "bg-[#e25822] text-white shadow-md shadow-orange-500/20"
                      : "bg-[#182023] text-gray-400 hover:text-white border border-[#2a383e]"
                  )}
                >
                  {filter === 'All' ? 'All Sessions' : `${filter} Level`}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchedule.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#182023] border border-[#2a383e] hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[#212d32] text-orange-400 border border-orange-500/20">
                      {item.day}
                    </span>
                    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-md border", item.badgeColor)}>
                      {item.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#e25822] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-300 my-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Distance: <strong>{item.distance}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Target Pace: <strong>{item.pace}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2a383e] flex items-center justify-between">
                  <span className="text-xs text-gray-400">Hydration Provided</span>
                  <Button
                    onClick={() => setIsJoinModalOpen(true)}
                    size="sm"
                    className="bg-transparent hover:bg-[#e25822] text-[#e25822] hover:text-white border border-[#e25822] rounded-full text-xs font-semibold transition-colors"
                  >
                    RSVP / Join Group
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kurunegala Routes Showcase */}
      <section id="routes" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#e25822] font-semibold text-sm uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Discover Kurunegala</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Signature Running Routes
          </h2>
          <p className="text-gray-300 mt-4 text-base sm:text-lg">
            Explore the diverse terrain of Kurunegala—from smooth lake laps to challenging mountain climbs.
          </p>
        </div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-[#182023] border border-[#2a383e] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#0f1416]/90 border border-[#2a383e] backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-400">
                    {route.difficulty}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#e25822] transition-colors">
                    {route.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4 bg-[#0f1416] p-3 rounded-xl border border-[#2a383e]">
                    <div>
                      <span className="block text-gray-500">Distance</span>
                      <span className="font-bold text-white">{route.distance}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Elevation</span>
                      <span className="font-bold text-white">{route.elevation}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">
                    {route.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-gray-400 mb-4">
                    {route.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  onClick={() => setSelectedRoute(route)}
                  className="w-full bg-[#212d32] hover:bg-[#e25822] text-gray-200 hover:text-white border border-[#2a383e] text-xs font-semibold py-2 rounded-xl transition-all"
                >
                  View Route Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Runner Pace Calculator Tool */}
      <section id="calculator" className="py-20 bg-[#122023] border-y border-[#2a383e]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#182023] border border-[#2a383e] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-[#2a383e] pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[#e25822] font-semibold text-xs uppercase tracking-wider mb-1">
                  <Activity className="w-4 h-4" />
                  <span>Interactive Runner Tool</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Stride Pace & Race Calculator
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Calculate your required pace (min/km) or estimated finish time for Kurunegala Lake runs & half marathons.
                </p>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl shrink-0">
                <Flame className="w-8 h-8 text-[#e25822]" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Inputs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Preset Distances */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Select Distance
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: '4.8K (Lake)', dist: 4.8 },
                      { name: '5K', dist: 5 },
                      { name: '10K', dist: 10 },
                      { name: '21.1K (Half)', dist: 21.1 },
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setCalcDistance(item.dist)}
                        className={cn(
                          "py-2.5 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center",
                          calcDistance === item.dist
                            ? "bg-[#e25822] text-white border-[#e25822]"
                            : "bg-[#0f1416] text-gray-300 border-[#2a383e] hover:border-gray-500"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Distance input */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Or Enter Custom Distance (km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="100"
                    value={calcDistance}
                    onChange={(e) => setCalcDistance(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-[#e25822]"
                  />
                </div>

                {/* Target Duration inputs */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Target Finish Time (Hours : Minutes : Seconds)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Hours</span>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={calcHours}
                        onChange={(e) => setCalcHours(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3 py-2.5 text-white text-center text-lg focus:outline-none focus:border-[#e25822]"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Minutes</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={calcMinutes}
                        onChange={(e) => setCalcMinutes(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3 py-2.5 text-white text-center text-lg focus:outline-none focus:border-[#e25822]"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Seconds</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={calcSeconds}
                        onChange={(e) => setCalcSeconds(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3 py-2.5 text-white text-center text-lg focus:outline-none focus:border-[#e25822]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="lg:col-span-5 bg-[#0f1416] border border-[#2a383e] rounded-2xl p-6 text-center space-y-6">
                <div>
                  <span className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                    Calculated Average Pace
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e25822] to-amber-400 mt-2">
                    {calculatedPace.paceMin}:
                    {calculatedPace.paceSec < 10 ? `0${calculatedPace.paceSec}` : calculatedPace.paceSec}
                    <span className="text-lg font-normal text-gray-400 ml-1">/km</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#2a383e] text-center">
                  <div>
                    <span className="text-xs text-gray-500 block">Average Speed</span>
                    <span className="text-xl font-bold text-white">{calculatedPace.speedKmH} <span className="text-xs font-normal text-gray-400">km/h</span></span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Est. Lake Lap (4.8K)</span>
                    <span className="text-xl font-bold text-orange-400">
                      {Math.floor((calculatedPace.paceMin * 60 + calculatedPace.paceSec) * 4.8 / 60)}m
                    </span>
                  </div>
                </div>

                {/* Stride Group Recommendation */}
                <div className="p-4 bg-[#182023] border border-[#2a383e] rounded-xl text-left">
                  <span className="text-xs text-orange-400 font-bold uppercase block mb-1">
                    Recommended Stride Pace Group:
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {getRecommendedGroup(calculatedPace.paceMin)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Events Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#e25822] font-semibold text-sm uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Community Vibes</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              More Than Just Running
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              At Stride Run Club Kurunegala, every run finishes with high-fives, refreshing coconut water, local tea, and great conversations. We host monthly community clean-up runs around Lake Round, social post-run breakfasts, and track events.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#182023] border border-[#2a383e]">
                <Sun className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold">Post-Run Socials</h4>
                  <p className="text-xs text-gray-400 mt-1">Join us for fresh king coconuts (Thambili) and morning coffee at the lakefront after weekend runs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#182023] border border-[#2a383e]">
                <HeartHandshake className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold">Lake Round Clean Up Runs</h4>
                  <p className="text-xs text-gray-400 mt-1">Plogging sessions to keep Kurunegala lakefront clean and beautiful for everyone.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
              alt="Group runners"
              className="rounded-2xl border border-[#2a383e] h-64 object-cover w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80"
              alt="Runner in action"
              className="rounded-2xl border border-[#2a383e] h-64 object-cover w-full shadow-lg mt-8"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#122023] border-t border-[#2a383e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Everything you need to know before taking your first stride with us in Kurunegala.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#182023] border border-[#2a383e] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-5 font-bold text-white flex items-center justify-between gap-4 hover:text-[#e25822] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-[#e25822] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {openFaq === i && (
                  <div className="p-5 pt-0 text-sm text-gray-300 leading-relaxed border-t border-[#2a383e]/50 mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner CTA */}
      <section className="py-16 bg-gradient-to-r from-[#e25822] to-amber-600 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            READY TO RUN KURUNEGALA WITH US?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8 font-medium">
            Join over 250 local runners. No fees, no obligations—just good runs and great people.
          </p>
          <Button
            onClick={() => setIsJoinModalOpen(true)}
            className="bg-black hover:bg-gray-900 text-white font-extrabold text-lg px-10 py-6 rounded-full shadow-2xl transition-all cursor-pointer hover:scale-105"
          >
            Register Now - 100% Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1416] border-t border-[#2a383e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/stride-logo-dark.jpeg"
                  alt="Stride Logo"
                  className="h-10 w-10 rounded-full border border-orange-500/40 object-cover"
                />
                <span className="font-extrabold text-xl text-white">
                  STRIDE <span className="text-[#e25822]">RUN CLUB</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                Kurunegala's premier running community. Promoting physical wellness, mental clarity, and friendly athletic camaraderie around Kurunegala Lake & Ethagala.
              </p>
              <div className="flex items-center gap-4 text-gray-400 pt-2">
                <a href="#" aria-label="Instagram" className="hover:text-[#e25822] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="hover:text-[#e25822] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="WhatsApp" className="hover:text-[#e25822] transition-colors"><MessageCircle className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#about" className="hover:text-white">About Stride</a></li>
                <li><a href="#schedule" className="hover:text-white">Weekly Runs</a></li>
                <li><a href="#routes" className="hover:text-white">Kurunegala Routes</a></li>
                <li><a href="#calculator" className="hover:text-white">Pace Calculator</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Location Hub</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                Main Meeting Hub: Kurunegala Lake Round Gate (Clock Tower side), Kurunegala 60000, Sri Lanka.
              </p>
              <p className="text-xs text-[#e25822] font-semibold">
                stride.kurunegala@gmail.com
              </p>
            </div>
          </div>

          <div className="border-t border-[#2a383e] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} Stride Run Club Kurunegala. All rights reserved.</p>
            <p className="text-gray-400">Made with ❤️ for Kurunegala Runners</p>
          </div>
        </div>
      </footer>

      {/* Route Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#182023] border border-[#2a383e] rounded-3xl max-w-xl w-full p-6 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRoute(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-[#0f1416]"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedRoute.image}
              alt={selectedRoute.name}
              className="w-full h-48 object-cover rounded-2xl border border-[#2a383e]"
            />

            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                {selectedRoute.difficulty} Route
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{selectedRoute.name}</h3>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">{selectedRoute.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#0f1416] p-4 rounded-xl border border-[#2a383e] text-center text-xs">
              <div>
                <span className="text-gray-500 block">Distance</span>
                <span className="font-bold text-white text-sm">{selectedRoute.distance}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Elevation</span>
                <span className="font-bold text-white text-sm">{selectedRoute.elevation}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Surface</span>
                <span className="font-bold text-white text-sm">{selectedRoute.terrain}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Route Highlights</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {selectedRoute.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => {
                setSelectedRoute(null);
                setIsJoinModalOpen(true);
              }}
              className="w-full bg-[#e25822] hover:bg-[#f97316] text-white font-bold py-3 rounded-xl"
            >
              Run This Route With Stride
            </Button>
          </div>
        </div>
      )}

      {/* Join Stride Membership Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#182023] border border-[#2a383e] rounded-3xl max-w-md w-full p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setIsJoinModalOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-[#0f1416]"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <img src="/images/stride-logo-dark.jpeg" className="h-10 w-10 rounded-full" alt="Stride" />
                  <div>
                    <h3 className="text-xl font-extrabold text-white">Join Stride Run Club</h3>
                    <p className="text-xs text-gray-400">Free Membership • Kurunegala</p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4 text-sm"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kasun Perera"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#e25822]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">WhatsApp Mobile Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#e25822]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="kasun@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#e25822]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Running Level</label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                        className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#e25822]"
                      >
                        <option value="Beginner">Beginner (Walk-Run)</option>
                        <option value="Intermediate">Intermediate (5K-10K)</option>
                        <option value="Advanced">Advanced (10K+ / Marathon)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">T-Shirt Size</label>
                      <select
                        value={formData.tshirtSize}
                        onChange={(e) => setFormData({...formData, tshirtSize: e.target.value})}
                        className="w-full bg-[#0f1416] border border-[#2a383e] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#e25822]"
                      >
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#e25822] hover:bg-[#f97316] text-white font-bold py-3 rounded-xl mt-4 cursor-pointer"
                  >
                    Complete Free Registration
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Welcome to Stride, {formData.name}!</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your registration is complete. You are officially part of Stride Run Club Kurunegala!
                </p>

                <div className="p-4 bg-[#0f1416] border border-[#2a383e] rounded-2xl text-left space-y-2">
                  <span className="text-xs font-bold text-orange-400 uppercase block">Next Steps:</span>
                  <p className="text-xs text-gray-300">
                    1. Tap below to join our official Stride WhatsApp Group for weekly run announcements.
                  </p>
                  <p className="text-xs text-gray-300">
                    2. See you at Kurunegala Lake Round for our next meetup!
                  </p>
                </div>

                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Join Official Stride WhatsApp Group
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
