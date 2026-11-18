# Oracle Always Free deployment notes — checked 18 November 2026

## Current allowance and suitability

The current [Oracle Always Free documentation](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm) lists **1,500 Ampere A1 OCPU-hours and 9,000 GB-hours/month for an Always Free tenancy**, equivalent to **2 OCPUs and 12 GB RAM total**, plus **200 GB total boot/block storage** in the home region. Do not assume the older 4-OCPU/24-GB figure applies to a new free tenancy. Paid-account allowances can differ; check the tenancy console and actual Always Free eligibility before provisioning.

Oracle offers a separate [$300/30-day trial](https://www.oracle.com/cloud/free/faq/). Trial credits are not a promise that an oversized VM remains free after the trial. Identity/card verification may be required. Capacity can be unavailable; idle instances can be reclaimed, and free services have no SLA/support entitlement. Do not create artificial load to evade reclamation. Keep backups and a redeployment procedure.

An A1 VM is a reasonable **initial low-traffic CPU conversion host** for the core documents/Gotenberg services, subject to the actual workload. It is not a promise that every optional AI model and Office workspace can run together. The AMD micro shape's 1 GB RAM is insufficient for this stack.

## Architecture and resource profile

Choose an Always Free-eligible Ubuntu ARM64 image with at most the tenancy's free A1 OCPU/RAM allocation. Build the supplied document Docker image on that machine. Gotenberg publishes ARM64 images; ONLYOFFICE also documents ARM64 support, but model wheels and each optional upstream image must be checked separately. Do not force `linux/amd64` emulation as a default on A1.

`compose.oracle.yml` applies conservative core limits:

| Service | CPU ceiling | RAM ceiling |
| --- | --- | --- |
| Document worker | 1 | 2 GiB |
| Gotenberg | 1 | 2 GiB |
| Existing web API | 0.5 | 512 MiB |
| Caddy | 0.25 | 256 MiB |

CPU ceilings can overlap; they are not reserved cores. Document concurrency is **one**. Host memory, build-time memory, Docker overhead, temporary files and optional services are additional. Start without model/Office/Stirling profiles, then measure real use. No GPU is included in this free CPU allowance.

The ARM64 GitHub Actions job uses the same overlay and real conversion smoke tests. That verifies the architecture/container path, not an Oracle tenancy, public DNS, throughput or 24/7 availability.

## Deploy the core stack

Install Docker Engine and Compose v2 using the [official Ubuntu instructions](https://docs.docker.com/engine/install/ubuntu/). Configure SSH access for your own address; allow inbound HTTPS/HTTP through the OCI network rules and host firewall. Keep the document engine, Gotenberg and internal workspace ports private.

```bash
git clone https://github.com/rajveer7790/alltoolstoghter.git
cd alltoolstoghter
python3 backend/documents/setup.py
```

Edit the generated, ignored `backend/documents/.env`: set the API domain and origin, and leave optional workspace/model URLs blank until those services are actually deployed. Keep the generated internal editor JWT secret private. Point `api.alltoolstogether.com` to this host; no database or third-party AI key is required for the core conversion stack.

```bash
docker compose --env-file backend/documents/.env -f backend/documents/compose.yml -f backend/documents/compose.oracle.yml up -d --build documents gotenberg web-api
curl --fail http://127.0.0.1:8790/health
docker compose --env-file backend/documents/.env -f backend/documents/compose.yml -f backend/documents/compose.oracle.yml --profile public up -d caddy
```

Verify the actual HTTPS capabilities endpoint and run sample uploads before enabling public server-tool indexing:

```bash
python3 backend/documents/check_ready.py https://api.alltoolstogether.com/api/documents
```

Only after required server pages are ready should the frontend be rebuilt with `NEXT_PUBLIC_DOCUMENTS_READY=true`. Successful conversion is not a layout-quality guarantee; read the measured benchmark report before advertising premium PDF-to-Word fidelity.

## Is there an Oracle MCP?

Yes: Oracle publishes [OCI Cloud MCP and other reference servers](https://github.com/oracle/mcp). Its general OCI server uses the OCI Python SDK. The repository explicitly describes these as reference/proof-of-concept implementations, not production-ready management tooling. They require appropriate OCI authentication and permissions. An MCP connection is not free hosting, and it is not required to deploy this repository with SSH/Docker. No Oracle account or management connection is provisioned by these files.

Sources: [Always Free resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm), [Free Tier FAQ](https://www.oracle.com/cloud/free/faq/), [Gotenberg images](https://gotenberg.dev/docs/getting-started/installation), [ONLYOFFICE ARM64](https://helpcenter.onlyoffice.com/docs/installation/community/docker/installing/install-arm64), [Oracle MCP](https://github.com/oracle/mcp).
