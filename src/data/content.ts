export const business = {
  name: 'Praxis Jiu Jitsu Academy', phone: '505-459-6188', tel: 'tel:5054596188', sms: 'sms:5054596188',
  email: 'info@prxsjiujitsu.com', instagram: 'https://www.instagram.com/praxisjjacademy/',
  street: '965 US Highway 550, Suite E', city: 'Bernalillo, NM 87004',
  tagline: 'Black belt founded. Family owned. Community driven.',
  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.2739019583223!2d-106.56645882203387!3d35.324019272704625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872279e87cb9a483%3A0x8b7654313a277bf1!2sPraxis%20Jiu%20Jitsu%20Academy!5e0!3m2!1sen!2sus!4v1773604604790!5m2!1sen!2sus',
  directions: 'https://www.google.com/maps/search/?api=1&query=Praxis+Jiu+Jitsu+Academy+965+US+550+Bernalillo+NM',
};
export const home = {
  headline: 'Jiu Jitsu. All levels.',
  intro: 'Adult and kids Jiu Jitsu in Bernalillo. Learn the fundamentals, develop your technique, and train in Gi, No-Gi, and beginner classes.',
  community: 'Praxis is a family-owned Jiu Jitsu academy for kids and adults, from new students to experienced grapplers. Our classes combine instruction, drills, and partner practice, with an emphasis on technique and respect for your training partners.',
  mission: [
    "Our goal is to teach effective Jiu Jitsu through clear instruction and consistent practice. We focus on fundamental positions, sound technique, and understanding how to apply what you learn.",
    "Beginners develop a foundation in movement and control. Experienced students refine their technique and work through more complex positions. Across every class, we emphasize problem-solving, controlled practice, and steady improvement.",
  ],
  mats: 'The academy uses a professional floating-platform Jiu Jitsu mat system. The platform is designed to absorb impact and reduce stress on the joints, providing a more comfortable surface for drills, takedowns, and live training.',
  programIntro: 'Adult, kids, and women’s programs, with classes for beginners and experienced students.',
  scheduleIntro: 'Monday through Saturday at 965 US-550, Suite E, Bernalillo NM. Your first class is always free.',
  cta: 'Try a free class. No previous experience or membership commitment required.',
};
export const values = [
  { name: 'Respect', text: 'Train with control, follow instruction, and respect your training partners.' },
  { name: 'Consistency', text: 'Build your skills through regular classes, focused drilling, and practice.' },
  { name: 'Community', text: 'A family-owned academy for kids and adults. All experience levels are welcome.' },
];
export const programs = [
  { name: 'Adult BJJ', image: 'adults', alt: 'Two adult students rolling during a Praxis Jiu Jitsu class', text: 'Learn positions, escapes, and submissions through technical instruction and partner practice. Beginner, Gi, and No-Gi classes offer options for new and experienced students.' },
  { name: 'Kids BJJ', image: 'kids', alt: 'Young students drilling takedowns while a coach supervises at Praxis Jiu Jitsu', text: 'Supervised classes for ages 5–12 use drills, movement games, and partner work to teach Jiu Jitsu. Students practice coordination, focus, discipline, and respect for others.' },
  { name: "Women's BJJ", image: 'women', alt: 'Two women training together under the Praxis Jiu Jitsu Academy banner', text: 'Jiu Jitsu and self-defense instruction for women, led by Coach Nikki Molina. Learn grappling techniques, practice with training partners, and develop your skills on the mats.' },
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
  { name: 'Darien Molina', image: 'darien', role: 'Head Coach · Adult Program', bio: 'Darien brings over 10 years of training and competitive experience to the adult program. His instruction emphasizes fundamentals, technical problem-solving, and applying techniques in practice.' },
  { name: 'Nikki Molina', image: 'nikki', role: "Black Belt · Kids & Women's Programs", bio: "Nikki is a black belt with over 10 years of experience across kids, adult, and women's programs. She leads the kids and women's programs with an emphasis on clear instruction, controlled practice, and skill development." },
];
export const classes = {
  intro: 'View the weekly schedule for kids, adult beginners, Gi, No-Gi, and open training. Classes run Monday through Saturday.',
  scheduleIntro: 'Our schedule runs Monday through Saturday. All classes held at 965 US-550, Suite E, Bernalillo NM.',
  start: "No prior experience is required for your first class. Wear comfortable workout clothes; you do not need to own a gi to get started. Book a free intro class or contact us for help choosing a class.",
  programsIntro: "Explore the class formats, experience levels, and training focus below.",
  kids: [
    'Kids Jiu-Jitsu program is designed to be safe, structured, and engaging, while giving children the freedom to learn and grow at their own pace. Classes emphasize positive coaching, controlled movement, and respect for training partners. Instructors actively guide and supervise students at all times to ensure a supportive and encouraging environment.',
    'Training is structured but fun, using a mix of drills, movement games, and guided partner work to keep kids engaged while learning. We focus on proper movement, balance, and body awareness before progressing to more complex techniques, helping students build confidence without feeling overwhelmed.',
    'Because it emphasizes leverage, balance, and control, children learn how to move their bodies effectively without relying on size or strength. No prior experience is required — just a willingness to learn, move, and have fun in a positive team environment.',
  ],
  physical: ['Strength & overall fitness', 'Coordination', 'Flexibility', 'Balance & body awareness'],
  life: ['Focus & problem-solving', 'Patience & perseverance', 'Confidence & self-control', 'Respect for others'],
  cta: "Book online, call, or text to schedule your free intro class.",
};
export const classDetails = [
  { name: 'Adult Beginners', label: 'All Levels Welcome', kind: 'beginners', text: "An introduction to fundamental positions, escapes, and submissions. Learn core techniques and how to practice safely with a partner. No previous Jiu Jitsu experience is required.", focus: 'Core techniques, safety, building mat confidence' },
  { name: 'Adult Gi', label: 'Intermediate · Advanced', kind: 'gi', text: 'Develop your Gi technique through grip fighting, positional control, and detailed instruction. Classes build on the fundamentals with an emphasis on technical precision.', focus: 'Technical precision, grip fighting, positional control' },
  { name: 'Adult No-Gi', label: 'Intermediate · Advanced', kind: 'nogi', text: 'Train without the traditional gi, focusing on body control, wrestling, and transitions. Work on body locks, leg attacks, and movement for No-Gi grappling.', focus: 'Body locks, leg attacks, wrestling, dynamic movement' },
];
export const openTraining = {
  friday: 'Open mat every Friday at 6pm. Come roll, drill, or just watch. Visitors from any academy are always welcome.',
  saturday: [
    'Saturday No-Gi is open to all experience levels, including first-time students. The class covers core concepts, techniques, and strategies without the traditional gi (kimono).',
    "Beginners work on the fundamentals while more experienced students refine their technique. No gi is required.",
  ],
};
export const routes = [
  { path: '/', label: 'Home', title: 'Jiu Jitsu in Bernalillo, NM | Praxis Jiu Jitsu Academy', description: 'Train Jiu Jitsu in Bernalillo at Praxis. Adult, kids, beginner, Gi and No-Gi classes with Darien and Nikki Molina. View the schedule and try your first class.' },
  { path: '/about/', label: 'About', title: 'About Praxis Jiu Jitsu Academy | Bernalillo, New Mexico', description: 'Get to know Praxis, a family-owned Jiu Jitsu academy in Bernalillo. Explore our approach to training, community and floating-platform mats. Try a free class.' },
  { path: '/programs/', label: 'Programs', title: 'Kids & Adult Jiu Jitsu Programs in Bernalillo | Praxis', description: 'Explore adult, kids ages 5–12 and women’s Jiu Jitsu at Praxis in Bernalillo. Find beginner, Gi and No-Gi training options, then request your free first class.' },
  { path: '/instructors/', label: 'Instructors', title: 'Jiu Jitsu Instructors in Bernalillo | Darien & Nikki Molina', description: 'Meet Darien and Nikki Molina at Praxis Jiu Jitsu in Bernalillo. Learn about the coaches leading adult, kids and women’s programs, and try your first class free.' },
  { path: '/praxis-classes/', label: 'Classes', title: 'Jiu Jitsu Class Schedule in Bernalillo, NM | Praxis', description: 'See Monday–Saturday Jiu Jitsu class times at Praxis in Bernalillo. Kids, adult beginners, Gi, No-Gi and open training. Find your class and request a free trial.' },
  { path: '/contact/', label: 'Contact', title: 'Contact Praxis Jiu Jitsu | Free Class in Bernalillo, NM', description: 'Request your free first class at Praxis Jiu Jitsu in Bernalillo. Visit 965 US Highway 550, Suite E, call or text 505-459-6188, or email info@prxsjiujitsu.com.' },
];
export function normalizePath(path: string) { return path === '/' ? '/' : `${path.replace(/\/$/, '')}/`; }
export function timesFor(name: string) {
  return schedule.flatMap(day => day.sessions.filter(s => s.name === name).map(s => `${day.day} · ${s.time}`)).join(' / ');
}
