import importlib.util
from pathlib import Path
import tempfile
import unittest

from PIL import Image
from pypdf import PdfWriter

spec = importlib.util.spec_from_file_location('quality', Path(__file__).resolve().parents[1] / 'run.py')
quality = importlib.util.module_from_spec(spec)
spec.loader.exec_module(quality)


class MeasurementTests(unittest.TestCase):
    def test_duplicate_tokens_reduce_precision(self):
        result = quality.text_metrics('invoice total 100', 'invoice total 100 invoice total 100')
        self.assertEqual(result['text_token_recall'], 1)
        self.assertEqual(result['text_token_precision'], .5)

    def test_no_reference_is_unknown_not_perfect(self):
        self.assertIsNone(quality.text_metrics('', '')['text_token_f1'])

    def test_blank_space_cannot_hide_missing_foreground(self):
        source = Image.new('L', (100, 100), 'white')
        for x in range(20, 80): source.putpixel((x, 50), 0)
        blank = Image.new('L', source.size, 'white')
        self.assertEqual(quality.image_metrics(source, blank)['foreground_f1'], 0)
        self.assertAlmostEqual(quality.image_metrics(source, source)['foreground_f1'], 1)

    def test_every_extra_page_is_measured(self):
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary)
            for name, count in [('source', 1), ('result', 2)]:
                writer = PdfWriter()
                for _ in range(count): writer.add_blank_page(width=300, height=400)
                writer.write(folder / (name + '.pdf'))
            result = quality.visual_metrics(folder / 'source.pdf', folder / 'result.pdf', folder)
            self.assertEqual(result['compared_pages'], 2)

    def test_manifest_has_100_distinct_inputs(self):
        rows = quality.MANIFEST['documents']
        self.assertEqual(len(rows), 100)
        self.assertEqual(len({row['sha256'] for row in rows}), 100)


if __name__ == '__main__': unittest.main()
