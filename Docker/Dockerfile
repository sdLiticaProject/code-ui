FROM nginx:1.23.0


RUN set -x \
        && addgroup --system --gid 102 sdlitica-admin \
        && adduser --system --disabled-login --ingroup sdlitica-admin --no-create-home --home /nonexistent --gecos "sdCloud admin user" --shell /bin/false --uid 102 sdlitica-admin 


# ****************************************
#  Adding sdCloud WebUI source
# ****************************************

RUN mkdir -p /opt/sdlitica/SDLitica.WebUI \
        && chown -R sdlitica-admin:sdlitica-admin /opt/sdlitica/SDLitica.WebUI \
        && mkdir -p /var/secret \
        && chown -R sdlitica-admin:sdlitica-admin /var/secret \
        && mkdir -p /opt/cloud \
        && chown -R sdlitica-admin:sdlitica-admin /opt/cloud

COPY --chown=sdlitica-admin:sdlitica-admin . /opt/sdlitica/SDLitica.WebUI/
COPY ./Docker/default.conf /etc/nginx/conf.d/default.conf

COPY --chown=sdlitica-admin:sdlitica-admin token.file /var/secret/hc_vault_token
COPY --chown=sdlitica-admin:sdlitica-admin ./Docker/configResolver.sh ./Docker/resolveConfiguration.sh ./Docker/environment.template /opt/cloud/


CMD ["nginx", "-g", "daemon off;"]