# =============================================================================
# Ajan Ana Sayfası — statik site, derleme adımı yok.
# nginx doğrudan dosyaları servis eder.
# =============================================================================
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Ajan Ana Sayfasi" \
      org.opencontainers.image.description="Uc avatarli ajan secim ana sayfasi" \
      org.opencontainers.image.licenses="UNLICENSED"

# Imajin varsayilan sunucu blogunu kendi konfigurasyonumuzla degistir
RUN rm -f /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf            /etc/nginx/conf.d/app.conf
COPY docker/security-headers.conf /etc/nginx/security-headers.conf

# Site dosyalari
COPY index.html /usr/share/nginx/html/index.html
COPY assets/    /usr/share/nginx/html/assets/
COPY data/      /usr/share/nginx/html/data/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
