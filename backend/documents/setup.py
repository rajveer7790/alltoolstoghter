"""Create a private local environment without embedding secrets in source control."""
from pathlib import Path
import secrets

folder = Path(__file__).resolve().parent
target = folder / '.env'
if target.exists():
    raise SystemExit('Existing .env preserved. Edit it directly to change domain settings.')
value = (folder / '.env.example').read_text().replace('ONLYOFFICE_JWT_SECRET=\n', 'ONLYOFFICE_JWT_SECRET=' + secrets.token_hex(32) + '\n')
target.write_text(value)
target.chmod(0o600)
print('Created backend/documents/.env with an internal editor secret. Set your domains before public deployment.')
