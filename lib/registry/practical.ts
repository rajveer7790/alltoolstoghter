import type { ToolDef } from '../types';

export const PRACTICAL: ToolDef[] = [
  {
    slug: 'download-time-calculator',
    name: 'Download Time Calculator',
    category: 'developer',
    widget: 'calc',
    prio: 'P1',
    short: 'Estimate how long a file takes to download or upload from its size and transfer speed.',
    metaDescription: 'Estimate download or upload time from file size and measured transfer speed. Convert between GB, GiB, Mbps, and MB/s without uploading a file.',
    keywords: ['download time calculator', 'upload time', 'data transfer time', 'Mbps to MB/s', 'file download estimate'],
    fields: [
      { key: 'size', label: 'File size', type: 'number', def: 5, min: 0.000001, max: 1e6 },
      { key: 'sizeUnit', label: 'File size unit', type: 'select', def: 'GB', options: ['MB', 'GB', 'TB', 'MiB', 'GiB'].map(value => ({ value, label: value })) },
      { key: 'speed', label: 'Transfer speed', type: 'number', def: 100, min: 0.001, max: 1e6 },
      { key: 'speedUnit', label: 'Speed unit', type: 'select', def: 'Mbps', options: [
        { value: 'Mbps', label: 'Mbps (megabits/s)' }, { value: 'Gbps', label: 'Gbps (gigabits/s)' }, { value: 'MB/s', label: 'MB/s (megabytes/s)' },
      ] },
    ],
    content: {
      intro: 'A 5 GB file takes about 6 minutes 40 seconds at a sustained 100 Mbps. Enter your own file size and measured download or upload speed for an estimate.',
      how: 'Transfer time in seconds equals file size in bits divided by transfer speed in bits per second. A byte contains 8 bits, so 100 Mbps equals 12.5 MB/s. GB uses powers of 1,000 and GiB uses powers of 1,024.',
      howSteps: ['Enter the full file size and choose its unit.', 'Enter the sustained speed for the transfer direction you care about.', 'Compare the estimated time and effective megabytes per second.'],
      example: 'A 5 GB download contains 40,000 megabits. At 100 Mbps, 40,000 ÷ 100 = 400 seconds, or 6 minutes 40 seconds.',
      faqs: [
        ['Can I estimate an upload?', 'Yes. Enter measured upload speed rather than download speed. They often differ on the same connection.'],
        ['Why is my actual download slower?', 'Server limits, congestion, protocol overhead, Wi-Fi signal, and other devices can reduce throughput. Enter sustained measured speed for a more useful estimate.'],
        ['What is the difference between GB and GiB?', 'One GB is 1,000,000,000 bytes. One GiB is 1,073,741,824 bytes, so 5 GiB takes longer to transfer than 5 GB at the same speed.'],
      ],
    },
    related: ['data-storage-converter', 'time-duration-calculator', 'ip-subnet-calculator'],
  },
  {
    slug: 'ppi-calculator',
    name: 'Pixel Density (PPI) Calculator',
    category: 'image',
    widget: 'calc',
    prio: 'P2',
    short: 'Calculate screen pixels per inch, pixel pitch, and physical dimensions from resolution and diagonal.',
    metaDescription: 'Calculate screen pixel density in PPI from resolution and diagonal size. Compare display sharpness and find pixel pitch in millimeters.',
    keywords: ['PPI calculator', 'pixel density calculator', 'screen resolution', 'pixels per inch', 'pixel pitch'],
    fields: [
      { key: 'width', label: 'Horizontal resolution', type: 'number', def: 1920, min: 1, max: 1e6, step: 1, unit: 'px' },
      { key: 'height', label: 'Vertical resolution', type: 'number', def: 1080, min: 1, max: 1e6, step: 1, unit: 'px' },
      { key: 'diagonal', label: 'Display diagonal', type: 'number', def: 24, min: 0.001, max: 1e6 },
      { key: 'diagonalUnit', label: 'Diagonal unit', type: 'select', def: 'in', options: [{ value: 'in', label: 'Inches' }, { value: 'cm', label: 'Centimeters' }] },
    ],
    content: {
      intro: 'A 24-inch 1920 × 1080 display has about 91.79 pixels per inch. Compare monitors or small embedded displays using their native resolution and the diagonal of the active screen area.',
      how: 'With square pixels, the pixel diagonal equals the square root of width² + height². Divide it by the physical diagonal in inches for PPI. Pixel pitch in millimeters equals 25.4 divided by PPI.',
      howSteps: ['Enter the native width and height in pixels.', 'Enter the viewable screen diagonal in inches or centimeters.', 'Read PPI, the distance between neighboring pixels, and estimated active screen dimensions.'],
      example: 'A 24-inch 1920 × 1080 display has a diagonal of about 2,202.91 pixels. Divide by 24 to get 91.79 PPI. Pixel pitch is about 0.277 mm.',
      faqs: [
        ['What is the difference between PPI and DPI?', 'PPI measures pixels per inch, typically on a display or image. DPI measures dots per inch, usually for a printer. One image pixel can use multiple printed dots.'],
        ['Does Windows or macOS scaling change PPI?', 'No. Display scaling changes logical size on screen. Physical PPI is set by native pixel count and the active display size.'],
        ['Does a higher PPI always look sharper?', 'A higher PPI can show finer detail, but perceived sharpness also depends on viewing distance, display technology, and the source image.'],
      ],
    },
    related: ['aspect-ratio-calculator', 'image-resizer', 'image-cropper'],
  },
  {
    slug: 'battery-life-calculator',
    name: 'Battery Life Calculator',
    category: 'science',
    widget: 'calc',
    prio: 'P1',
    short: 'Estimate battery runtime in hours and days from capacity in mAh and average current in mA.',
    metaDescription: 'Estimate battery runtime from capacity in mAh, average battery-side current in mA, and usable charge. See the result in hours and days.',
    keywords: ['battery life calculator', 'battery runtime calculator', 'mAh to hours', 'average current draw', 'battery capacity'],
    fields: [
      { key: 'capacity', label: 'Battery capacity', type: 'number', def: 500, min: 0.001, max: 1e8, unit: 'mAh' },
      { key: 'current', label: 'Average battery-side current', type: 'number', def: 2.4, min: 0.000001, max: 1e8, unit: 'mA' },
      { key: 'usablePercent', label: 'Usable capacity', type: 'number', def: 80, min: 0.01, max: 100, unit: '%' },
    ],
    content: {
      intro: 'A 500 mAh battery at 2.4 mA average draw lasts about 167 hours if 80% of its charge is usable. Use measured battery-side current for a practical estimate.',
      how: 'Estimated runtime in hours equals capacity in mAh × usable percentage ÷ 100 ÷ average battery-side current in mA. The result is a charge-budget estimate. Age, temperature, voltage cutoffs, and discharge rate affect usable capacity.',
      howSteps: ['Enter the rated battery capacity in mAh.', 'Enter average current measured at the battery over a representative operating cycle.', 'Adjust the usable capacity percentage to reflect your measured or expected usable charge.'],
      example: 'A 500 mAh battery with 80% usable charge provides 400 mAh. At 2.4 mA average battery-side draw, 400 ÷ 2.4 ≈ 166.67 hours, or 6.94 days.',
      faqs: [
        ['How do I calculate average current for a device that sleeps?', 'Multiply each mode current by the fraction of time spent in that mode, then sum the results. Include wake-up, transmission, and idle periods where relevant.'],
        ['Can I use current measured after a voltage regulator?', 'Use battery-side current. A switching regulator can draw a different current than the load because input voltage, output voltage, and efficiency differ.'],
        ['Does this show whether a battery can handle peak current?', 'No. This calculator estimates runtime from average current. Check peak current and discharge limits separately against the cell and protection specifications.'],
      ],
    },
    related: ['ohms-law-calculator', 'power-converter', 'electricity-bill-calculator'],
  },
];
