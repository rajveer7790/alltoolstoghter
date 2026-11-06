/** Practical alternatives that work while the online provider is unavailable. */
export const backendGuides: Record<string, {
  description: string;
  heading: string;
  example: string;
  steps: string[];
  alternative: { href: string; label: string };
}> = {
  'grammar-checker': {
    description: 'Check English grammar with a practical editing checklist, examples of common errors, and guidance on reviewing grammar suggestions.',
    heading: 'How to check grammar by hand',
    example: '“The list of files are ready” becomes “The list of files is ready.” The subject is “list,” so the verb is singular.',
    steps: ['Read one sentence at a time and find the subject and main verb.', 'Check agreement, tense, and punctuation. Read the sentence aloud if its structure is unclear.', 'Use a readability check to flag long sentences, then review them in context. Readability scores do not detect grammar mistakes.'],
    alternative: { href: '/text/readability-checker', label: 'Check readability' },
  },
  'paraphrasing-tool': {
    description: 'Learn how to paraphrase a sentence without changing its meaning. Follow a before-and-after example and check which facts and sources to preserve.',
    heading: 'How to paraphrase without losing meaning',
    example: '“The trial ended early because too few people enrolled” becomes “Low enrollment caused the trial to end ahead of schedule.” The cause and outcome stay the same.',
    steps: ['Identify the claim, supporting facts, and any qualifications in the original.', 'Set the source aside and write the idea in your own sentence structure.', 'Compare the two versions for changes in meaning and cite the original source where required.'],
    alternative: { href: '/text/word-counter', label: 'Compare word counts' },
  },
  'plagiarism-checker': {
    description: 'Learn how to look for matching text online, review likely source matches, and check citations before submitting a draft.',
    heading: 'How to check for matching passages',
    example: 'Pick a distinctive phrase from a paragraph and search for it in quotation marks. Open any matches and compare the surrounding passage and publication dates.',
    steps: ['Choose an unusual phrase that is unlikely to occur in unrelated text.', 'Search that phrase and compare matching passages in context.', 'Review quotations and citations. A search can miss private or unindexed documents, and a match alone does not establish plagiarism.'],
    alternative: { href: '/text/word-counter', label: 'Review your draft length' },
  },
  'url-shortener': {
    description: 'Learn how short URLs redirect, how to choose a readable alias, and how to test destination links and campaign tracking before sharing.',
    heading: 'How to shorten and verify a URL',
    example: 'For a URL with campaign tags, create the tagged destination first. Shorten that complete URL and confirm the redirect preserves its query parameters.',
    steps: ['Copy the full HTTPS destination URL and add campaign tags if needed.', 'Choose a readable alias on a domain you control, if your redirect service supports one.', 'Open the short link in a private window and confirm the destination and query parameters before publishing it.'],
    alternative: { href: '/seo/utm-link-builder', label: 'Build a campaign URL' },
  },
};
