export const business = {
  name: 'Praxis Jiu Jitsu Academy', phone: '505-459-6188', tel: 'tel:5054596188', sms: 'sms:5054596188',
  email: 'info@prxsjiujitsu.com', instagram: 'https://www.instagram.com/praxisjjacademy/',
  street: '965 US Highway 550, Suite E', city: 'Bernalillo, NM 87004',
  tagline: 'Black belt founded. Family owned. Community driven.',
  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.2739019583223!2d-106.56645882203387!3d35.324019272704625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872279e87cb9a483%3A0x8b7654313a277bf1!2sPraxis%20Jiu%20Jitsu%20Academy!5e0!3m2!1sen!2sus!4v1773604604790!5m2!1sen!2sus',
  directions: 'https://www.google.com/maps/search/?api=1&query=Praxis+Jiu+Jitsu+Academy+965+US+550+Bernalillo+NM',
};
export const home = {
  headline: 'Forge Your Best Self',
  intro: 'High-level instruction in an environment built on respect, consistency, and genuine care.',
  community: 'Kids and adults. First-timers and black belts. Everyone on these mats started with a single class — and everyone here remembers what that felt like.',
  mission: [
    "Praxis Jiu Jitsu was founded on a simple belief: the best academies don't just teach technique — they build people. We created a space where students aren't just training, they're growing.",
    "Whether you're stepping on the mats for the very first time or you're a seasoned competitor, you belong here. Our curriculum is built around fundamentals, problem-solving, and the kind of intentional practice that creates lasting improvement.",
  ],
  mats: 'Our academy is built on a professional Floating platform Jiu Jitsu Mat System, not a basic mat-on-concrete setup. This platform is designed to absorb impact, reduce stress on the joints, and create a safer, more comfortable training surface for students of all levels. It allows athletes to train harder, longer, and with more confidence while giving our facility a cleaner, more professional feel that separates us from the average jiu jitsu gym.',
  programIntro: 'From your very first class to competition prep — we have a path built for you.',
  scheduleIntro: 'Monday through Saturday at 965 US-550, Suite E, Bernalillo NM. Your first class is always free.',
  cta: 'No experience needed. No commitment required. Just show up.',
};
export const values = [
  { name: 'Respect', text: 'Every student matters. Every journey is honored — on and off the mats.' },
  { name: 'Consistency', text: 'Progress is earned through dedication. We show up, so our students can too.' },
  { name: 'Community', text: 'A family-centered gym where growth is a shared experience, not a solo grind.' },
];
export const programs = [
  { name: 'Adult BJJ', image: 'adults', alt: 'Two adult students rolling during a Praxis Jiu Jitsu class', text: 'Our flagship program. Build functional grappling skills, sharpen your problem-solving on the mats, and train alongside a community that genuinely has your back.' },
  { name: 'Kids BJJ', image: 'kids', alt: 'Young students drilling takedowns while a coach supervises at Praxis Jiu Jitsu', text: 'Structured, fun, and confidence-building. Our kids program instills discipline, respect, and real self-defense skills in a safe, encouraging atmosphere.' },
  { name: "Women's BJJ", image: 'women', alt: 'Two women training together under the Praxis Jiu Jitsu Academy banner', text: 'A dedicated space for women to train, grow, and build real self-defense skills. Coach Nikki brings 10+ years of expertise and a warm, empowering energy to every class.' },
];
export type ClassKind = 'kids' | 'beginners' | 'gi' | 'nogi' | 'open';
export type Session = { time: string; name: string; detail?: string; kind: ClassKind };
const gi: Session = { time: '6:00 PM', name: 'Adult Gi', detail: 'Intermediate', kind: 'gi' };
const evening: Session[] = [
  { time: '5:00 PM', name: 'Kids Class', kind: 'kids' },
  { time: '6:00 PM', name: 'Adult Beginners', kind: 'beginners' },
  { time: '7:00 PM', name: 'Adult No-Gi', detail: 'Advanced', kind: 'nogi' },
];
export const schedule: { day: string; sessions: Session[] }[] = [
  { day: 'Monday', sessions: [gi] }, { day: 'Tuesday', sessions: evening },
  { day: 'Wednesday', sessions: [gi] }, { day: 'Thursday', sessions: evening },
  { day: 'Friday', sessions: [{ time: '6:00 PM', name: 'Live Training', detail: 'All schools welcome', kind: 'open' }] },
  { day: 'Saturday', sessions: [{ time: '11:00 AM', name: 'All Levels No-Gi', detail: 'Beginners welcome', kind: 'nogi' }] },
];
export const coaches = [
  { name: 'Darien Molina', image: 'darien', role: 'Head Coach · Adult Program', bio: 'Over 10 years of training and competitive experience. Specializes in adult instruction with an emphasis on fundamentals, problem-solving, and building lasting confidence through intentional practice.' },
  { name: 'Nikki Molina', image: 'nikki', role: "Black Belt · Kids & Women's Programs", bio: "Black belt with 10+ years across kids, adult, and women's programs. Creates welcoming environments where every student feels valued, seen, and genuinely encouraged to grow." },
];
export const classes = {
  intro: 'From your first class to the competition floor — we have a program for every level, every age, and every goal.',
  scheduleIntro: 'Our schedule runs Monday through Saturday. All classes held at 965 US-550, Suite E, Bernalillo NM.',
  start: "You don't need to get in shape first. You don't need experience, a gi, or a plan. Show up in comfortable clothes and we'll take care of the rest — every black belt on these mats had a first day too.",
  programsIntro: "Whether you're brand new or chasing competition gold — there's a class built for you.",
  kids: [
    'Kids Jiu-Jitsu program is designed to be safe, structured, and engaging, while giving children the freedom to learn and grow at their own pace. Classes emphasize positive coaching, controlled movement, and respect for training partners. Instructors actively guide and supervise students at all times to ensure a supportive and encouraging environment.',
    'Training is structured but fun, using a mix of drills, movement games, and guided partner work to keep kids engaged while learning. We focus on proper movement, balance, and body awareness before progressing to more complex techniques, helping students build confidence without feeling overwhelmed.',
    'Because it emphasizes leverage, balance, and control, children learn how to move their bodies effectively without relying on size or strength. No prior experience is required — just a willingness to learn, move, and have fun in a positive team environment.',
  ],
  physical: ['Strength & overall fitness', 'Coordination', 'Flexibility', 'Balance & body awareness'],
  life: ['Focus & problem-solving', 'Patience & perseverance', 'Confidence & self-control', 'Respect for others'],
  cta: "Call or text to set up your free intro class. We'll handle the rest.",
};
export const classDetails = [
  { name: 'Adult Beginners', label: 'All Levels Welcome', image: 'technique', kind: 'beginners', text: "No experience needed. This class strips Jiu-Jitsu down to its core — fundamental positions, escapes, submissions, and the mindset to keep showing up. The perfect entry point.", focus: 'Core techniques, safety, building mat confidence' },
  { name: 'Adult Gi', label: 'Intermediate · Advanced', image: 'adults', kind: 'gi', text: 'The traditional gi game at an elevated level. Sharpen your technical precision, deepen your positional understanding, and develop the detail-oriented approach that separates good from great.', focus: 'Technical precision, grip fighting, positional control' },
  { name: 'Adult No-Gi', label: 'Intermediate · Advanced', image: 'women', kind: 'nogi', text: 'Fast, dynamic, and athletic. No-Gi develops a different kind of awareness — tighter control, faster transitions, and a game built for speed. Great for competitors and grapplers of all backgrounds.', focus: 'Body locks, leg attacks, wrestling, dynamic movement' },
];
export const openTraining = {
  friday: 'Open mat every Friday at 6pm. Come roll, drill, or just watch. Visitors from any academy are always welcome.',
  saturday: [
    'Our All Levels No-Gi class is exactly what it sounds like, welcoming everyone from first-day beginners to seasoned upper belts. This class focuses on the core concepts, techniques, and strategies of Jiu Jitsu without the use of a traditional gi (kimono).',
    "Whether you're stepping on the mats for the first time or refining your existing skills, you'll find a challenging and supportive training environment designed to help you grow at your own pace.",
  ],
};
export const routes = [
  { path: '/', label: 'Home', title: 'Praxis Jiu Jitsu Academy | Bernalillo, NM', description: home.intro },
  { path: '/about/', label: 'About', title: 'About Our Academy | Praxis Jiu Jitsu', description: 'Black belt founded. Family owned. Community driven. Discover Praxis Jiu Jitsu in Bernalillo, New Mexico.' },
  { path: '/programs/', label: 'Programs', title: 'Jiu Jitsu Programs for Kids & Adults | Praxis', description: 'Explore adult, kids and women’s Jiu Jitsu at Praxis. From your first class to competition prep, find your path.' },
  { path: '/instructors/', label: 'Instructors', title: 'Meet Darien & Nikki Molina | Praxis Instructors', description: 'Meet the coaches at Praxis Jiu Jitsu Academy: Darien Molina and Nikki Molina. Intentional instruction in a welcoming community.' },
  { path: '/praxis-classes/', label: 'Classes', title: 'Weekly Class Schedule | Praxis Jiu Jitsu', description: 'Monday–Saturday Jiu Jitsu classes in Bernalillo. Kids, adult beginners, Gi, No-Gi and open training. Your first class is free.' },
  { path: '/contact/', label: 'Contact', title: 'Contact & Free Trial | Praxis Jiu Jitsu', description: 'Visit Praxis at 965 US Highway 550, Suite E, Bernalillo, NM. Call 505-459-6188 or sign up for a free first class.' },
];
export function normalizePath(path: string) { return path === '/' ? '/' : `${path.replace(/\/$/, '')}/`; }
export function timesFor(name: string) {
  return schedule.flatMap(day => day.sessions.filter(s => s.name === name).map(s => `${day.day} · ${s.time}`)).join(' / ');
}
