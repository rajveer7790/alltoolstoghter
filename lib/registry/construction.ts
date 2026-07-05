import { ToolDef } from '../types';
const $ = (key: string, label: string, def: number, unit?: string): any =>
  ({ key, label, type: 'number', def, unit, min: 0 });

export const CONSTRUCTION: ToolDef[] = [
{
  slug: 'concrete-calculator', name: 'Concrete Calculator', prio: 'P1', category: 'construction', widget: 'calc',
  short: 'Cubic yards of concrete and number of bags for any slab or footing.',
  metaDescription: 'Calculate concrete needs online for free. Find out exactly how many cubic yards or bags of concrete you need for slabs and footings.',
  keywords: ['concrete calculator','how much concrete do i need','concrete yardage calculator','concrete bags calculator'],
  fields: [$('length','Length (ft)',20),$('width','Width (ft)',10),$('depth','Depth (inches)',4,'in')],
  content: {
    intro: 'Calculate exactly how much concrete you need in cubic yards for ready-mix orders or number of bags for any slab, footing, column, or step.',
    how: 'Volume = length x width x (depth in feet). Convert to cubic yards by dividing by 27. A 60 lb bag covers ~0.45 cu ft; an 80 lb bag ~0.60 cu ft.',
    howSteps: [
      'Enter the length and width of the pour area in feet.',
      'Enter the required depth in inches.',
      'Review the precise calculation of total cubic yards and required bag count.'
    ],
    faqs: [
      ['How do I order ready-mix?','Ready-mix is ordered in cubic yards. Always add 10% to your calculated volume for waste and spillage.'],
      ['Which bag size is better?','For large pours, 80 lb bags are more efficient. For small jobs or hand mixing, 60 lb bags are easier.'],
      ['What is minimum slab thickness?','Typical residential slabs are 4 inches. Driveways need 4-6 inches; footings depend on local frost depth and load.'],
    ],
  },
  related: ['fence-calculator','gravel-calculator','mulch-calculator','flooring-calculator'],
},
{
  slug: 'paint-calculator', name: 'Paint Calculator', prio: 'P1', category: 'construction', widget: 'calc',
  short: 'Gallons of paint needed for a room, with door and window deductions.',
  metaDescription: 'Free Paint Calculator online. Figure out exactly how many gallons of paint you need, accounting for doors, windows, and multiple coats.',
  keywords: ['paint calculator','how much paint do i need','paint coverage calculator','room paint calculator'],
  fields: [$('length','Room length (ft)',15),$('width','Room width (ft)',12),$('height','Ceiling height (ft)',9),$('doors','Number of doors',1),$('windows','Number of windows',2),{key:'coats',label:'Number of coats',type:'number',def:2,min:1,max:4}],
  content: {
    intro: 'Find exactly how many gallons of paint you need for any room, with deductions for doors and windows and support for multiple coats.',
    how: 'Wall area = 2 x (length + width) x height, minus 20 sq ft per door and 15 sq ft per window. Divide by 350 sq ft per gallon, then multiply by coats.',
    howSteps: [
      'Enter the dimensions of your room (length, width, ceiling height).',
      'Input the number of doors and windows to accurately deduct area.',
      'Set the required number of coats to see your exact gallon requirement.'
    ],
    faqs: [
      ['Why does my coverage differ from the label?','Label coverage assumes a smooth primed surface. Rough or unpainted walls absorb more — use 300 sq ft/gal as a conservative estimate.'],
      ['Do I need primer?','For new drywall, very dark colors, or covering stains, yes. Primer is calculated separately and usually needs one coat.'],
      ['How much extra should I buy?','Pick up one extra quart for touch-ups. Seal the lid tightly and store indoors — it lasts years.'],
    ],
  },
  related: ['flooring-calculator','concrete-calculator','square-footage-calculator','mulch-calculator'],
},
{
  slug: 'flooring-calculator', name: 'Flooring Calculator', prio: 'P1', category: 'construction', widget: 'calc',
  short: 'Square feet of flooring with waste allowance and box count.',
  metaDescription: 'Flooring Calculator online. Calculate square footage and exact box counts safely including proper waste allowances for hardwood or tile.',
  keywords: ['flooring calculator','how much flooring do i need','hardwood flooring calculator','tile calculator'],
  fields: [$('length','Room length (ft)',15),$('width','Room width (ft)',12),{key:'waste',label:'Waste allowance',type:'number',def:10,min:5,max:30,unit:'%'},{key:'sqftPerBox',label:'Sq ft per box (0 to skip)',type:'number',def:22,min:0,unit:'sq ft'}],
  content: {
    intro: 'Calculate total flooring needed including a waste allowance for cuts and damaged pieces, plus how many boxes to buy based on the coverage per box.',
    how: 'Flooring needed = room area x (1 + waste%). Divide by box coverage to get box count. Use 10% waste for straight install, 15% for diagonal or herringbone.',
    howSteps: [
      'Enter the room\'s length and width in feet.',
      'Adjust the waste allowance percentage (10% is standard).',
      'Provide the square footage per box to see the total number of boxes required.'
    ],
    faqs: [
      ['Why do I need a waste allowance?','Edge cuts, doorways, and corners all create offcuts. Diagonal patterns waste more because cuts are longer.'],
      ['Should I buy extra for repairs?','Yes — buy 1-2 extra boxes. Dye lots change between production runs, making an exact match difficult later.'],
      ['What flooring needs the most waste?','Diagonal or herringbone patterns need 15%+. Straight plank is 7-10%. Large format tiles are 10-15%.'],
    ],
  },
  related: ['paint-calculator','concrete-calculator','square-footage-calculator','gravel-calculator'],
},
{
  slug: 'gravel-calculator', name: 'Gravel Calculator', prio: 'P1', category: 'construction', widget: 'calc',
  short: 'Cubic yards and tons of gravel for driveways, paths, and landscaping.',
  metaDescription: 'Free Gravel Calculator. Determine exactly how many cubic yards and tons of gravel you need for driveways and landscaping easily.',
  keywords: ['gravel calculator','how much gravel do i need','gravel tonnage calculator','crushed stone calculator'],
  fields: [$('length','Length (ft)',20),$('width','Width (ft)',10),$('depth','Depth (inches)',3,'in')],
  content: {
    intro: 'Calculate gravel needed in cubic yards and approximate tons for driveways, walkways, drainage, and landscaping projects.',
    how: 'Volume (cu yd) = length x width x (depth / 12) / 27. Weight = cubic yards x 1.4 tons, typical for pea gravel or crushed stone.',
    howSteps: [
      'Provide the length and width of the area in feet.',
      'Enter the desired gravel depth in inches.',
      'The tool processes the dimensions to yield total cubic yards and estimated tons.'
    ],
    faqs: [
      ['How deep should a gravel driveway be?','Driveways need 4-6 inches of compacted gravel across base and surface layers. Walkways need 2-3 inches.'],
      ['How heavy is a cubic yard of gravel?','About 1.4 tons (2,800 lbs) for most gravel types. Decomposed granite runs slightly heavier at 1.5 tons/yd3.'],
      ['Is gravel sold by ton or cubic yard?','Both — confirm with your supplier. This calculator gives you both figures.'],
    ],
  },
  related: ['concrete-calculator','mulch-calculator','flooring-calculator','paint-calculator'],
},
{
  slug: 'mulch-calculator', name: 'Mulch Calculator', prio: 'P1', category: 'construction', widget: 'calc',
  short: 'Cubic yards and bags of mulch for garden beds and landscaping.',
  metaDescription: 'Calculate mulch needs online. Discover exact cubic yards or standard bag counts required for your garden landscaping project. Completely free.',
  keywords: ['mulch calculator','how much mulch do i need','mulch yardage calculator','landscape mulch calculator'],
  fields: [$('length','Area length (ft)',20),$('width','Area width (ft)',8),$('depth','Depth (inches)',3,'in')],
  content: {
    intro: 'Calculate how much mulch to order in cubic yards for bulk delivery, or how many 2 cu ft bags to buy at a garden center.',
    how: 'Volume (cu yd) = length x width x (depth / 12) / 27. One cubic yard equals approximately 13.5 bags of 2 cu ft mulch.',
    howSteps: [
      'Enter the length and width of the garden bed.',
      'Define how many inches deep you want the mulch to be.',
      'Read the output for total cubic yards and standard 2-cu-ft bag counts.'
    ],
    faqs: [
      ['How deep should mulch be?','2-4 inches is ideal. Shallower fails to suppress weeds; deeper than 4 inches can prevent water from reaching roots.'],
      ['Bulk vs bags — which is cheaper?','Bulk is far cheaper per cubic yard for quantities over 2 yards. Bags are convenient only for small areas.'],
      ['Should mulch touch plant stems?','No — keep mulch 2-3 inches away from stems and tree trunks to prevent rot and pest damage.'],
    ],
  },
  related: ['gravel-calculator','concrete-calculator','paint-calculator','square-footage-calculator'],
},
{
  slug: 'fence-calculator', name: 'Fence Calculator', prio: 'P2', category: 'construction', widget: 'calc',
  short: 'Posts, rails, and pickets needed for any wood fence.',
  metaDescription: 'Free online Fence Calculator. Estimate exact material counts for posts, rails, and pickets to build any standard wooden fence easily.',
  keywords: ['fence calculator','how much fencing do i need','fence materials calculator','wood fence calculator'],
  fields: [$('perimeter','Total fence length (ft)',120),{key:'spacing',label:'Post spacing (ft)',type:'number',def:8,min:4,max:16},$('height','Fence height (ft)',6),{key:'boardWidth',label:'Board width (inches)',type:'number',def:6,min:2,max:12,unit:'in'}],
  content: {
    intro: 'Estimate posts, rails, and pickets for a wood fence based on your total perimeter, post spacing, and board width.',
    how: 'Posts = perimeter / spacing + 1. Rails = posts x 2 (standard two-rail). Pickets = perimeter / (board width in feet). Add 10% for waste.',
    howSteps: [
      'Enter the total linear feet of fence perimeter.',
      'Set the required post spacing distance.',
      'Input fence height and picket width to calculate full material counts.'
    ],
    faqs: [
      ['What post spacing should I use?','8 feet on center is standard for 6-foot privacy fences. Shorter spans (6 ft) are stronger but use more posts.'],
      ['How deep should fence posts go?','One-third of total post length underground. A 6-foot fence needs 9-foot posts set 3 feet deep.'],
      ['Do I need concrete for posts?','Recommended for gate posts and corners. Regular line posts can be set in compacted gravel for easier future replacement.'],
    ],
  },
  related: ['concrete-calculator','paint-calculator','gravel-calculator','square-footage-calculator'],
},
{
  slug: 'roof-pitch-calculator', name: 'Roof Pitch Calculator', prio: 'P2', category: 'construction', widget: 'calc',
  short: 'Roof pitch in X:12, degrees, and area multiplier from rise and run.',
  metaDescription: 'Roof Pitch Calculator online. Calculate roof angles in degrees and the area multiplier directly from simple rise and run measurements.',
  keywords: ['roof pitch calculator','roof angle calculator','roof pitch to degrees','roofing calculator'],
  fields: [{key:'rise',label:'Rise (inches)',type:'number',def:6,min:0,unit:'in'},{key:'run',label:'Run (inches, typically 12)',type:'number',def:12,min:1},$('planArea','Horizontal plan area (sq ft, optional)',1200)],
  content: {
    intro: 'Calculate roof pitch as X:12, the angle in degrees, and the area multiplier to convert your floor plan area to true sloped roof area for shingle and material estimates.',
    how: 'Pitch = rise:12. Angle = arctan(rise/run) in degrees. Area multiplier = sqrt(1 + (rise/run)^2). Multiply your plan area by this factor for the true roof surface.',
    howSteps: [
      'Measure and enter the vertical rise in inches.',
      'Measure and enter the horizontal run (usually 12 inches).',
      'Provide an optional horizontal plan area to get the true slanted roof surface area.'
    ],
    faqs: [
      ['What pitch is most common?','Residential roofs typically run 4:12 to 9:12, with 6:12 being very common. Low-slope commercial is often 2:12 or less.'],
      ['Why does pitch matter for shingles?','Low-slope roofs need special materials. Standard asphalt shingles require at least a 2:12 pitch.'],
      ['How do I measure existing roof pitch?','Place a level on the roof deck, measure 12 inches horizontally, then measure the vertical rise at that point.'],
    ],
  },
  related: ['concrete-calculator','flooring-calculator','square-footage-calculator','paint-calculator'],
},
{
  slug: 'staircase-calculator', name: 'Staircase Calculator', prio: 'P2', category: 'construction', widget: 'calc',
  short: 'Steps, riser height, and total run for building a staircase.',
  metaDescription: 'Free Staircase Calculator. Find exact step counts, riser heights, and total run for a code-compliant staircase automatically.',
  keywords: ['staircase calculator','stair calculator','how many steps do i need','stair riser calculator'],
  fields: [$('rise','Total rise / floor-to-floor height (inches)',105,'in'),{key:'riserHeight',label:'Target riser height (inches)',type:'number',def:7,min:4,max:9,unit:'in'},{key:'treadDepth',label:'Tread depth (inches)',type:'number',def:11,min:9,max:14,unit:'in'}],
  content: {
    intro: 'Calculate the number of steps, exact riser height, total run, and stair angle for a staircase that meets standard building code proportions.',
    how: 'Steps = round(total rise / target riser). Actual riser = total rise / steps. Total run = steps x tread depth. Ideal angle is 30-45 degrees.',
    howSteps: [
      'Measure and enter the total vertical rise (floor-to-floor).',
      'Provide your desired target riser height (usually ~7 inches).',
      'Enter your desired tread depth to find the exact number of required steps.'
    ],
    faqs: [
      ['What are code-compliant riser dimensions?','Most codes require risers between 4 and 7.75 inches and treads of at least 10 inches. Riser + tread should total roughly 17-18 inches.'],
      ['Why is my actual riser different from my target?','Steps must divide evenly into total rise, so the calculator rounds to the nearest whole step and recalculates exactly.'],
      ['What angle is most comfortable?','30-35 degrees is easy and comfortable. 40-45 degrees is steeper but space-efficient. Above 50 degrees feels ladder-like.'],
    ],
  },
  related: ['staircase-calculator','roof-pitch-calculator','concrete-calculator','flooring-calculator'],
},
];
