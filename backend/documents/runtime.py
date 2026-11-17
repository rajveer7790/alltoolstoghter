"""Bounded subprocess execution. No shell, user-selected programs, or shared job folders."""
import os
import signal
import subprocess
from pathlib import Path


class ToolError(Exception):
    def __init__(self, message, status=422):
        self.message, self.status = message, status
        super().__init__(message)


def run(command: list[str], directory: Path, timeout: int = 180):
    env = {**os.environ, 'HOME': str(directory), 'TMPDIR': str(directory), 'OMP_NUM_THREADS': '2', 'OPENBLAS_NUM_THREADS': '2'}
    # Pipe to a temporary file instead of buffering arbitrary engine logs in RAM.
    with (directory / 'engine.log').open('w+b') as log:
        process = subprocess.Popen(command, cwd=directory, env=env, stdin=subprocess.DEVNULL,
                                   stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
        try:
            process.wait(timeout=timeout)
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGKILL)
            process.wait()
            raise ToolError('Processing exceeded the time limit. Try fewer pages.', 504)
        if process.returncode:
            # Never return engine logs: they may contain document text, passwords or paths.
            raise ToolError('The engine could not process this file. Check the format and options.')


def bundle(directory: Path, paths: list[Path], filename='documents.zip') -> Path:
    import zipfile
    if not paths:
        raise ToolError('The document did not contain any matching content.')
    output = directory / filename
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for index, path in enumerate(paths):
            resolved = path.resolve()
            if not resolved.is_relative_to(directory.resolve()) or path.is_symlink():
                raise ToolError('The engine returned an invalid output path.', 500)
            archive.write(path, f'{index + 1:03d}-{path.name}')
    return output


def one_or_bundle(directory: Path, paths: list[Path]) -> Path:
    return paths[0] if len(paths) == 1 else bundle(directory, paths)
