FROM nginx:1.23.0


RUN set -x \
        && addgroup --system --gid 102 sdcloud-admin \
        && adduser --system --disabled-login --ingroup sdcloud-admin --no-create-home --home /nonexistent --gecos "sdCloud admin user" --shell /bin/false --uid 102 sdcloud-admin 


# ****************************************
#  Adding sdCloud WebUI source
# ****************************************

RUN mkdir -p /opt/sdcloud/SDCloud.WebUI \
        && chown -R sdcloud-admin:sdcloud-admin /opt/sdcloud/SDCloud.WebUI \
        && mkdir -p /var/secret \
        && chown -R sdcloud-admin:sdcloud-admin /var/secret \
        && mkdir -p /opt/cloud \
        && chown -R sdcloud-admin:sdcloud-admin /opt/cloud

COPY --chown=sdcloud-admin:sdcloud-admin . /opt/sdcloud/SDCloud.WebUI/
COPY ./Docker/default.conf /etc/nginx/conf.d/default.conf

COPY --chown=sdcloud-admin:sdcloud-admin token.file /var/secret/hc_vault_token
COPY --chown=sdcloud-admin:sdcloud-admin ./Docker/configResolver.sh ./Docker/resolveConfiguration.sh ./Docker/environment.template /opt/cloud/

ENV SDCloudRabbitMQHost=rabbitmq
ENV SDCloudRabbitMQPort=5672
ENV SDCloudRabbitMQVHost='/'
ENV SDCloudRabbitMQLogin='guest'
ENV SDCloudRabbitMQPassword='guest'


CMD ["nginx", "-g", "daemon off;"]