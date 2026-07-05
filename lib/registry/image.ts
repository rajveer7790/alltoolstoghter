import { ToolDef } from '../types';

export const IMAGE: ToolDef[] = [
{
  slug: 'image-resizer', name: 'Image Resizer', prio: 'P1', category: 'image', widget: 'imageresizer',
  short: 'Resize images by pixels or percentage, keeping aspect ratio.',
  metaDescription: 'Free online image resizer. Resize photos by exact pixel dimensions or percentage while locking the aspect ratio. No uploads, works locally in your browser.',
  keywords: ['image resizer', 'resize image', 'resize photo online', 'change image size', 'scale image'],
  content: {
    intro: 'Resize any image to exact pixel dimensions or by percentage, with an aspect-ratio lock so it never distorts — processed entirely in your browser.',
    how: 'The image is redrawn onto a canvas at your target dimensions using high-quality resampling, then exported as a PNG. Locking the aspect ratio keeps width and height proportional.',
    howSteps: [
      'Upload the image you want to resize.',
      'Enter your target width and height in pixels, or scale by a percentage.',
      'Ensure the aspect ratio lock is enabled to prevent distortion, then download the resized image.'
    ],
    faqs: [
      ['Will resizing reduce the visual quality?', 'Downscaling (making it smaller) looks crisp. Upscaling beyond the original size cannot magically add detail, so it may look soft.'],
      ['Are my personal images uploaded?', 'No. Resizing happens locally on your device\'s processor. Nothing is ever sent to a server.'],
      ['Why does the output always come out as PNG?', 'PNG is lossless, meaning the resizing process itself adds zero compression artifacts. You can use our Image Converter afterward if you need a JPG.']
    ],
  },
  related: ['image-cropper', 'image-compressor', 'image-converter', 'favicon-generator'],
},
{
  slug: 'image-cropper', name: 'Image Cropper', prio: 'P1', category: 'image', widget: 'imagecropper',
  short: 'Crop images with a draggable selection and aspect presets.',
  metaDescription: 'Crop images online for free. Drag, resize, and apply aspect ratio presets (1:1, 16:9) directly in your browser without uploading.',
  keywords: ['image cropper', 'crop image online', 'crop photo', 'crop picture', 'photo cropper'],
  content: {
    intro: 'Crop an image with a draggable, resizable selection box and handy aspect-ratio presets (1:1, 4:3, 16:9, 3:2 or free), exported at full resolution.',
    how: 'You position and size a selection over a preview; the tool maps that selection back to the original image\'s full resolution and exports just that region as a PNG.',
    howSteps: [
      'Select the image you want to crop.',
      'Choose an aspect ratio preset (like 1:1 or 16:9) or leave it freeform.',
      'Drag and resize the cropping box over the desired area, then click "Crop Image" to download.'
    ],
    faqs: [
      ['How do I keep a fixed rectangular shape?', 'Pick an aspect preset like 1:1 (square) or 16:9 from the options, and the selection box will stay locked in that proportion as you resize it.'],
      ['Is the final cropped image full quality?', 'Yes. The on-screen preview is scaled down to fit your monitor, but the actual crop math is applied to your original full-resolution file.'],
      ['Can I use this to crop a profile picture?', 'Absolutely. Just use the 1:1 preset to get a perfect square avatar ready for social media.']
    ],
  },
  related: ['image-resizer', 'image-converter', 'image-rotator', 'favicon-generator'],
},
{
  slug: 'image-compressor', name: 'Image Compressor', prio: 'P1', category: 'image', widget: 'imagecompressor',
  short: 'Shrink image file size with a live quality preview.',
  metaDescription: 'Compress images online to shrink file sizes by up to 80%. Free, private image compressor with live size previews for JPG and WebP.',
  keywords: ['image compressor', 'compress image', 'reduce image size', 'compress jpeg', 'shrink image'],
  content: {
    intro: 'Reduce an image\'s file size by re-encoding it at a chosen quality, with a live readout of how much smaller it gets — ideal for faster-loading web pages.',
    how: 'The image is re-encoded as JPG or WebP at your selected quality. Lower quality discards more detail for a smaller file; the tool shows the exact size saving versus the original.',
    howSteps: [
      'Upload the image you need to compress.',
      'Adjust the quality slider and select your desired output format (JPG or WebP).',
      'Check the live file size reduction readout, then click download.'
    ],
    faqs: [
      ['Should I choose JPG or WebP for compression?', 'WebP usually produces significantly smaller files at the exact same visual quality. However, JPG still has the absolute widest compatibility across older devices.'],
      ['How much can I realistically compress an image?', 'You can often achieve 50–80% smaller files with very little visible loss if you set the quality to 70–80%. Push it even lower for tiny thumbnails.'],
      ['Does it compress the image locally?', 'Yes. The encoding engine runs entirely inside your browser memory; your image is never uploaded to any cloud server.']
    ],
  },
  related: ['image-to-base64', 'image-converter', 'image-resizer', 'png-to-jpg'],
},
{
  slug: 'image-converter', name: 'Image Converter', prio: 'P1', category: 'image', widget: 'imageconverter',
  short: 'Convert images between PNG, JPG, and WebP.',
  metaDescription: 'Convert images between PNG, JPG, and WebP formats instantly. A 100% free and private browser-based image converter tool.',
  keywords: ['image converter', 'convert image format', 'change image format online', 'png to jpg converter'],
  content: {
    intro: 'Convert images freely between PNG, JPG, and WebP, with a quality control for the lossy formats — all done locally in your browser.',
    how: 'The image is decoded and re-drawn onto a canvas, then exported in your chosen format. Converting to JPG flattens transparency onto a white background, since JPG has no alpha channel.',
    howSteps: [
      'Choose the image file you want to convert.',
      'Select your desired output format (PNG, JPG, or WebP) and adjust the quality if applicable.',
      'Click convert to process and download the newly formatted file instantly.'
    ],
    faqs: [
      ['Which image format should I choose?', 'Use PNG for transparency and graphics, JPG for standard photos and broad software support, and WebP for the smallest modern file sizes.'],
      ['What happens to transparency when converting to JPG?', 'JPG mathematically cannot store transparency. Any transparent areas in your PNG will automatically become solid white.'],
      ['Is there a maximum file size limit?', 'The only limit is your device\'s available RAM. Most modern smartphones and laptops can convert massive images instantly.']
    ],
  },
  related: ['png-to-jpg', 'jpg-to-png', 'webp-to-png', 'png-to-webp'],
},
{
  slug: 'png-to-jpg', name: 'PNG to JPG', prio: 'P1', category: 'image', widget: 'imageconverter', dataset: 'jpeg',
  short: 'Convert PNG images to JPG, with quality control.',
  metaDescription: 'Convert PNG to JPG online for free. Reduce file size instantly while maintaining quality. Fast, private, and runs locally in your browser.',
  keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'png to jpg converter'],
  content: {
    intro: 'Convert PNG images to JPG to get much smaller files for photos and web use, with an adjustable quality setting — entirely in your browser.',
    how: 'The PNG is redrawn onto a white background (JPG has no transparency) and exported as a JPG at your chosen quality.',
    howSteps: [
      'Upload the PNG file you wish to convert.',
      'Adjust the JPG quality slider to balance file size against visual clarity.',
      'Click the download button to instantly save your new JPG image.'
    ],
    faqs: [
      ['Why should I convert PNG to JPG?', 'For photographic or complex images, JPG files are vastly smaller than PNG files while maintaining nearly identical visual quality.'],
      ['What happens to the transparent areas?', 'Because JPG does not support alpha channels (transparency), all transparent pixels will be automatically flattened onto a solid white background.'],
      ['Will I lose image quality?', 'JPG is a lossy format, so technically yes. However, at 85–90% quality settings, the difference is virtually invisible while the file shrinks dramatically.']
    ],
  },
  related: ['jpg-to-png', 'image-converter', 'image-compressor', 'webp-to-png'],
},
{
  slug: 'jpg-to-png', name: 'JPG to PNG', prio: 'P1', category: 'image', widget: 'imageconverter', dataset: 'png',
  short: 'Convert JPG images to lossless PNG.',
  metaDescription: 'Convert JPG to PNG online losslessly. Free and private image converter that processes files locally without server uploads.',
  keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'jpg to png converter'],
  content: {
    intro: 'Convert JPG images to PNG for lossless quality and editing — useful when you need a format that supports transparency or avoids further compression.',
    how: 'The JPG is decoded and re-exported as a lossless PNG. Note that PNG can\'t recover detail already lost to JPG compression, but it prevents any further quality loss.',
    howSteps: [
      'Select the JPG file from your device.',
      'The tool immediately decodes the JPG matrix into raw pixels.',
      'Click to export and download the image inside a lossless PNG container.'
    ],
    faqs: [
      ['Does converting to PNG magically improve quality?', 'No. It preserves the current state losslessly, but it cannot algorithmically restore detail that the JPG compression originally discarded.'],
      ['Why convert JPG to PNG in the first place?', 'It is useful if you plan to edit the image multiple times (to avoid compounding compression artifacts) or if a specific software tool requires a PNG file.'],
      ['Will the resulting file get bigger?', 'Usually, yes. Because PNG is a lossless format, complex photographic images will become significantly larger in bytes than their JPG originals.']
    ],
  },
  related: ['png-to-jpg', 'image-converter', 'png-to-webp', 'image-resizer'],
},
{
  slug: 'webp-to-png', name: 'WebP to PNG', prio: 'P1', category: 'image', widget: 'imageconverter', dataset: 'png',
  short: 'Convert modern WebP images to PNG.',
  metaDescription: 'Convert WebP to PNG online. Ensure image compatibility with older software by safely converting WebP files to PNG instantly.',
  keywords: ['webp to png', 'convert webp to png', 'webp converter', 'webp to png converter'],
  content: {
    intro: 'Convert WebP images to PNG for compatibility with software that doesn\'t yet support the WebP format, keeping full lossless quality.',
    how: 'The WebP is decoded by your browser and re-exported as a lossless PNG, preserving transparency.',
    howSteps: [
      'Upload the WebP image you need to convert.',
      'Wait a millisecond for the browser to decode the WebP compression.',
      'Download the universally supported PNG file.'
    ],
    faqs: [
      ['Why convert WebP to PNG?', 'While WebP is great for web browsers, many older desktop applications and image editors still cannot open WebP files. PNG is universally supported everywhere.'],
      ['Is transparency kept during the conversion?', 'Yes. Both WebP and PNG fully support alpha channel transparency, so your transparent backgrounds are perfectly preserved.'],
      ['Does it work completely offline?', 'Yes. Once the webpage has initially loaded, the entire conversion engine runs locally via Javascript without pinging a server.']
    ],
  },
  related: ['png-to-webp', 'image-converter', 'png-to-jpg', 'jpg-to-png'],
},
{
  slug: 'png-to-webp', name: 'PNG to WebP', prio: 'P2', category: 'image', widget: 'imageconverter', dataset: 'webp',
  short: 'Convert PNG to smaller WebP images.',
  metaDescription: 'Convert PNG to WebP to drastically reduce file sizes while maintaining transparency. Free, fast, and private online converter.',
  keywords: ['png to webp', 'convert png to webp', 'webp converter', 'png to webp online'],
  content: {
    intro: 'Convert PNG images to WebP to dramatically cut file size while keeping transparency — the modern format for fast-loading websites.',
    how: 'The PNG is re-encoded as WebP at your chosen quality. WebP typically produces much smaller files than PNG for the same image, with optional transparency.',
    howSteps: [
      'Select the PNG file you wish to optimize.',
      'Adjust the WebP quality slider to your desired balance of size vs clarity.',
      'Click download to save the highly-compressed WebP file.'
    ],
    faqs: [
      ['Exactly how much smaller is WebP compared to PNG?', 'WebP is often 25–50% smaller than an equivalent PNG at comparable quality, which massively speeds up website page load times.'],
      ['Do all web browsers support WebP?', 'Yes, all modern web browsers support it. However, if you are targeting extremely old systems, you may want to keep a PNG fallback.'],
      ['Is transparency preserved in the new file?', 'Yes. WebP fully supports an alpha channel just like PNG, so edges remain transparent.']
    ],
  },
  related: ['webp-to-png', 'image-converter', 'image-compressor', 'png-to-jpg'],
},
{
  slug: 'image-rotator', name: 'Image Rotator & Flipper', prio: 'P2', category: 'image', widget: 'imagerotator',
  short: 'Rotate and flip images with a live preview.',
  metaDescription: 'Rotate and flip images online instantly. Mirror photos horizontally or vertically securely in your browser with zero server uploads.',
  keywords: ['image rotator', 'rotate image online', 'flip image', 'mirror image', 'turn photo'],
  content: {
    intro: 'Rotate an image left or right in 90° steps and flip it horizontally or vertically, with a live preview, then download the result.',
    how: 'Each rotation and flip is applied on a canvas using transforms, so the preview updates instantly and the export matches exactly what you see.',
    howSteps: [
      'Upload the image you want to rotate or mirror.',
      'Use the buttons to rotate in 90-degree increments or flip horizontally/vertically.',
      'Preview the changes live, then click download to save the corrected image.'
    ],
    faqs: [
      ['Can I rotate by a custom freeform angle?', 'This specific tool rotates exactly in 90° steps, which keeps edges perfectly crisp and avoids empty canvas corners.'],
      ['What is the exact difference between flip and rotate?', 'Rotating turns the entire image around its central axis. Flipping acts like a mirror, reflecting the image horizontally (left-to-right) or vertically (upside-down).'],
      ['Is image quality affected by this process?', 'No. 90° rotations and flips are considered lossless pixel rearrangements.']
    ],
  },
  related: ['image-cropper', 'image-resizer', 'image-converter', 'image-watermark'],
},
{
  slug: 'image-color-picker', name: 'Image Color Picker', prio: 'P2', category: 'image', widget: 'imagecolorpicker',
  short: 'Pick exact colors from any image as HEX, RGB, HSL.',
  metaDescription: 'Pick exact colors from any image online. Free eyedropper tool to extract HEX, RGB, and HSL codes directly from photos in your browser.',
  keywords: ['image color picker', 'color picker from image', 'get color from image', 'eyedropper online', 'hex color picker'],
  content: {
    intro: 'Click anywhere on an image to read the exact pixel color in HEX, RGB, and HSL, with a history of your recently picked colors — a browser-based eyedropper.',
    how: 'The image is drawn to a canvas; clicking reads the precise pixel value at that point and converts it into the common color formats, which you can copy with a tap.',
    howSteps: [
      'Upload an image to the canvas workspace.',
      'Click anywhere on the image to sample the exact pixel color under your cursor.',
      'Click on the HEX, RGB, or HSL readouts in your history swatch to instantly copy the code.'
    ],
    faqs: [
      ['What color code formats do I get?', 'You get HEX (used for CSS and design tools), RGB (standard programmatic code), and HSL (ideal for tweaking hue, saturation, and lightness).'],
      ['Can I pick several colors in a row?', 'Yes. Every click is saved to a persistent swatch history so you can collect an entire set of colors without losing previous ones.'],
      ['Is the image uploaded to analyze it?', 'No. The image is drawn directly onto a local HTML5 canvas, meaning the analysis happens instantly on your machine.']
    ],
  },
  related: ['image-color-palette', 'image-converter', 'image-cropper', 'color-converter'],
},
{
  slug: 'image-color-palette', name: 'Image Color Palette Extractor', prio: 'P2', category: 'image', widget: 'paletteextractor',
  short: 'Extract the dominant colors from any image.',
  metaDescription: 'Extract the dominant color palette from any image online. Automatically generate harmonious HEX swatches for branding and design work.',
  keywords: ['image color palette', 'extract colors from image', 'color palette from image', 'dominant colors', 'image to palette'],
  content: {
    intro: 'Extract a palette of the dominant colors from any image — great for building a brand palette, theming a design, or matching a photo.',
    how: 'The tool samples the image\'s pixels, groups similar colors into buckets, and ranks them by how often they appear, returning the most prominent colors as copyable swatches.',
    howSteps: [
      'Upload an inspiration photo or branding image.',
      'Adjust the color count slider to determine how many swatches you want in the palette.',
      'Click any generated swatch to instantly copy its HEX code to your clipboard.'
    ],
    faqs: [
      ['How many colors can I extract at once?', 'You can extract anywhere between 3 and 10 dominant colors. Use the slider to dictate how granular the palette should be.'],
      ['How exactly are the colors chosen?', 'Pixels are grouped by mathematical similarity into buckets and ranked by frequency, ensuring that the visual "mood" of the image surfaces first.'],
      ['Are the results always accurate?', 'Yes, the algorithm accurately reflects the mathematical density of colors, though very vibrant tiny details might be overshadowed by large background areas.']
    ],
  },
  related: ['image-color-picker', 'color-palette-generator', 'color-converter', 'css-gradient-generator'],
},
{
  slug: 'image-watermark', name: 'Add Watermark to Image', prio: 'P2', category: 'image', widget: 'imagewatermark',
  short: 'Add a text watermark to an image with live preview.',
  metaDescription: 'Add text watermarks to images online for free. Protect photos with copyright text securely in your browser with zero uploads.',
  keywords: ['add watermark to image', 'image watermark', 'watermark photo', 'photo watermark', 'stamp image'],
  content: {
    intro: 'Add a text watermark to an image — your name, brand, or a copyright notice — with control over position, color, size, and opacity, previewed live before you download.',
    how: 'Your text is drawn onto the image on a canvas at the chosen position and styling, with a subtle shadow for legibility, and exported as a PNG.',
    howSteps: [
      'Upload the photo you want to protect.',
      'Type your watermark text and adjust its opacity, font size, and position on the grid.',
      'Review the live preview, then download the permanently stamped image.'
    ],
    faqs: [
      ['Can I protect professional photos with this tool?', 'Yes. A visible watermark deters casual theft and reuse, though it is not a complete substitute for legal licensing or invisible forensic marks.'],
      ['Where exactly can the watermark go?', 'You can snap it to six positions: any of the four corners, the top/bottom center, or dead center in the middle.'],
      ['Is my unwatermarked photo uploaded to your servers?', 'No. The entire stamping process is executed via a local canvas element in your browser memory.']
    ],
  },
  related: ['image-rotator', 'image-resizer', 'image-converter', 'watermark-pdf'],
},
{
  slug: 'favicon-generator', name: 'Favicon Generator', prio: 'P1', category: 'image', widget: 'favicongenerator',
  short: 'Generate favicon sizes + Apple touch icon from one image.',
  metaDescription: 'Generate favicons and Apple touch icons from a single image. Instantly download a zip file with all standard sizes and HTML snippets.',
  keywords: ['favicon generator', 'create favicon', 'favicon from image', 'apple touch icon', 'favicon ico'],
  content: {
    intro: 'Turn one image into a complete favicon set — 16, 32, 48, 64, 192, and 512px icons plus an Apple touch icon — bundled in a zip with the exact HTML to drop into your site.',
    how: 'Your image is rendered to each required size on a canvas with high-quality scaling, packaged into a downloadable zip, and accompanied by the standard <link> tags to paste into your page head.',
    howSteps: [
      'Upload a high-resolution, preferably square image (e.g., your logo).',
      'The tool immediately renders the image across 7 standard web sizes.',
      'Download the .zip file containing all the icons and copy the provided HTML snippet.'
    ],
    faqs: [
      ['What size source image is best for a favicon?', 'A perfect square image of at least 512×512 pixels guarantees the absolute sharpest results across all downscaled sizes.'],
      ['What exactly is the Apple touch icon?', 'It is a specific 180×180 pixel icon that iOS devices look for when a user decides to save your website to their home screen.'],
      ['What happens if my source image is rectangular, not square?', 'The generator will mathematically center your image on the square canvases. It works, but it will leave empty padding space.']
    ],
  },
  related: ['image-resizer', 'image-converter', 'qr-code-generator', 'image-cropper'],
},
{
  slug: 'image-to-base64', name: 'Image to Base64', prio: 'P2', category: 'image', widget: 'imagetobase64',
  short: 'Encode an image as a Base64 data URI for inline use.',
  metaDescription: 'Convert images to Base64 data URIs online. Generate HTML <img> tags and CSS backgrounds instantly without server uploads.',
  keywords: ['image to base64', 'base64 image encoder', 'image to data uri', 'base64 image', 'base64 encode image'],
  content: {
    intro: 'Encode an image into a Base64 data URI you can paste directly into HTML or CSS, removing a separate network request — with ready-made <img> and CSS background snippets.',
    how: 'The image bytes are read and encoded as a Base64 data URI. The tool also wraps it into copy-ready HTML and CSS, and warns that Base64 is about 33% larger than the binary file.',
    howSteps: [
      'Select a small image or icon from your device.',
      'The browser instantly reads the bytes and converts them into a Base64 string.',
      'Copy the raw string, or grab the pre-formatted HTML/CSS snippets for immediate use.'
    ],
    faqs: [
      ['When should I actually inline an image as Base64?', 'It is best practice for extremely small images like UI icons (under ~10 KB). Inlining saves an HTTP request, but larger images bloat your HTML.'],
      ['Why is the resulting Base64 string bigger than my original file?', 'The Base64 encoding algorithm inherently adds exactly 33% overhead. You are trading a network request for a slightly larger byte payload.'],
      ['Is my image uploaded during encoding?', 'No. The conversion executes entirely via Javascript local FileReader APIs.']
    ],
  },
  related: ['image-converter', 'base64-encode-decode', 'image-compressor', 'image-resizer'],
},
{
  slug: 'color-blindness-simulator', name: 'Color Blindness Simulator', prio: 'P1', category: 'image', widget: 'colorblindness',
  short: 'See how your image looks to people with 8 types of color vision deficiency.',
  metaDescription: 'Simulate color blindness online. Test your images and designs against 8 types of color vision deficiencies to ensure accessibility.',
  keywords: ['color blindness simulator','colorblind simulator','color vision deficiency test','deuteranopia simulator','accessibility color checker'],
  content: {
    intro: 'Upload an image and instantly see how it appears to people with eight different types of color vision deficiency — an essential accessibility check for designers, developers, and content creators.',
    how: 'Each deficiency type applies a scientifically derived color transformation matrix to every pixel, approximating how someone with that condition perceives the image. Everything runs locally on your device.',
    howSteps: [
      'Upload a screenshot of your app, website, or design.',
      'The engine immediately processes the image against 8 different color blindness matrices.',
      'Review the results to identify charts, buttons, or text that lose contrast.'
    ],
    faqs: [
      ['How common is color blindness in the real world?', 'Approximately 8% of men and 0.5% of women have some form of it. Deuteranomaly (weak green) is the most widespread, affecting roughly 5% of men.'],
      ['Why is it vital to test my designs?', 'UX elements like charts, maps, status indicators (red=bad, green=good) that rely entirely on color can become unreadable. Testing ensures you use patterns or labels instead.'],
      ['How scientifically accurate is the simulation?', 'It uses standard Brettel/Viénot-based approximation matrices widely accepted in professional accessibility tools, providing a highly accurate guide.']
    ],
  },
  related: ['image-color-picker', 'color-palette-generator', 'image-converter', 'css-specificity-calculator'],
},
];
