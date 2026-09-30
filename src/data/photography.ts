// Each photograph has one placement across the six public pages.
// Source files and visual relevance are documented in docs/photography.md.
export const photography = {
  about: {
    hero: { name: 'academy', alt: 'The mat room at Praxis Jiu Jitsu Academy' },
    mission: { name: 'technique', alt: 'Two adult students practicing a Gi technique at Praxis' },
    community: { name: 'academyGroup', alt: 'Praxis students and coaches gathered for a group photograph' },
  },
  programs: {
    hero: { name: 'praxisGi', alt: 'The Praxis academy patch on the back of a student’s gi' },
    cards: [
      { name: 'adultPractice', alt: 'Adult students practicing a ground position in gis at Praxis' },
      { name: 'kidsCoaching', alt: 'A coach helping a young student during kids class' },
      { name: 'womensPractice', alt: 'A woman practicing arm control with a training partner in Gi class' },
    ],
    newcomer: { name: 'giRack', alt: 'Gis hanging on the academy’s equipment rack' },
    kids: { name: 'kidsDrilling', alt: 'Two young students practicing a ground position in blue and black gis' },
    open: { name: 'academyPractice', alt: 'Students practicing together across the Praxis mat room' },
  },
  classes: {
    hero: { name: 'classInstruction', alt: 'Students gathered on the mats for instruction at Praxis' },
    newcomer: { name: 'fundamentals', alt: 'A white-gi instructor demonstrating a position as students watch' },
    kids: { name: 'kidsPractice', alt: 'Young students practicing on the mats with a coach supervising' },
    open: { name: 'classGathering', alt: 'Adult students seated on the mats during class at Praxis' },
  },
  instructors: {
    hero: { name: 'trainingSpace', alt: 'Praxis academy mats and wall logo, looking toward the front windows' },
  },
  contact: {
    hero: { name: 'entrance', alt: 'The entrance to Praxis Jiu Jitsu Academy with its sign above the door' },
  },
} as const;
export type ProgramPage = 'programs' | 'classes';
