# Praxis photography inventory

Reviewed September 30, 2026. There is enough supplied photography for **26 distinct photo placements across the six public pages**, in addition to the homepage video/poster. Original files remain untouched in `Assets/PRAXIS`; only optimized responsive WebP derivatives are published.

The source folder contains duplicate exports and alternate resolutions of the same photographs. These were compared visually, not counted as separate subjects. In particular the alternate DSC00378, DSC00444, DSC00465 and owners exports are duplicates. The social preview uses the separate `praxisGroup-scaled.jpg` group photograph.

## Page placements

Paths below are relative to `Assets/PRAXIS`. `iCloud/` abbreviates `iCloud Photos from Praxis Jiu Jitsu Academy LLC/`.

| Page / section | Asset key | Original | Relevance |
|---|---|---|---|
| Home / academy | community | DSC00453-scaled.jpg | Adult students rolling across the mat room |
| Home / mission | mission | DSC00397-scaled.jpg | Nikki helping a young student |
| Home / adults | adults | DSC00444-scaled.jpg | Adult Gi partner practice |
| Home / kids | kids | DSC00378-scaled.jpg | Coached kids takedown practice |
| Home / women | women | DSC00465-scaled.jpg | Women training together |
| Home / coaches | owners | Praxis-owners-2.webp | Joint Darien and Nikki portrait, alongside both biographies |
| About / hero | academy | Praxis_Jiu_Jitsu_Academy_interior-18.jpg | Academy mat room |
| About / mission | technique | DSC00243 (1).jpg | Adult Gi technique practice |
| About / community | academyGroup | iCloud/IMG_1317.jpg | Students and coaches together |
| About / mat system | platform | Praxis_Jiu_Jitsu_Academy_interior-21.jpg | Wide view showing mat platform and edge |
| Programs / hero | praxisGi | DSC09667.jpg | Praxis patch on a student’s gi |
| Programs / adults | adultPractice | DSC09658.jpg | Adult Gi ground-position practice |
| Programs / kids | kidsCoaching | DSC00407-scaled.jpg | Individual coaching for a young student |
| Programs / women | womensPractice | DSC00280 (1).jpg | Woman practicing arm control with a partner |
| Programs / newcomer | giRack | Praxis_Jiu_Jitsu_Academy_interior-8.jpg | Academy equipment; no claim of loaner availability |
| Programs / kids details | kidsDrilling | iCloud/IMG_1488.jpg | Two young students drilling on the ground |
| Programs / open training | academyPractice | iCloud/IMG_7937.jpg | Practice across the academy mats |
| Instructors / hero | beltPresentation | iCloud/IMG_8026.jpg | Coaches and a student at a belt presentation; third person not labeled as staff |
| Instructors / Darien | darien | DSC06098-scaled.webp | Individual coach portrait |
| Instructors / Nikki | nikki | DSC06066-scaled.webp | Individual coach portrait |
| Classes / hero | classInstruction | iCloud/praxisjul26b.jpg | Class gathered for instruction |
| Classes / newcomer | fundamentals | iCloud/IMG_1552.jpg | Instructor demonstrating as students watch |
| Classes / kids details | kidsPractice | iCloud/IMG_1407.jpg | Supervised kids mat practice |
| Classes / open training | classGathering | iCloud/IMG_1323.jpg | Adult students in class |
| Contact / hero | entrance | Praxis_Jiu_Jitsu_Academy_interior-16.jpg | Actual exterior entrance despite original filename |
| Contact / location | visitorSeating | Praxis_Jiu_Jitsu_Academy_interior-12.jpg | Seating beside the entrance windows and mat area |

## Relevance decisions

- No clearly identifiable adult No-Gi action photograph was found in the reviewed assets. Removed Gi photographs from the No-Gi and Saturday No-Gi descriptions. Detailed adult class formats now use consistent text cards; Saturday uses a branded No-Gi typographic panel.
- Open-training images depict general academy activity. Their alt text does not claim that the photos were taken during a Friday session.
- Shared content remains centralized, while Programs and Classes use separate photography selections in `src/data/photography.ts`.
- The supplied logo remains consistent in shared navigation/footer. The homepage video/poster is intentionally also available in the separate design-review page.
- `npm run check` verifies that each photo source is used only once across all six public routes and that all referenced assets exist. Visual review checks subject relevance and crop, which file-identity checks alone cannot establish.
