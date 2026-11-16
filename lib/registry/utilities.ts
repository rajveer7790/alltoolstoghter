import type { ToolDef } from '../types';
export const UTILITIES: ToolDef[] = [
  {
    "slug": "compress-pdf",
    "name": "Compress PDF — Local Optimization",
    "category": "pdf",
    "widget": "pdfcompress",
    "prio": "P1",
    "short": "Repack PDF objects locally and keep the smaller file without resampling images.",
    "metaDescription": "Repack PDF objects locally and keep the smaller file without resampling images. Read the method and limitations.",
    "keywords": [
      "compress pdf — local optimization",
      "free online",
      "local browser"
    ],
    "related": [
      "merge-pdf",
      "split-pdf"
    ],
    "content": {
      "intro": "Repack PDF objects locally and keep the smaller file without resampling images.",
      "how": "The tool rewrites supported PDFs with compressed object streams, then compares byte sizes. If the output is not smaller, the original file is offered. This does not downsample scans or guarantee a reduction. Rewriting may invalidate signatures; inspect forms, bookmarks and structure.",
      "example": "A PDF already optimized by another exporter may not shrink at all. The tool retains the original bytes rather than reporting false savings.",
      "faqs": [
        [
          "Is this free to use?",
          "Yes. No signup is required."
        ],
        [
          "Does the input leave my device?",
          "The operation runs locally in your browser."
        ],
        [
          "Are there limitations?",
          "The tool rewrites supported PDFs with compressed object streams, then compares byte sizes. If the output is not smaller, the original file is offered. This does not downsample scans or guarantee a reduction. Rewriting may invalidate signatures; inspect forms, bookmarks and structure."
        ]
      ]
    }
  },
  {
    "slug": "heic-to-jpg",
    "name": "HEIC to JPG Converter",
    "category": "image",
    "widget": "heic",
    "prio": "P1",
    "short": "Convert supported HEIC or HEIF images to JPEG locally without uploading files.",
    "metaDescription": "Convert supported HEIC or HEIF images to JPEG locally without uploading files. Read the method and limitations.",
    "keywords": [
      "heic to jpg converter",
      "free online",
      "local browser"
    ],
    "related": [
      "image-converter",
      "image-compressor"
    ],
    "content": {
      "intro": "Convert supported HEIC or HEIF images to JPEG locally without uploading files.",
      "how": "A browser decoder reads supported HEIC/HEIF frames and encodes JPEG at 90% quality. EXIF, HDR, depth and live-photo metadata are not preserved. Unsupported codec variants may fail. JPEG is lossy.",
      "example": "A compatible HEIC photo can produce a JPEG for a site that does not accept HEIC; review color and rotation before sharing.",
      "faqs": [
        [
          "Is this free to use?",
          "Yes. No signup is required."
        ],
        [
          "Does the input leave my device?",
          "The operation runs locally in your browser."
        ],
        [
          "Are there limitations?",
          "A browser decoder reads supported HEIC/HEIF frames and encodes JPEG at 90% quality. EXIF, HDR, depth and live-photo metadata are not preserved. Unsupported codec variants may fail. JPEG is lossy."
        ]
      ]
    }
  },
  {
    "slug": "random-number-generator",
    "name": "Random Number Generator",
    "category": "math",
    "widget": "randomnumber",
    "prio": "P1",
    "short": "Generate a random integer between inclusive bounds using browser cryptographic randomness.",
    "metaDescription": "Generate a random integer between inclusive bounds using browser cryptographic randomness. Read the method and limitations.",
    "keywords": [
      "random number generator",
      "free online",
      "local browser"
    ],
    "related": [
      "coin-flip",
      "random-name-picker"
    ],
    "content": {
      "intro": "Generate a random integer between inclusive bounds using browser cryptographic randomness.",
      "how": "Rejection sampling maps 32-bit cryptographic values uniformly to the selected interval. Bounds must be safe integers and span at most 2³² possible values. This is not a certified gaming or lottery service.",
      "example": "Choosing minimum 1 and maximum 6 gives one of the six possible die faces with equal probability per draw.",
      "faqs": [
        [
          "Is this free to use?",
          "Yes. No signup is required."
        ],
        [
          "Does the input leave my device?",
          "The operation runs locally in your browser."
        ],
        [
          "Are there limitations?",
          "Rejection sampling maps 32-bit cryptographic values uniformly to the selected interval. Bounds must be safe integers and span at most 2³² possible values. This is not a certified gaming or lottery service."
        ]
      ]
    }
  },
  {
    "slug": "coin-flip",
    "name": "Coin Flip",
    "category": "math",
    "widget": "coinflip",
    "prio": "P1",
    "short": "Flip a virtual coin with browser cryptographic randomness.",
    "metaDescription": "Flip a virtual coin with browser cryptographic randomness. Read the method and limitations.",
    "keywords": [
      "coin flip",
      "free online",
      "local browser"
    ],
    "related": [
      "random-number-generator",
      "probability-calculator"
    ],
    "content": {
      "intro": "Flip a virtual coin with browser cryptographic randomness.",
      "how": "An unbiased random integer selects heads or tails. Draws are independent; previous results do not make the next outcome more likely.",
      "example": "After five heads, the probability of heads on the next independent fair flip remains one half.",
      "faqs": [
        [
          "Is this free to use?",
          "Yes. No signup is required."
        ],
        [
          "Does the input leave my device?",
          "The operation runs locally in your browser."
        ],
        [
          "Are there limitations?",
          "An unbiased random integer selects heads or tails. Draws are independent; previous results do not make the next outcome more likely."
        ]
      ]
    }
  },
  {
    "slug": "random-name-picker",
    "name": "Random Name Picker",
    "category": "math",
    "widget": "randomnames",
    "prio": "P1",
    "short": "Pick a random nonempty line from a locally entered list of names.",
    "metaDescription": "Pick a random nonempty line from a locally entered list of names. Read the method and limitations.",
    "keywords": [
      "random name picker",
      "free online",
      "local browser"
    ],
    "related": [
      "random-number-generator",
      "coin-flip"
    ],
    "content": {
      "intro": "Pick a random nonempty line from a locally entered list of names.",
      "how": "Every nonempty trimmed line is one equally likely entry. Duplicate names receive multiple entries. The list remains in the browser; this is not a certified prize-drawing service.",
      "example": "With Alice, Bob and Carol on separate lines, each line has a one-in-three chance.",
      "faqs": [
        [
          "Is this free to use?",
          "Yes. No signup is required."
        ],
        [
          "Does the input leave my device?",
          "The operation runs locally in your browser."
        ],
        [
          "Are there limitations?",
          "Every nonempty trimmed line is one equally likely entry. Duplicate names receive multiple entries. The list remains in the browser; this is not a certified prize-drawing service."
        ]
      ]
    }
  },
  {
    "slug": "typing-speed-test",
    "name": "Typing Speed Test",
    "category": "text",
    "widget": "typing",
    "prio": "P1",
    "short": "Practice typing for up to 60 seconds and see correct WPM and current text accuracy.",
    "metaDescription": "Practice typing for up to 60 seconds and see correct WPM and current text accuracy. Read the method and limitations.",
    "keywords": [
      "typing speed test",
      "free online",
      "local browser"
    ],
    "related": [
      "word-counter",
      "character-counter"
    ],
    "content": {
      "intro": "Practice typing for up to 60 seconds and see correct WPM and current text accuracy.",
      "how": "The timer starts on the first input. Correctly matched characters divided by five and elapsed minutes gives correct WPM. Accuracy compares current text positions, so edits can correct earlier errors. Pasting is disabled for practice.",
      "example": "If 100 characters are correct after 30 seconds, correct WPM is (100/5)/(30/60) = 40.",
      "faqs": [
        [
          "Is this free to use?",
          "Yes. No signup is required."
        ],
        [
          "Does the input leave my device?",
          "The operation runs locally in your browser."
        ],
        [
          "Are there limitations?",
          "The timer starts on the first input. Correctly matched characters divided by five and elapsed minutes gives correct WPM. Accuracy compares current text positions, so edits can correct earlier errors. Pasting is disabled for practice."
        ]
      ]
    }
  }
];
