FROM golang:1-bookworm AS pdfcpu
ARG PDFCPU_VERSION=v0.16.4
RUN go install github.com/pdfcpu/pdfcpu/cmd/pdfcpu@${PDFCPU_VERSION}

FROM python:3.12-slim-bookworm
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1 OMP_NUM_THREADS=2
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr tesseract-ocr-eng tesseract-ocr-hin tesseract-ocr-deu tesseract-ocr-fra tesseract-ocr-spa \
    ocrmypdf ghostscript qpdf poppler-utils fonts-dejavu-core fonts-liberation \
    libglib2.0-0 libgl1 && rm -rf /var/lib/apt/lists/*
COPY --from=pdfcpu /go/bin/pdfcpu /usr/local/bin/pdfcpu
WORKDIR /app
COPY backend/documents/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && useradd --uid 10001 --create-home worker
COPY backend/documents /app/backend/documents
COPY lib/documents/tools.json /app/lib/documents/tools.json
USER worker
EXPOSE 8790
HEALTHCHECK --interval=30s --timeout=5s CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8790/health',timeout=3)"
CMD ["uvicorn", "backend.documents.app:app", "--host", "0.0.0.0", "--port", "8790", "--no-access-log", "--no-proxy-headers"]
