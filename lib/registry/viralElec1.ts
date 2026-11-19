import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number | string, u?: string, help?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, help });
const TX = (k: string, l: string, d: string, help?: string): any => ({ key: k, label: l, type: 'text', def: d, help });
const TA = (k: string, l: string, d: string, help?: string): any => ({ key: k, label: l, type: 'textarea', def: d, help });
const SEL = (k: string, l: string, d: string, options: [string, string][]): any => ({ key: k, label: l, type: 'select', def: d, options: options.map(([value, label]) => ({ value, label })) });
// 'electronics' is the category assigned by the planning spec; the CatKey union is widened elsewhere.
const CAT = 'electronics' as any;

export const VIRAL_ELEC1: ToolDef[] = [
{
  slug: 'adc-resolution-calculator', name: 'ADC Resolution, LSB, ENOB & SNR Calculator', prio: 'P2', category: CAT, widget: 'calc',
  short: 'LSB voltage, codes, ideal SNR and ENOB for an N-bit unipolar ADC, plus code and error for an input.',
  metaDescription: 'ADC resolution calculator: LSB size from bits and V_ref, ideal SNR (6.02N+1.76 dB), ENOB from SINAD, output code and error. Runs in your browser.',
  keywords: ['adc resolution calculator', 'enob to sinad snr calculator', 'lsb step size voltage calculator', 'quantization noise db formula'],
  fields: [
    $('bits', 'Resolution N', 12, 'bits', 'Whole number from 1 to 32.'),
    $('vref', 'Reference voltage V_ref', 3.3, 'V'),
    $('sinad', 'Measured SINAD (optional)', 70, 'dB', 'Leave empty to skip ENOB.'),
    $('vin', 'Input voltage (optional)', 1, 'V', 'Leave empty to skip the code and error.'),
  ],
  content: {
    intro: 'An N-bit analog-to-digital converter splits its input range into 2^N codes. This calculator gives the size of one least significant bit (LSB) for your reference voltage, the ideal quantisation-limited signal-to-noise ratio, and the effective number of bits (ENOB) implied by a measured SINAD. It can also show which output code a given input voltage produces and how far that voltage sits above the code step.',
    how: 'LSB = V_ref / 2^N, so the full-scale range is 0 to V_ref. Ideal SNR for a full-scale sine wave is 6.02 × N + 1.76 dB, and ENOB = (SINAD − 1.76) / 6.02. For an input voltage the code is floor(V_in / LSB), clamped to 0 … 2^N − 1, and the quantisation error is V_in − code × LSB. This tool models a unipolar, ideal converter only: offset, gain and nonlinearity errors, bipolar or differential ranges and the 1.76 dB term for non-sinusoidal signals are not modelled. Results are estimates.',
    howSteps: ['Enter the resolution in bits and the reference voltage.', 'Optionally enter a measured SINAD to get ENOB.', 'Optionally enter an input voltage to see the code and quantisation error.'],
    example: 'A 12-bit ADC with a 3.3 V reference has 4,096 codes and an LSB of 805.664 µV. The ideal SNR is 74 dB. A measured SINAD of 70 dB gives an ENOB of 11.34 bits. An input of 1 V reads as code 1,241, which is 170.898 µV (0.212 LSB) above that code step.',
    faqs: [
      ['What is the LSB of an ADC?', 'It is the input voltage change that moves the output by one code: V_ref divided by 2^N for an ideal unipolar converter.'],
      ['What does ENOB mean?', 'Effective number of bits is the resolution an ideal converter would need to match the measured SINAD. It is normally lower than the nominal bit count because of noise and distortion.'],
      ['Why 6.02 N + 1.76?', 'It is the ideal signal-to-quantisation-noise ratio for a full-scale sine wave. Other signals or less than full-scale input give a different figure.'],
      ['Does this handle bipolar or differential inputs?', 'No. The calculator is unipolar (0 to V_ref). For bipolar converters, use the span between the two limits as V_ref and interpret codes accordingly.'],
      ['Does the code match my real ADC?', 'Only for an ideal converter. Offset, gain error, INL/DNL and reference accuracy shift real codes, and some converters round instead of truncating.'],
    ],
  },
  related: ['ohms-law-calculator', 'number-base-converter', 'ieee-754-converter', 'resistor-color-code-calculator'],
},
{
  slug: 'ieee-754-converter', name: 'IEEE 754 Floating-Point Converter (FP16, BF16, FP32, FP64)', prio: 'P2', category: CAT, widget: 'calc',
  short: 'Convert decimal to IEEE 754 bits and hex, or hex to the exact decimal, for half, bfloat16, single and double.',
  metaDescription: 'IEEE 754 converter for binary16, bfloat16, binary32 and binary64: decimal to hex and sign/exponent/mantissa bits, hex to exact decimal, with rounding error.',
  keywords: ['ieee 754 converter', 'float32 fp16 bfloat16 bit representation', 'hex to float ieee 754 calculator', 'sign exponent mantissa bias'],
  fields: [
    SEL('mode', 'Mode', 'encode', [['encode', 'Decimal to bits'], ['decode', 'Hex to decimal']]),
    SEL('format', 'Format', 'binary32', [['binary16', 'binary16 (half, FP16)'], ['bfloat16', 'bfloat16 (BF16)'], ['binary32', 'binary32 (single, FP32)'], ['binary64', 'binary64 (double, FP64)']]),
    TX('value', 'Decimal value', '0.1', 'Used in "Decimal to bits". Also accepts 1e-5, -0, inf, -inf, NaN.'),
    TX('hex', 'Hex bits', '3DCCCCCD', 'Used in "Hex to decimal". 4 digits for 16-bit formats, 8 for FP32, 16 for FP64.'),
  ],
  content: {
    intro: 'IEEE 754 stores a number as a sign bit, a biased exponent and a mantissa (fraction). This tool shows those three bit fields and the hex word for half precision, bfloat16, single and double precision, converts a hex word back to the exact decimal it represents, and reports how far the stored value is from the decimal you typed.',
    how: 'The decimal text is read exactly (as a rational number, not through a double) and rounded to the nearest representable value, ties to even. A normal number equals (−1)^S × (1 + M / 2^m) × 2^(E − bias); an exponent field of 0 gives subnormals (M / 2^m) × 2^(1 − bias); an all-ones exponent gives infinity (zero mantissa) or NaN. The bias is 2^(e−1) − 1 for e exponent bits. The stored value is shown as an exact decimal expansion (very long expansions are truncated for display). Only the default quiet NaN is produced when encoding; NaN payloads are not preserved.',
    howSteps: ['Choose "Decimal to bits" or "Hex to decimal" and a format.', 'Type the decimal value or the hex word.', 'Read the hex, bit fields, exact stored value and rounding error.'],
    example: 'Encoding 0.1 as binary32 gives 0x3DCCCCCD, bit fields 0 | 01111011 | 10011001100110011001101, exponent field 123 against a bias of 127. The stored value is exactly 0.100000001490116119384765625, which is 1.490e-9 away from 0.1.',
    faqs: [
      ['Why is 0.1 not stored exactly?', 'Most decimal fractions have no finite binary expansion, so they are rounded to the nearest representable value. The tool shows the exact stored value and the error.'],
      ['How does bfloat16 differ from half precision?', 'bfloat16 keeps the 8-bit exponent of binary32 (wide range) with a 7-bit mantissa; binary16 has a 5-bit exponent and a 10-bit mantissa (narrower range, more precision).'],
      ['What rounding is used?', 'Round to nearest, ties to even, applied directly to the decimal you typed. Values beyond the largest finite number round to infinity.'],
      ['What are subnormal numbers?', 'Values smaller than the smallest normal number, stored with exponent field 0 and no implicit leading 1, giving gradual underflow with fewer significant bits.'],
      ['Are NaN payloads kept?', 'No. Encoding NaN gives the default quiet NaN. Decoding a hex word reports NaN regardless of its payload.'],
    ],
  },
  related: ['number-base-converter', 'adc-resolution-calculator', 'crc-calculator', 'hash-generator'],
},
{
  slug: 'pcb-trace-width-calculator', name: 'PCB Trace Width Calculator (IPC-2221)', prio: 'P2', category: CAT, widget: 'calc',
  short: 'Minimum PCB trace width for a current and temperature rise using the IPC-2221 formula, with DC resistance.',
  metaDescription: 'PCB trace width calculator using the IPC-2221 formula: minimum width in mil and mm for current, temperature rise, copper weight and layer, plus resistance.',
  keywords: ['pcb trace width calculator', 'ipc 2221 trace width current calculator', 'pcb trace resistance', 'copper weight temperature rise'],
  fields: [
    $('current', 'Current', 1, 'A'),
    $('rise', 'Allowed temperature rise', 10, '°C'),
    SEL('oz', 'Copper weight', '1', [['0.5', '0.5 oz'], ['1', '1 oz'], ['2', '2 oz'], ['3', '3 oz']]),
    SEL('layer', 'Layer', 'external', [['external', 'External'], ['internal', 'Internal']]),
    $('length', 'Trace length (optional)', 50, 'mm', 'Leave empty to skip resistance and voltage drop.'),
  ],
  content: {
    intro: 'This calculator estimates the minimum copper trace width needed to carry a given current with a chosen temperature rise, using the empirical IPC-2221 relation. It reports the width in mil and millimetres, the copper cross-section, and, if you give a trace length, an approximate DC resistance, voltage drop and power loss.',
    how: 'IPC-2221 gives I = k × ΔT^0.44 × A^0.725, with A the cross-section in square mils, ΔT the temperature rise in °C, and k = 0.048 for external and 0.024 for internal layers. The tool solves A = (I / (k × ΔT^0.44))^(1 / 0.725), then width = A / thickness with thickness = 1.378 mil per ounce of copper. Resistance uses R = ρL/A with ρ = 1.72e-8 Ω·m (copper near 20 °C), so it is approximate and ignores temperature rise. The IPC-2221 curves are conservative, cover roughly up to 35 A and 10-100 °C, and do not model planes, neighbouring traces or airflow; IPC-2152 is not implemented. This is an estimate, not design validation.',
    howSteps: ['Enter the current and the allowed temperature rise.', 'Pick the copper weight and whether the trace is on an external or internal layer.', 'Optionally enter the trace length for resistance and voltage drop.'],
    example: 'For 1 A, a 10 °C rise, 1 oz copper on an external layer, the required cross-section is 16.3 mil², giving a minimum width of 11.83 mil (0.3 mm). A 50 mm run of that trace has about 81.8 mΩ resistance, so 1 A drops about 81.8 mV.',
    faqs: [
      ['Why is the internal layer width larger?', 'Internal traces cannot shed heat to open air as readily, so the IPC-2221 constant is halved (0.024 versus 0.048) and a wider trace is needed.'],
      ['Is this the same as IPC-2152?', 'No. IPC-2152 is the newer standard based on more extensive testing and accounts for factors such as planes and board thickness. This tool implements the older IPC-2221 formula only.'],
      ['Does it include via resistance?', 'No. Only the trace itself is calculated. Vias need separate treatment based on their plating and barrel length.'],
      ['How accurate is the resistance?', 'It uses a fixed copper resistivity for about 20 °C and ignores heating, so real resistance at the allowed temperature rise is higher.'],
      ['Can I rely on this for safety-critical boards?', 'No. Treat it as a starting estimate and validate against the full standard, your fabricator\'s copper thickness and thermal testing.'],
    ],
  },
  related: ['ohms-law-calculator', 'resistor-color-code-calculator', 'adc-resolution-calculator', 'crc-calculator'],
},
{
  slug: 'crc-calculator', name: 'CRC Calculator (CRC-8, CRC-16 Modbus, CRC-32)', prio: 'P2', category: CAT, widget: 'calc',
  short: 'CRC-8, CRC-16/CCITT-FALSE, CRC-16/MODBUS and CRC-32 of ASCII text or hex bytes, with Modbus byte order.',
  metaDescription: 'CRC16 Modbus calculator that also computes CRC-8, CRC-16/CCITT-FALSE and CRC-32 for text or hex bytes, with hex output and Modbus low-byte-first order.',
  keywords: ['crc16 modbus calculator', 'crc8 crc16 ccitt crc32 hex calculator', 'modbus rtu frame checksum', 'crc32 checksum calculator'],
  fields: [
    SEL('algo', 'Algorithm', 'modbus', [['crc8', 'CRC-8 (poly 0x07)'], ['ccitt', 'CRC-16/CCITT-FALSE'], ['modbus', 'CRC-16/MODBUS'], ['crc32', 'CRC-32 (IEEE 802.3)']]),
    SEL('mode', 'Input as', 'ascii', [['ascii', 'ASCII text (UTF-8 bytes)'], ['hex', 'Hex bytes']]),
    TA('data', 'Data', '123456789', 'Hex bytes may be separated by spaces, commas or colons, e.g. 01 03 00 00 00 0A.'),
  ],
  content: {
    intro: 'A cyclic redundancy check detects corrupted data on links such as UART, RS-485 and Modbus RTU. Paste ASCII text or hex bytes, choose CRC-8, CRC-16/CCITT-FALSE, CRC-16/MODBUS or CRC-32, and get the checksum in hex and decimal. For Modbus the two bytes are also shown in transmission order, low byte first, together with the frame with its CRC appended.',
    how: 'Each algorithm is the standard parameter set (width, polynomial, initial value, input and output reflection, final XOR), computed bit by bit as polynomial division over GF(2). CRC-8: poly 0x07, init 0, no reflection. CCITT-FALSE: 0x1021, init 0xFFFF, no reflection. MODBUS: 0x8005 (reflected 0xA001), init 0xFFFF, reflected, no final XOR. CRC-32: 0x04C11DB7, init 0xFFFFFFFF, reflected, final XOR 0xFFFFFFFF. Text is encoded as UTF-8. Other CRC variants, custom polynomials and lookup-table code generation are not included.',
    howSteps: ['Select the algorithm and whether the input is text or hex bytes.', 'Enter the data.', 'Read the CRC; for Modbus, append the low byte then the high byte to the frame.'],
    example: 'The ASCII string 123456789 gives CRC-8 0xF4, CRC-16/CCITT-FALSE 0x29B1, CRC-16/MODBUS 0x4B37 and CRC-32 0xCBF43926, the standard check values. For Modbus the wire order is 37 4B. The frame 01 03 00 00 00 0A has CRC 0xCDC5 and is sent as 01 03 00 00 00 0A C5 CD.',
    faqs: [
      ['Why is the Modbus CRC sent low byte first?', 'Modbus RTU transmits the CRC-16 with the least significant byte first, so a CRC of 0x4B37 appears on the wire as 37 4B.'],
      ['What is the difference between CCITT-FALSE and other CRC-16 variants?', 'Variants differ in initial value, reflection and final XOR. CCITT-FALSE uses init 0xFFFF with no reflection; XMODEM, KERMIT and others give different results for the same data.'],
      ['Does the CRC cover the address byte in Modbus RTU?', 'Yes. The CRC is computed over the whole frame before the CRC bytes, starting at the slave address.'],
      ['Which characters are accepted as hex?', '0-9 and A-F in pairs, with optional spaces, commas, colons or 0x prefixes. An odd number of digits is rejected.'],
      ['Can a CRC prove data is authentic?', 'No. A CRC detects accidental errors only; it is not a security check, so use a keyed MAC or signature for authenticity.'],
    ],
  },
  sources: [{ label: 'Catalogue of parametrised CRC algorithms (RevEng)', url: 'https://reveng.sourceforge.io/crc-catalogue/' }],
  related: ['hash-generator', 'number-base-converter', 'ieee-754-converter', 'base64-encode-decode'],
},
];
