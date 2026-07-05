import { ToolDef } from '../types';

export const WRITING: ToolDef[] = [
{
  slug: 'grammar-checker', name: 'Grammar Checker', prio: 'P1', category: 'writing', widget: 'grammarchecker',
  short: 'Catch grammar, spelling, and style mistakes with one-click fixes.',
  metaDescription: 'Free online Grammar Checker. Fix punctuation, spelling, and grammar mistakes instantly via a self-hosted, privacy-first API connection.',
  keywords: ['grammar checker', 'grammar check', 'spell checker', 'free grammar checker', 'punctuation checker'],
  content: {
    intro: 'Check your writing for grammar, spelling, punctuation, and style issues, with clear explanations and one-click suggestions you can apply instantly. Powered by LanguageTool through your own backend.',
    how: 'Your text is sent to the LanguageTool engine, which returns each issue with its location, an explanation, and replacement suggestions. Click a suggestion to apply it, and the text is re-checked automatically.',
    howSteps: [
      'Paste or type your text into the editor window.',
      'The engine automatically communicates with your chosen LanguageTool endpoint to highlight errors.',
      'Click the highlighted errors to read explanations and apply instant fixes.'
    ],
    faqs: [
      ['Is this grammar checker free?', 'Yes — it runs on the open-source LanguageTool engine. The bundled backend uses the free public API; self-host LanguageTool for unlimited, fully private checking.'],
      ['What languages are supported?', 'English (US/UK), Spanish, French, German, Portuguese, and more, selectable before checking.'],
      ['Is my text private?', 'Text is sent to your configured backend. If you self-host LanguageTool, nothing leaves your own infrastructure.'],
    ],
  },
  related: ['paraphrasing-tool', 'plagiarism-checker', 'word-counter', 'readability-checker'],
},
{
  slug: 'paraphrasing-tool', name: 'Paraphrasing Tool', prio: 'P1', category: 'writing', widget: 'paraphrase',
  short: 'Rewrite text in a different style while keeping the meaning.',
  metaDescription: 'Paraphrasing Tool online. Rewrite text, change tone, and adjust styles securely using your own backend LLM connections for maximum privacy.',
  keywords: ['paraphrasing tool', 'paraphrase tool', 'rewrite text', 'paraphraser', 'rewording tool'],
  content: {
    intro: 'Rewrite sentences and paragraphs in a clearer, more formal, simpler, or more creative style while preserving the original meaning — powered by a language model on your own backend.',
    how: 'Your text and chosen style are sent to the language-model provider you configure; it returns a rewritten version. Because genuine paraphrasing requires an AI model, this tool activates once a provider is connected.',
    howSteps: [
      'Enter the text you wish to rephrase.',
      'Select a rewriting style (Formal, Simple, Creative, Standard).',
      'The system routes the request through your private backend to generate a clean, natural rewrite.'
    ],
    faqs: [
      ['Why does paraphrasing need a backend?', 'High-quality paraphrasing requires a large language model, which runs on a server with an API key — it cannot be done well purely in the browser.'],
      ['What styles can I choose?', 'Standard, formal, simple, and creative — each instructs the model to rewrite with a different tone.'],
      ['Which AI provider does it use?', 'Any OpenAI-compatible endpoint you configure in the backend, so you control the model and cost.'],
    ],
  },
  related: ['grammar-checker', 'plagiarism-checker', 'word-counter', 'case-converter'],
},
{
  slug: 'plagiarism-checker', name: 'Plagiarism Checker', prio: 'P1', category: 'writing', widget: 'plagiarism',
  short: 'Check whether passages of text appear elsewhere on the web.',
  metaDescription: 'Free Plagiarism Checker. Ensure your writing is 100% unique. Checks text securely via search APIs managed by your own private backend.',
  keywords: ['plagiarism checker', 'plagiarism detector', 'check plagiarism free', 'duplicate content checker'],
  content: {
    intro: 'Check whether sentences in your text already appear online by searching the web for matching passages and listing the sources found — powered by a search provider on your own backend.',
    how: 'The text is split into meaningful sentences, each searched as an exact phrase through the search provider you configure. Sentences with matches are flagged alongside links to the sources.',
    howSteps: [
      'Input the essay or text block you wish to verify.',
      'The tool segments the text into queries and runs exact-match searches via your backend.',
      'Review any flagged sentences mapped to live internet source links.'
    ],
    faqs: [
      ['Why does plagiarism checking need a backend?', 'Real detection means searching the entire web for matching text, which requires a paid search API — there is no legitimate browser-only way to do it.'],
      ['Does a match mean plagiarism?', 'Not necessarily — common phrases and quotes can match innocently. Use the flagged sources to judge in context.'],
      ['How many sentences are checked?', 'Up to fifteen substantial sentences per check, to keep searches fast and within provider limits.'],
    ],
  },
  related: ['grammar-checker', 'paraphrasing-tool', 'word-counter', 'keyword-density-checker'],
},
];
