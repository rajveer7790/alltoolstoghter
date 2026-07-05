import { ToolDef } from '../types';

export const PDF: ToolDef[] = [
{
  slug: 'merge-pdf', name: 'Merge PDF', prio: 'P1', category: 'pdf', widget: 'pdfmerge',
  short: 'Combine several PDF files into one, in any order.',
  metaDescription: 'Merge PDF files online for free. Combine multiple PDFs into a single document instantly and securely directly in your browser. No server uploads required.',
  keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'pdf merger', 'free pdf merger'],
  content: {
    intro: 'Combine multiple PDF files into a single document, with full control over their order — all processed privately in your browser, with nothing uploaded to a server.',
    how: 'The tool copies every page from each file you add, in the order you arrange them, into one new PDF. Use the arrows to reorder files before merging.',
    howSteps: [
      'Select or drag and drop the PDF files you want to merge into the tool.',
      'Use the up and down arrows to arrange the files in your desired order.',
      'Click "Merge PDF" to securely generate and preview your combined document instantly.'
    ],
    faqs: [
      ['Are my files uploaded anywhere?', 'No. Merging happens entirely in your web browser using your local device resources. The files never leave your computer, ensuring total privacy.'],
      ['Is there a file size or count limit?', 'The practical limit depends entirely on your device memory. Very large files (hundreds of MB) may be slightly slower but typically process without issues.'],
      ['Can I reorder the files before combining them?', 'Yes. Once you add files, you can use the up and down arrows to perfectly sequence them before merging.']
    ],
  },
  related: ['markdown-to-pdf', 'split-pdf', 'reorder-pdf-pages', 'delete-pdf-pages'],
},
{
  slug: 'split-pdf', name: 'Split PDF', prio: 'P1', category: 'pdf', widget: 'pdfsplit',
  short: 'Split a PDF into separate files by page ranges.',
  metaDescription: 'Split PDF files online for free. Extract specific page ranges or split every page into a separate document instantly. 100% private and runs in your browser.',
  keywords: ['split pdf', 'pdf splitter', 'separate pdf pages', 'extract pdf pages', 'divide pdf'],
  content: {
    intro: 'Split one PDF into several smaller files — either by custom page ranges or one file per page — entirely in your browser.',
    how: 'Enter page ranges like 1-3, 5, 8-10 and each becomes its own downloaded PDF, or choose to split every page into a separate file. Pages are copied losslessly.',
    howSteps: [
      'Upload the PDF file you want to split.',
      'Choose to split by specific page ranges (e.g., 1-3, 5) or separate every single page.',
      'Click "Split PDF" to instantly process and download your separated files.'
    ],
    faqs: [
      ['How do I specify page ranges to split?', 'Use commas and hyphens in the input field. For example, typing "1-3, 5, 8-10" will extract those pages and create three separate PDF files.'],
      ['Will the document quality drop after splitting?', 'No. Pages are copied exactly bit-for-bit from the original document with no re-rendering or compression applied.'],
      ['Why do several files download at once?', 'Each page range you specify becomes a separate file. Your browser may ask for permission to download multiple files simultaneously.']
    ],
  },
  related: ['merge-pdf', 'extract-pdf-pages', 'delete-pdf-pages', 'reorder-pdf-pages'],
},
{
  slug: 'extract-pdf-pages', name: 'Extract PDF Pages', prio: 'P2', category: 'pdf', widget: 'pdfextract',
  short: 'Pull selected pages into a new PDF.',
  metaDescription: 'Extract specific pages from a PDF to create a new document. Free, secure, and private PDF page extractor that runs entirely in your web browser.',
  keywords: ['extract pdf pages', 'pdf page extractor', 'save pdf pages', 'pull pages from pdf'],
  content: {
    intro: 'Pick specific pages from a PDF and save just those into a new document, keeping the order you list them in.',
    how: 'List the pages to keep (for example 1, 3-4) and the tool builds a fresh PDF containing only those, copied exactly from the original.',
    howSteps: [
      'Drag and drop the PDF you want to extract pages from.',
      'Enter the specific page numbers or ranges you want to keep (e.g., "1, 3-4").',
      'Click "Extract into new PDF" to generate and preview your custom document.'
    ],
    faqs: [
      ['How is this different from splitting a PDF?', 'Extracting builds one single new PDF combining the specific pages you choose. Splitting produces multiple separate files based on your ranges.'],
      ['Does extracting pages change the original file?', 'No. Your original file remains completely untouched. A brand new PDF is created for download.'],
      ['Can I reorder pages while extracting?', 'Yes. The new PDF will place the pages in the exact order you list them in the text field.']
    ],
  },
  related: ['split-pdf', 'delete-pdf-pages', 'merge-pdf', 'reorder-pdf-pages'],
},
{
  slug: 'delete-pdf-pages', name: 'Delete PDF Pages', prio: 'P2', category: 'pdf', widget: 'pdfdelete',
  short: 'Remove unwanted pages from a PDF.',
  metaDescription: 'Remove unwanted pages from your PDF files online. Free, fast, and completely private PDF page remover tool. No uploads or installations required.',
  keywords: ['delete pdf pages', 'remove pages from pdf', 'pdf page remover', 'delete pages pdf'],
  content: {
    intro: 'Remove specific pages from a PDF and download the trimmed document, with the remaining pages keeping their original order.',
    how: 'List the pages to delete (for example 2, 5-6). The tool removes them and saves a new PDF with everything else intact.',
    howSteps: [
      'Upload the PDF you want to edit.',
      'Type the page numbers or ranges you wish to remove (e.g., "2, 5-6").',
      'Click "Delete pages" to instantly preview and download the trimmed document.'
    ],
    faqs: [
      ['Can I delete every page in the document?', 'No, a PDF must contain at least one page. The tool will prevent you from emptying the document completely.'],
      ['Are the remaining pages affected or compressed?', 'No. The remaining pages keep their original content, order, and high resolution quality.'],
      ['Is my confidential file uploaded to a server?', 'No. All editing happens locally inside your web browser. Your data remains completely private.']
    ],
  },
  related: ['extract-pdf-pages', 'split-pdf', 'reorder-pdf-pages', 'merge-pdf'],
},
{
  slug: 'reorder-pdf-pages', name: 'Reorder PDF Pages', prio: 'P3', category: 'pdf', widget: 'pdfreorder',
  short: 'Rearrange the page order of a PDF.',
  metaDescription: 'Reorder and rearrange pages in a PDF file easily. Free online tool to drag, drop, and reorganize PDF pages securely in your web browser.',
  keywords: ['reorder pdf pages', 'rearrange pdf', 'organize pdf pages', 'change pdf page order'],
  content: {
    intro: 'Change the order of pages in a PDF by moving them up or down, then save the rearranged document — all in your browser.',
    how: 'After loading your PDF, each page appears in a list. Use the arrows to move pages into the order you want, then save a new PDF built in that sequence.',
    howSteps: [
      'Choose the PDF you want to reorganize.',
      'Use the up and down arrows on each list item to move pages into your desired sequence.',
      'Click "Save reordered PDF" to securely generate the new document.'
    ],
    faqs: [
      ['Does reordering the pages reduce the PDF quality?', 'No. The pages are copied exactly into their new order with absolutely zero loss in quality.'],
      ['Can I handle large documents with hundreds of pages?', 'Yes, though very long PDFs will make the list longer to scroll. Performance will depend on your device\'s processor.'],
      ['Is the original file permanently modified?', 'No. A new reordered PDF is created and downloaded, leaving your original file exactly as it was.']
    ],
  },
  related: ['merge-pdf', 'delete-pdf-pages', 'extract-pdf-pages', 'split-pdf'],
},
{
  slug: 'rotate-pdf', name: 'Rotate PDF', prio: 'P2', category: 'pdf', widget: 'pdfrotate',
  short: 'Rotate PDF pages 90°, 180°, or 270°.',
  metaDescription: 'Rotate PDF pages permanently online. Fix upside-down or sideways PDFs instantly and securely. Rotate all, odd, or even pages without uploading.',
  keywords: ['rotate pdf', 'rotate pdf pages', 'turn pdf pages', 'fix upside down pdf'],
  content: {
    intro: 'Rotate the pages of a PDF — all pages, or just odd or even ones — and save the corrected file, useful for fixing scans that came in sideways.',
    how: 'The chosen rotation is added to each selected page\'s existing orientation and saved into the PDF, so viewers display it the right way up.',
    howSteps: [
      'Upload the PDF that needs rotation.',
      'Select the rotation angle (90° clockwise, 180°, or 90° counter-clockwise) and choose which pages to apply it to.',
      'Click "Rotate PDF" to securely save and preview the corrected file.'
    ],
    faqs: [
      ['Why would I rotate only odd or even pages?', 'Double-sided physical scanners sometimes flip alternate pages upside down. Rotating only odd or even pages fixes this specific issue effortlessly.'],
      ['Is the rotation permanent when I download it?', 'Yes. The rotation data is saved directly into the file metadata, so every PDF viewer will display it the new way up.'],
      ['Does rotating re-render or compress the pages?', 'No. The tool simply updates the mathematical rotation flag on the page, meaning there is zero loss of quality or text searchability.']
    ],
  },
  related: ['merge-pdf', 'split-pdf', 'add-page-numbers-to-pdf', 'watermark-pdf'],
},
{
  slug: 'add-page-numbers-to-pdf', name: 'Add Page Numbers to PDF', prio: 'P2', category: 'pdf', widget: 'pdfpagenumbers',
  short: 'Stamp page numbers onto a PDF.',
  metaDescription: 'Add page numbers to your PDF documents online for free. Choose the position, starting number, and instantly stamp pages securely in your browser.',
  keywords: ['add page numbers to pdf', 'pdf page numbers', 'number pdf pages', 'insert page numbers pdf'],
  content: {
    intro: 'Add page numbers to a PDF in the corner or center of your choice, with a custom starting number — drawn directly onto each page.',
    how: 'The tool embeds a standard font and draws the page number at your chosen position on every page, starting from the number you set.',
    howSteps: [
      'Select the PDF you want to paginate.',
      'Choose the position for the page numbers (e.g., bottom-center) and specify the starting number.',
      'Click "Add page numbers" to stamp the document and instantly preview the result.'
    ],
    faqs: [
      ['Can I start numbering from a number other than 1?', 'Yes. You can set any custom starting number, which is incredibly useful when the document is just one chapter of a larger set.'],
      ['Where can the page numbers be placed?', 'There are six available positions: the left, center, or right of either the top or bottom margins.'],
      ['Will the page numbers overlap my existing content?', 'The numbers sit in the standard page margin. If your document\'s content stretches all the way to the edges, you may want to test different positions.']
    ],
  },
  related: ['watermark-pdf', 'rotate-pdf', 'edit-pdf-metadata', 'merge-pdf'],
},
{
  slug: 'watermark-pdf', name: 'Watermark PDF', prio: 'P2', category: 'pdf', widget: 'pdfwatermark',
  short: 'Add a text watermark across every page.',
  metaDescription: 'Add custom text watermarks to your PDF documents. Stamp "CONFIDENTIAL" or "DRAFT" across pages securely and privately in your browser.',
  keywords: ['watermark pdf', 'add watermark to pdf', 'pdf watermark', 'stamp pdf text'],
  content: {
    intro: 'Stamp a text watermark — like DRAFT or CONFIDENTIAL — across every page of a PDF, with adjustable opacity, size, and a diagonal option.',
    how: 'The tool draws your text on each page using a bold font at the opacity and size you choose, optionally rotated 45° across the page center.',
    howSteps: [
      'Upload the PDF you want to protect.',
      'Enter your custom watermark text and adjust the opacity, font size, and diagonal orientation.',
      'Click "Add watermark" to permanently stamp the file and download it.'
    ],
    faqs: [
      ['Can the watermark be easily removed later?', 'No, it is drawn permanently into the core page content. Always keep a backup of your original clean file if you need it later.'],
      ['What opacity setting should I use?', 'Around 10–20% opacity is usually visible enough for protection without obscuring the vital text underneath.'],
      ['Can I use an image logo as a watermark?', 'This specific tool adds text watermarks. If you need to stamp an image, you can use our Image tools to create a layout first.']
    ],
  },
  related: ['add-page-numbers-to-pdf', 'edit-pdf-metadata', 'rotate-pdf', 'merge-pdf'],
},
{
  slug: 'jpg-to-pdf', name: 'JPG to PDF', prio: 'P1', category: 'pdf', widget: 'imagestopdf',
  short: 'Convert JPG (and PNG) images into a PDF.',
  metaDescription: 'Convert JPG and JPEG images into a single PDF document for free. Combine pictures securely in your browser with zero uploads.',
  keywords: ['jpg to pdf', 'jpeg to pdf', 'image to pdf', 'convert jpg to pdf', 'picture to pdf'],
  content: {
    intro: 'Turn one or more JPG images into a single PDF, ordering them as you like and choosing between image-sized pages or fitting each onto an A4 page.',
    how: 'Each image is embedded into a PDF page at full quality. Reorder images before converting, and pick whether pages match each image or use a uniform A4 layout.',
    howSteps: [
      'Drag and drop your JPG or JPEG images into the tool.',
      'Reorder the images using the arrows and select your preferred page sizing (Fit or A4).',
      'Click "Create PDF" to instantly merge the photos into a single PDF document.'
    ],
    faqs: [
      ['Can I combine dozens of images into one PDF?', 'Yes, you can add as many images as you like. They will become consecutive pages in the final file.'],
      ['Does this tool work with PNG images too?', 'Yes, both JPG and PNG formats are fully supported, and you can freely mix them in the same document.'],
      ['Is my image quality reduced during conversion?', 'No. The images are embedded directly into the PDF wrapper exactly as they are, with no aggressive recompression.']
    ],
  },
  related: ['png-to-pdf', 'merge-pdf', 'split-pdf', 'watermark-pdf'],
},
{
  slug: 'png-to-pdf', name: 'PNG to PDF', prio: 'P1', category: 'pdf', widget: 'imagestopdf',
  short: 'Convert PNG (and JPG) images into a PDF.',
  metaDescription: 'Convert PNG images into a PDF document online. Preserve transparency and high quality locally in your browser. 100% free and private.',
  keywords: ['png to pdf', 'convert png to pdf', 'image to pdf', 'png to pdf converter'],
  content: {
    intro: 'Convert PNG images — including screenshots and graphics with transparency — into a single PDF, in the order you choose.',
    how: 'Each PNG is embedded into a PDF page at full quality. Arrange the images, then pick image-sized pages or a uniform A4 fit before creating the file.',
    howSteps: [
      'Upload your high-quality PNG files into the converter.',
      'Organize the sequence of images and select a uniform A4 layout or custom fit.',
      'Click "Create PDF" to instantly compile the PNGs into a secure document.'
    ],
    faqs: [
      ['Is transparent background preserved?', 'PNG transparency is cleanly composited onto a solid white PDF page background when embedded, ensuring no visual glitches.'],
      ['Can I mix PNG and JPG files together?', 'Yes, both image formats are accepted simultaneously to build a hybrid document.'],
      ['Are my private photos uploaded to a cloud server?', 'No. The entire conversion process runs locally inside your browser, ensuring absolute privacy.']
    ],
  },
  related: ['jpg-to-pdf', 'merge-pdf', 'watermark-pdf', 'add-page-numbers-to-pdf'],
},
{
  slug: 'edit-pdf-metadata', name: 'Edit PDF Metadata', prio: 'P3', category: 'pdf', widget: 'pdfmetadata',
  short: 'View and edit a PDF\'s title, author, and keywords.',
  metaDescription: 'Edit PDF metadata properties easily. Change the title, author, subject, and keywords of any PDF file privately in your web browser.',
  keywords: ['edit pdf metadata', 'pdf properties editor', 'change pdf author title', 'pdf meta tags'],
  content: {
    intro: 'View and change a PDF\'s document properties — title, author, subject, and keywords — which affect how the file appears in search, libraries, and document managers.',
    how: 'The tool loads the existing metadata for editing, then writes your changes back into the PDF along with an updated modification date.',
    howSteps: [
      'Load the PDF you want to inspect.',
      'Review the current metadata and type your new Title, Author, Subject, or Keywords.',
      'Click "Save metadata" to generate the updated PDF file instantly.'
    ],
    faqs: [
      ['Why does PDF metadata matter?', 'Titles and keywords help document management systems, operating systems, and search engines properly index your file.'],
      ['Does editing metadata alter the visible page content?', 'No. Only the hidden document properties are updated; the actual text and images on the pages remain completely untouched.'],
      ['Can I clear an existing metadata field completely?', 'Yes. Simply delete the text in the field so it is empty, and save the file to wipe that specific property.']
    ],
  },
  related: ['watermark-pdf', 'add-page-numbers-to-pdf', 'merge-pdf', 'rotate-pdf'],
},
{
  slug: 'pdf-to-jpg', name: 'PDF to JPG', prio: 'P1', category: 'pdf', widget: 'pdftoimages', dataset: 'jpeg',
  short: 'Convert each PDF page into a JPG image.',
  metaDescription: 'Convert PDF files to high-quality JPG images online. Free, fast, and secure PDF to picture converter running strictly in your browser.',
  keywords: ['pdf to jpg', 'pdf to jpeg', 'convert pdf to image', 'pdf to picture', 'pdf to photo'],
  content: {
    intro: 'Convert every page of a PDF into a high-quality JPG image you can download individually or all at once — rendered entirely in your browser.',
    how: 'The tool uses Mozilla\'s PDF.js engine to render each page to a canvas at your chosen resolution, then exports it as a JPG. Higher quality settings produce larger, sharper images suitable for print.',
    howSteps: [
      'Upload your PDF document.',
      'Adjust the quality slider (from standard screen resolution up to high-quality print).',
      'Download the converted JPG images individually by clicking them, or download all pages at once.'
    ],
    faqs: [
      ['What quality setting should I pick?', '1× is perfectly fine for basic screen viewing; 2× is a great high-quality default; 3–4× suits professional printing but creates much larger file sizes.'],
      ['Are my sensitive files uploaded?', 'No. The rendering engine runs entirely inside your browser. Nothing ever leaves your device.'],
      ['Why should I use JPG instead of PNG?', 'JPG provides significantly smaller file sizes for photographic or complex pages. For simple text or line-art, use our PDF to PNG tool instead.']
    ],
  },
  related: ['pdf-to-png', 'jpg-to-pdf', 'pdf-to-text', 'pdf-info-viewer'],
},
{
  slug: 'pdf-to-png', name: 'PDF to PNG', prio: 'P1', category: 'pdf', widget: 'pdftoimages', dataset: 'png',
  short: 'Convert each PDF page into a PNG image.',
  metaDescription: 'Convert PDF pages to lossless PNG images. Extract sharp text and graphics from PDFs securely online without losing quality.',
  keywords: ['pdf to png', 'convert pdf to png', 'pdf page to image', 'pdf to transparent image'],
  content: {
    intro: 'Render every page of a PDF into a crisp, lossless PNG image — ideal for text, diagrams, and screenshots where sharp edges matter.',
    how: 'Each page is rendered with PDF.js to a canvas at your selected resolution and exported as a lossless PNG. You can download pages one by one or all together.',
    howSteps: [
      'Select the PDF file you want to convert.',
      'Choose the output resolution multiplier using the slider.',
      'Download individual PNG pages from the grid or grab all of them at once with a single click.'
    ],
    faqs: [
      ['PNG or JPG — which format is better for my PDF?', 'PNG is a lossless format and is vastly superior for text, line art, and flat graphics. JPG is better if your PDF mostly contains large photographs.'],
      ['Can I increase the output resolution?', 'Yes. By raising the quality slider, you force the engine to render larger, sharper images at the cost of increased file size.'],
      ['Does this tool work offline?', 'Yes. Once the webpage loads, the entire PDF conversion engine runs locally in your browser without requiring server communication.']
    ],
  },
  related: ['pdf-to-jpg', 'png-to-pdf', 'pdf-to-text', 'pdf-info-viewer'],
},
{
  slug: 'pdf-to-text', name: 'PDF to Text', prio: 'P1', category: 'pdf', widget: 'pdftotext',
  short: 'Extract the selectable text from a PDF.',
  metaDescription: 'Extract plain text from any PDF document instantly. Free online PDF to Text converter that safely parses content in your browser.',
  keywords: ['pdf to text', 'extract text from pdf', 'pdf text extractor', 'copy text from pdf'],
  content: {
    intro: 'Extract the text content from a PDF and copy it or download it as a plain .txt file — useful for quoting, repurposing, or searching a document\'s contents.',
    how: 'The tool reads the PDF\'s embedded text layer with PDF.js, page by page, and assembles it into clean plain text. It works on text-based PDFs; scanned image PDFs have no text layer to extract.',
    howSteps: [
      'Drop your PDF document into the tool.',
      'Wait a moment while the engine extracts the embedded text layer.',
      'Review the text in the preview box, then click "Download .txt" to save it.'
    ],
    faqs: [
      ['Why is absolutely no text found in my PDF?', 'Your PDF is likely a scanned document, which means it consists of images of pages rather than embedded digital text. You need an OCR (Optical Character Recognition) tool to read those.'],
      ['Is the original formatting preserved?', 'No. This extraction grabs pure plain text. Complex layouts, fonts, columns, and visual tables are not reconstructed.'],
      ['Is my document kept private?', 'Absolutely. The extraction engine runs 100% locally in your web browser; your file is never uploaded to any external server.']
    ],
  },
  related: ['pdf-to-jpg', 'pdf-info-viewer', 'word-counter', 'pdf-to-png'],
},
{
  slug: 'pdf-info-viewer', name: 'PDF Info Viewer', prio: 'P3', category: 'pdf', widget: 'pdfinfo',
  short: 'Inspect a PDF\'s pages, size, and metadata.',
  metaDescription: 'View hidden PDF metadata, page counts, dimensions, and creation details instantly online. Free, safe, and entirely browser-based inspection tool.',
  keywords: ['pdf info viewer', 'pdf metadata viewer', 'pdf properties', 'pdf page count', 'check pdf details'],
  content: {
    intro: 'Inspect a PDF\'s details — page count, page dimensions, file size, and document metadata like title, author, creator, and creation date — without opening a heavy PDF reader.',
    how: 'The tool reads the document structure and metadata with PDF.js and presents it in a clear table, including the PDF version and whether the file is encrypted.',
    howSteps: [
      'Select a PDF file to analyze.',
      'The tool instantly parses the binary structure of the file.',
      'Review the comprehensive table detailing metadata, exact dimensions, tool creators, and page counts.'
    ],
    faqs: [
      ['What specific details can I learn from this tool?', 'You can uncover exact page counts, precise dimensions, the software that originally created the PDF, hidden embedded author metadata, and the core PDF format version.'],
      ['Why do page dimensions show in points?', 'The PDF specification internally measures everything in points (72 points per inch). The tool also calculates and displays the inches equivalent for your convenience.'],
      ['Is the file uploaded to analyze it?', 'No. The entire analysis happens instantly by reading the file structure locally in your browser memory.']
    ],
  },
  related: ['pdf-to-text', 'edit-pdf-metadata', 'pdf-to-jpg', 'merge-pdf'],
},
{
  slug: 'pdf-to-markdown', name: 'PDF to Markdown', prio: 'P1', category: 'pdf', widget: 'pdftomarkdown',
  short: 'Convert a PDF into clean Markdown with headings detected automatically.',
  metaDescription: 'Convert PDF documents to clean Markdown (.md) automatically. Detects headings and lists securely within your browser. Perfect for Notion or Obsidian.',
  keywords: ['pdf to markdown','pdf to md','convert pdf to markdown','pdf markdown converter', 'pdf to notion'],
  content: {
    intro: 'Convert a text-based PDF into clean Markdown — headings are detected automatically from font sizes, bullet lists are preserved, and pages are separated. Perfect for moving PDF content into Notion, Obsidian, GitHub, or any Markdown editor.',
    how: 'The tool reads the PDF text layer locally with PDF.js, measures the font size of every line, and treats lines significantly larger than the body text as # / ## / ### headings. Bullets and numbered lists are recognized by their markers.',
    howSteps: [
      'Upload the text-based PDF you want to convert.',
      'The engine automatically analyzes font sizes to intelligently guess heading structures.',
      'Review the generated Markdown syntax and download it as an .md file.'
    ],
    faqs: [
      ['Why are my headings not being detected properly?', 'Heading detection relies on font-size math. If the PDF uses the exact same size for headings and body text, they will come through as plain text. This is usually easy to fix manually later.'],
      ['Does this tool work on scanned image PDFs?', 'No. Scanned pages are flat images with no digital text layer. Markdown conversion requires selectable text.'],
      ['Are complex tables converted cleanly?', 'PDF tables have no reliable underlying structure in the text layer, so they often extract as messy rows of text. You should use a dedicated Markdown Table Generator to rebuild them.']
    ],
  },
  related: ['pdf-to-text', 'markdown-previewer', 'markdown-table-generator', 'markdown-to-html'],
},
{
  slug: 'markdown-to-pdf', name: 'Markdown to PDF', prio: 'P1', category: 'pdf', widget: 'markdowntopdf',
  short: 'Turn Markdown into a styled A4 PDF — headings, lists, quotes, and code.',
  metaDescription: 'Convert Markdown to a beautifully formatted PDF online. Automatically styles code blocks, lists, and headings into a print-ready A4 document.',
  keywords: ['markdown to pdf','md to pdf','convert markdown to pdf','markdown pdf converter', 'print markdown'],
  content: {
    intro: 'Write or paste Markdown and generate a professionally laid-out A4 PDF — with styled headings, bullet and numbered lists, blockquotes, code blocks with background shading, and automatic page breaks.',
    how: 'The Markdown is parsed into blocks, then laid out with a real typesetting pass: text is measured and word-wrapped to the page width, headings get larger bold type with rules under H1/H2, and content flows across pages automatically.',
    howSteps: [
      'Paste your raw Markdown text into the editor area.',
      'Click "Generate PDF" to trigger the local typesetting engine.',
      'Preview the beautifully styled A4 document and download the final PDF.'
    ],
    faqs: [
      ['What Markdown features are specifically supported?', 'The engine supports Headings (#–######), bold text, inline code, links, bullet and numbered lists, blockquotes, fenced code blocks, and horizontal rules.'],
      ['Can I change the output page size or use custom fonts?', 'Currently, the output is strictly A4 using Helvetica for text and Courier for code — a reliable, clean default that prints exceptionally well.'],
      ['Why do some special emoji characters show as "?"', 'The built-in PDF fonts cover standard Latin characters. Emoji and complex non-Latin scripts are replaced with "?" to prevent the document from crashing.']
    ],
  },
  related: ['pdf-to-markdown', 'markdown-previewer', 'jpg-to-pdf', 'merge-pdf'],
},
];
