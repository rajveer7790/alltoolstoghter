import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string, help?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, help });
const T = (k: string, l: string, d: string, help?: string): any => ({ key: k, label: l, type: 'textarea', def: d, help });

export const VIRAL_AI2: ToolDef[] = [
{
  slug: 'llm-tokens-per-second-estimator', name: 'LLM Tokens per Second & TTFT Roofline Calculator', prio: 'P2', category: 'ai-engineering', widget: 'calc',
  short: 'Upper-bound decode tokens/s from memory bandwidth and a lower-bound prefill time-to-first-token.',
  metaDescription: 'LLM tokens per second calculator: estimate the memory-bandwidth decode ceiling and compute-bound prefill TTFT from model size, bandwidth and TFLOPS.',
  keywords: ['llm tokens per second calculator', 'memory bandwidth roofline llm inference', 'time to first token estimator', 'decode vs prefill bound'],
  fields: [
    $('params', 'Parameters read per token', 8, 'B', 'Dense model: total parameters. Mixture-of-experts: active parameters per token.'),
    { key: 'bytes', label: 'Bytes per parameter', type: 'select', def: '2', options: [
      { value: '4', label: '4 bytes (FP32)' }, { value: '2', label: '2 bytes (FP16 / BF16)' }, { value: '1', label: '1 byte (INT8 / FP8)' }, { value: '0.5', label: '0.5 bytes (4-bit)' }] },
    $('bandwidth', 'Memory bandwidth', 1000, 'GB/s', 'Peak bandwidth from the hardware datasheet.'),
    $('efficiency', 'Bandwidth efficiency', 70, '%', 'Share of peak bandwidth the runtime actually achieves. Measure on your setup.'),
    $('kv', 'KV cache read per token (optional)', 0, 'GB', 'Extra bytes read from the KV cache for each generated token. 0 to ignore.'),
    $('tflops', 'Peak compute', 100, 'TFLOPS', 'Peak throughput for the precision you run, from the datasheet.'),
    $('utilisation', 'Compute utilisation', 50, '%', 'Share of peak FLOPS reached during prefill.'),
    $('prompt', 'Prompt length', 1000, 'tokens'),
  ],
  content: {
    intro: 'Generating one token at batch size 1 means streaming the model weights from memory, so decode speed is usually capped by memory bandwidth rather than compute. Prefill processes the whole prompt in parallel and is usually compute-bound. This calculator gives theoretical bounds for both phases from the model size, bandwidth, peak TFLOPS and your own efficiency assumptions.',
    how: 'Decode upper bound (tokens/s) = bandwidth (GB/s) × efficiency ÷ bytes read per token (GB), where bytes per token = parameters × bytes per parameter (+ optional KV cache bytes). Prefill TTFT lower bound = 2 × parameters × prompt tokens ÷ (peak TFLOPS × 10¹² × utilisation). The 2 × parameters FLOPs per token is the usual dense-transformer approximation; it ignores attention FLOPs that grow with context, network and scheduling overhead, and batching. Efficiency and utilisation are your inputs, not constants. Results are theoretical bounds and real throughput is lower.',
    howSteps: [
      'Enter the parameters read per token (total for dense models, active for mixture-of-experts) and the bytes per parameter for your quantisation.',
      'Enter memory bandwidth and peak TFLOPS from the hardware datasheet, plus the efficiency and utilisation you expect.',
      'Read the decode ceiling in tokens/s and the prefill time-to-first-token lower bound for your prompt length.',
    ],
    example: 'An 8B-parameter model in FP16 (2 bytes) reads 16 GB per token. With 1000 GB/s bandwidth at 70% efficiency, the decode ceiling is 700 / 16 = 43.75 tokens/s. A 1000-token prompt needs 2 × 8×10⁹ × 1000 = 16 TFLOP; at 100 TFLOPS and 50% utilisation that is 16 / 50 = 0.32 s, so the TTFT lower bound is 320 ms.',
    faqs: [
      ['Why is decode memory-bound?', 'Each new token at batch size 1 requires reading essentially all active weights once while doing only about 2 FLOPs per weight, so the arithmetic units wait on memory. Larger batches reuse each weight read and shift toward compute-bound.'],
      ['What efficiency should I use?', 'It depends on the runtime, kernels and hardware. The default of 70% is only a placeholder; benchmark your own stack and enter the measured value.'],
      ['How do I handle mixture-of-experts models?', 'Enter the active parameters per token, not the total. Note that with batching, different tokens may touch different experts, which raises the bytes read per step.'],
      ['Is this the real speed I will see?', 'No. It is an upper bound for decode and a lower bound for TTFT. It ignores attention cost at long context, KV cache traffic unless you enter it, scheduling, networking, sampling and framework overhead.'],
      ['Does quantisation change the result?', 'Yes: fewer bytes per parameter means fewer bytes read per token and a higher decode ceiling. The prefill bound only changes if your hardware has a higher peak TFLOPS at the lower precision, which you enter yourself.'],
    ],
  },
  sources: [{ label: 'Kaplan et al., Scaling Laws for Neural Language Models (≈2 × parameters FLOPs per token)', url: 'https://arxiv.org/abs/2001.08361' }],
  related: ['lora-trainable-parameters-calculator', 'softmax-temperature-calculator'],
},
{
  slug: 'lora-trainable-parameters-calculator', name: 'LoRA Trainable Parameters Calculator', prio: 'P2', category: 'ai-engineering', widget: 'calc',
  short: 'Trainable parameters, scaling factor α/r and adapter size for a LoRA rank, hidden size and layer count.',
  metaDescription: 'LoRA rank alpha calculator: count trainable LoRA parameters, % of the base model, the α/r scaling factor and adapter file size from rank and layer shapes.',
  keywords: ['lora rank alpha calculator', 'lora trainable parameters', 'lora scaling factor alpha over r', 'lora adapter size'],
  fields: [
    $('hidden', 'Hidden size (d_model)', 4096),
    $('layers', 'Number of layers', 32),
    $('rank', 'LoRA rank r', 16),
    $('alpha', 'LoRA alpha (α)', 32),
    { key: 'modules', label: 'Adapted modules', type: 'select', def: 'all', options: [
      { value: 'qv', label: 'q, v (2 attention matrices)' }, { value: 'qkvo', label: 'q, k, v, o (4 attention matrices)' }, { value: 'all', label: 'All linear: q, k, v, o + gate, up, down' }] },
    $('inter', 'Intermediate (MLP) size', 11008, undefined, 'Used only for the all-linear preset.'),
    $('baseParams', 'Base model parameters', 6.74, 'B', 'Total parameters of the frozen base model, in billions.'),
  ],
  content: {
    intro: 'LoRA freezes the pretrained weights and trains two small matrices per adapted layer, so the number of trainable parameters is a small fraction of the model. This calculator counts those parameters for a chosen rank and set of adapted modules, and shows the scaling factor α/r and the adapter file size.',
    how: 'For one adapted weight matrix of shape d_in × d_out, LoRA adds A (d_in × r) and B (r × d_out), i.e. r × (d_in + d_out) parameters. The calculator multiplies this by the number of adapted matrices per layer and by the number of layers. The q, v preset uses 2 square matrices (hidden × hidden), q, k, v, o uses 4, and all-linear adds 3 MLP matrices of shape hidden × intermediate. It assumes standard multi-head attention with square projections; grouped-query or multi-query attention makes the k and v projections smaller, so the true count would be lower. The LoRA update is scaled by α/r; rsLoRA instead proposes α/√r. Adapter size is parameters × 2 bytes (fp16) or × 4 bytes (fp32), in MB of 10⁶ bytes; optimiser state and base weights are not included.',
    howSteps: [
      'Enter the hidden size, layer count and the base model size in billions of parameters.',
      'Choose the rank r, alpha and which modules get adapters (add the MLP size for all-linear).',
      'Read the trainable parameters, the share of the base model, the scaling factor and the adapter size.',
    ],
    example: 'Hidden size 4096, 32 layers, r = 16, all-linear with intermediate size 11008. Per layer: 4 × 16 × (4096 + 4096) + 3 × 16 × (4096 + 11008) = 524,288 + 724,992 = 1,249,280. Over 32 layers that is 39,976,960 trainable parameters, which is 0.5931% of a 6.74B model. With α = 32 the scaling factor α/r is 2, and the fp16 adapter is about 79.95 MB.',
    faqs: [
      ['What does alpha do?', 'The low-rank update is multiplied by α/r before being added to the frozen weights. Raising α strengthens the adapter update relative to the base weights; it interacts with the learning rate.'],
      ['What is rsLoRA?', 'Rank-stabilised LoRA proposes scaling by α/√r instead of α/r so that learning stays stable at higher ranks. The calculator shows that value for comparison.'],
      ['Does this work for grouped-query attention models?', 'Only approximately. With GQA or MQA the k and v projections have a smaller output dimension, so the real trainable count is lower than this square-matrix estimate.'],
      ['Does QLoRA change the parameter count?', 'No. QLoRA trains the same LoRA matrices on a quantised base model; it changes memory use of the frozen weights, not the number of adapter parameters.'],
      ['Are optimiser states included?', 'No. Only the adapter parameters and their stored file size are reported. Training memory also needs gradients, optimiser state and activations.'],
    ],
  },
  sources: [
    { label: 'Hu et al., LoRA: Low-Rank Adaptation of Large Language Models', url: 'https://arxiv.org/abs/2106.09685' },
    { label: 'Kalajdzievski, A Rank Stabilization Scaling Factor for Fine-Tuning with LoRA', url: 'https://arxiv.org/abs/2312.03732' },
  ],
  related: ['llm-tokens-per-second-estimator', 'classification-metrics-calculator'],
},
{
  slug: 'softmax-temperature-calculator', name: 'Softmax Temperature, Top-K & Top-P Calculator', prio: 'P2', category: 'ai-engineering', widget: 'calc',
  short: 'See how temperature, top-k and top-p reshape next-token probabilities from a list of logits.',
  metaDescription: 'LLM temperature top p visualizer: enter logits to see softmax probabilities after temperature, top-k and nucleus (top-p) truncation, plus entropy in bits.',
  keywords: ['llm temperature top p visualizer', 'softmax temperature calculator', 'nucleus sampling top p', 'top-k sampling probabilities'],
  fields: [
    T('logits', 'Logits (2 to 50 values)', '2.0, 1.0, 0.5, 0.0, -1.0, -2.0', 'Comma, semicolon or space separated.'),
    $('temperature', 'Temperature T', 0.8, undefined, 'Must be greater than 0.'),
    $('topk', 'Top-k (0 = off)', 0),
    $('topp', 'Top-p (1 = off)', 0.9),
  ],
  content: {
    intro: 'Before an LLM picks the next token, it turns logits into probabilities with a softmax scaled by temperature, and many samplers then cut the tail with top-k and top-p. Paste a list of logits to see the probability of each token before and after truncation, the entropy, and how many candidates remain.',
    how: 'Probabilities are p_i = exp(z_i / T) / Σ exp(z_j / T), computed after subtracting the largest scaled logit for numerical stability. Top-k keeps the k most probable tokens (0 disables it). Top-p then works on the renormalised distribution: tokens are taken in descending order until their cumulative probability reaches p (1 disables it). The survivors are renormalised to sum to 1. Entropy is Σ −p log₂ p in bits. Ties are broken by input order. Individual APIs and libraries may order or combine these filters differently, and this tool does not model min-p or repetition penalties. Temperature must be greater than 0; values below 0.001 are rejected.',
    howSteps: [
      'Paste the logits for the candidate tokens and set the temperature.',
      'Optionally set top-k (0 for off) and top-p (1 for off).',
      'Compare probabilities before and after truncation for the top five tokens, with the entropy and number of tokens kept.',
    ],
    example: 'Logits 2, 1, 0.5, 0, −1, −2 at T = 0.8 give 64.42%, 18.46%, 9.88%, 5.29%, 1.52% and 0.43% (entropy 1.538 bits). With top-p = 0.9 the first three tokens (cumulative 92.76%) are kept and renormalised to 69.45%, 19.9% and 10.65%, leaving entropy 1.173 bits.',
    faqs: [
      ['What does lowering temperature do?', 'It sharpens the distribution toward the highest logit; as T approaches 0 the choice approaches greedy decoding. Higher T flattens the distribution and makes unlikely tokens more probable.'],
      ['What is the difference between top-k and top-p?', 'Top-k keeps a fixed number of tokens, while top-p keeps the smallest set whose cumulative probability reaches p, so the number kept varies with how confident the model is.'],
      ['Why is T = 0 rejected?', 'Dividing by zero is undefined. Greedy decoding is the limit as T approaches 0 and is simply the argmax token.'],
      ['Are these the logits of a real model?', 'Only if you paste them from one. This tool works on whatever numbers you enter and shows a small subset of vocabulary, not a full model vocabulary.'],
      ['Is the order of filters the same in every library?', 'No. Some applications apply temperature after filtering or apply top-p before top-k. This calculator applies temperature, then top-k, then top-p, as described above.'],
    ],
  },
  sources: [{ label: 'Holtzman et al., The Curious Case of Neural Text Degeneration (nucleus sampling)', url: 'https://arxiv.org/abs/1904.09751' }],
  related: ['llm-tokens-per-second-estimator', 'vector-similarity-calculator'],
},
{
  slug: 'classification-metrics-calculator', name: 'Confusion Matrix Calculator (F1, Precision, Recall, MCC)', prio: 'P2', category: 'ai-engineering', widget: 'calc',
  short: 'Accuracy, precision, recall, specificity, F-beta, balanced accuracy and MCC from TP, FP, FN and TN.',
  metaDescription: 'Confusion matrix calculator: enter TP, FP, FN and TN to get precision, recall, F1 or F-beta, specificity, balanced accuracy and Matthews correlation.',
  keywords: ['confusion matrix calculator', 'precision recall f1 score calculator', 'matthews correlation coefficient calculator', 'specificity false positive rate'],
  fields: [
    $('tp', 'True positives (TP)', 80),
    $('fp', 'False positives (FP)', 10),
    $('fn', 'False negatives (FN)', 20),
    $('tn', 'True negatives (TN)', 890),
    $('beta', 'F-beta β', 1, undefined, '1 gives F1; β > 1 weights recall more, β < 1 weights precision more.'),
  ],
  content: {
    intro: 'A binary classifier is summarised by four counts: true positives, false positives, false negatives and true negatives. This calculator turns them into the usual metrics so you can see how accuracy, precision, recall, F1 and the Matthews correlation coefficient differ, especially on imbalanced data.',
    how: 'Accuracy = (TP + TN) / total; precision = TP / (TP + FP); recall = TP / (TP + FN); specificity = TN / (TN + FP); F-beta = (1 + β²) × TP / ((1 + β²) × TP + β² × FN + FP), which equals F1 = 2TP / (2TP + FP + FN) at β = 1; balanced accuracy = (recall + specificity) / 2; MCC = (TP × TN − FP × FN) / √((TP+FP)(TP+FN)(TN+FP)(TN+FN)); prevalence = (TP + FN) / total. When a denominator is zero the metric is shown as n/a rather than guessed. Counts may be fractional (for example averaged results). ROC-AUC needs scores for every example, so it is not computed here.',
    howSteps: [
      'Enter the four confusion matrix counts from your evaluation set.',
      'Set β if you want to weight recall or precision differently (1 for F1).',
      'Read the metrics; metrics with a zero denominator appear as n/a.',
    ],
    example: 'TP = 80, FP = 10, FN = 20, TN = 890 (1,000 examples). Precision = 80/90 = 88.89%, recall = 80/100 = 80%, specificity = 890/900 = 98.89%, accuracy = 970/1000 = 97%. F1 = 160 / (160 + 30) = 0.8421, balanced accuracy = 89.44% and MCC = 71,000 / √(90 × 100 × 900 × 910) = 0.827.',
    faqs: [
      ['When is accuracy misleading?', 'On imbalanced data. A model that always predicts the majority class can score high accuracy while finding no positives. Recall, precision, balanced accuracy and MCC expose this.'],
      ['What is MCC?', 'The Matthews correlation coefficient is the correlation between predicted and true labels, from −1 to +1. It uses all four counts, so it stays informative on imbalanced data. It is undefined when a row or column of the matrix sums to zero.'],
      ['What does F-beta do?', 'It is a weighted harmonic mean of precision and recall. β = 2 treats recall as twice as important as precision; β = 0.5 favours precision.'],
      ['Why do I see n/a?', 'A metric such as precision has no value when its denominator (here TP + FP) is zero. The tool reports n/a instead of returning an invalid number.'],
      ['Does this handle multi-class problems?', 'No. It covers one binary confusion matrix. For multi-class, compute metrics per class (one-vs-rest) and average them yourself.'],
    ],
  },
  sources: [
    { label: 'scikit-learn: model evaluation (classification metrics)', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
  ],
  related: ['llm-tokens-per-second-estimator', 'word-error-rate-calculator', 'lora-trainable-parameters-calculator'],
},
{
  slug: 'word-error-rate-calculator', name: 'Word Error Rate (WER) & CER Calculator', prio: 'P2', category: 'ai-engineering', widget: 'calc',
  short: 'WER and CER between a reference and a hypothesis transcript, with substitution, deletion and insertion counts.',
  metaDescription: 'Word error rate calculator: compare a reference with an ASR transcript to get WER, CER and the substitution, deletion and insertion counts via Levenshtein.',
  keywords: ['word error rate calculator', 'wer cer levenshtein distance', 'asr transcription accuracy', 'substitutions deletions insertions'],
  fields: [
    T('reference', 'Reference (ground truth)', 'the cat sat on the mat'),
    T('hypothesis', 'Hypothesis (ASR output)', 'the cat sit on mat'),
    { key: 'normalise', label: 'Text normalisation', type: 'select', def: 'norm', options: [
      { value: 'norm', label: 'Lowercase and strip punctuation' }, { value: 'raw', label: 'None (case and punctuation count)' }] },
  ],
  content: {
    intro: 'Word error rate is the standard measure of speech recognition accuracy: the minimum number of word substitutions, deletions and insertions needed to turn the system output into the reference, divided by the number of reference words. This tool also reports the character error rate and the counts behind each score.',
    how: 'Both texts are split on whitespace (optionally lowercased with punctuation replaced by spaces; apostrophes are kept). A Levenshtein dynamic-programming alignment finds the minimum edit distance and a backtrace counts substitutions S, deletions D and insertions I. WER = (S + D + I) / N, where N is the number of reference words. Because insertions are not bounded by N, WER can exceed 100% and accuracy (1 − WER) can be negative. CER is the character-level edit distance divided by the number of reference characters, with single spaces counted. When several alignments have the same minimum cost the S/D/I split may differ between tools, but the total WER does not. Each text is limited to 8,000 characters.',
    howSteps: [
      'Paste the reference transcript and the hypothesis transcript.',
      'Choose whether to lowercase and strip punctuation before comparing.',
      'Read WER, CER and the S, D and I counts.',
    ],
    example: 'Reference "the cat sat on the mat" (6 words) versus hypothesis "the cat sit on mat": one substitution (sat → sit) and one deletion (the), no insertions, so WER = (1 + 1 + 0) / 6 = 33.33%. At character level the edit distance is 5 over 22 reference characters, giving CER = 22.73%.',
    faqs: [
      ['Can WER be above 100%?', 'Yes. If the hypothesis contains many extra words, insertions are counted on top of substitutions and deletions, so the errors can exceed the number of reference words.'],
      ['Should I normalise text first?', 'Usually, for fair comparison: differences in case or punctuation are often not what you want to measure. Choose "None" to count them as errors. Numbers, spelling variants and contractions are not normalised beyond this.'],
      ['Why is the reference required?', 'WER divides by the number of reference words, so an empty reference gives an undefined rate.'],
      ['How is CER different?', 'CER works on characters instead of words, so it gives partial credit for near-misses such as a single wrong letter, and is common for languages without clear word boundaries.'],
      ['Why might another tool report different S, D, I?', 'Several alignments can have the same minimum cost. The total number of errors is the same but the split between types can differ with tie-breaking.'],
    ],
  },
  related: ['classification-metrics-calculator', 'vector-similarity-calculator'],
},
{
  slug: 'vector-similarity-calculator', name: 'Cosine Similarity, Dot Product & L2 Distance Calculator', prio: 'P2', category: 'ai-engineering', widget: 'calc',
  short: 'Cosine similarity, dot product, Euclidean and Manhattan distance, norms and angle for two vectors.',
  metaDescription: 'Cosine similarity calculator: enter two vectors to get cosine similarity and distance, dot product, L2 and L1 distance, norms and the angle in degrees.',
  keywords: ['cosine similarity calculator', 'dot product vs cosine similarity vs l2', 'embedding similarity', 'normalize vector l2'],
  fields: [
    T('a', 'Vector A', '1, 2, 3', 'Numbers separated by commas, semicolons or spaces. Up to 4,096 values.'),
    T('b', 'Vector B', '4, 5, 6', 'Must have the same length as A.'),
  ],
  content: {
    intro: 'Embedding search, recommendation and retrieval systems compare vectors with cosine similarity, dot product or Euclidean distance. Enter two vectors of equal length to see all the common measures side by side, along with their norms and the angle between them.',
    how: 'Dot = Σ AᵢBᵢ. Norm ‖A‖₂ = √(Σ Aᵢ²). Cosine similarity = Dot / (‖A‖₂ ‖B‖₂), cosine distance = 1 − cosine similarity, and the angle is acos of the similarity, clamped to [−1, 1] to absorb rounding. Euclidean distance (L2) = √(Σ (Aᵢ − Bᵢ)²) and Manhattan distance (L1) = Σ |Aᵢ − Bᵢ|. If both vectors have unit length, cosine similarity equals the dot product and squared L2 distance equals 2 × (1 − cosine similarity). The tool flags vectors whose norm is within 10⁻⁶ of 1. If either vector is all zeros, cosine similarity is undefined and shown as n/a.',
    howSteps: [
      'Paste vector A and vector B with the same number of values.',
      'Check the cosine similarity and the angle between the vectors.',
      'Compare with dot product and L2 or L1 distance, and check whether the vectors are unit-normalised.',
    ],
    example: 'A = (1, 2, 3) and B = (4, 5, 6). Dot = 4 + 10 + 18 = 32; norms are √14 = 3.741657 and √77 = 8.774964. Cosine similarity = 32 / √1078 = 0.974632 (angle 12.9332°), cosine distance 0.025368, L2 distance √27 = 5.196152 and L1 distance 9.',
    faqs: [
      ['When are cosine similarity and dot product the same?', 'When both vectors are L2-normalised to unit length. Many embedding models output normalised vectors, in which case a dot product search ranks results the same way as cosine similarity.'],
      ['Which should I use for embeddings?', 'Use the measure your embedding model was trained or documented for. Cosine similarity ignores vector length; dot product and L2 distance do not.'],
      ['What similarity threshold counts as similar?', 'There is no universal threshold. It depends on the model and data, so calibrate it on labelled examples from your own use case.'],
      ['Why is cosine similarity n/a?', 'The angle between a zero vector and another vector is undefined because the norm in the denominator is zero.'],
      ['Are there size limits?', 'Vectors must have equal length, up to 4,096 values, and each value must be a finite number no larger than 1e100 in magnitude.'],
    ],
  },
  sources: [{ label: 'scikit-learn: pairwise metrics (cosine similarity, Euclidean and Manhattan distance)', url: 'https://scikit-learn.org/stable/modules/metrics.html' }],
  related: ['softmax-temperature-calculator', 'word-error-rate-calculator', 'classification-metrics-calculator'],
},
];
