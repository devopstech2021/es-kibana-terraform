#!/bin/bash
sleep 480
sed -i '/path.data/d' /etc/elasticsearch/elasticsearch.yml
IP_ADDR=$(hostname -I | awk '{print $1}')
HOST_NAME=$(uname -n)
echo -e "cluster.name: es \npath.data: /data \nnode.name: $HOST_NAME \nnetwork.host: $IP_ADDR \nhttp.port: 9200 \nnode.roles: [ data, master ]" >> /etc/elasticsearch/elasticsearch.yml
systemctl daemon-reload
systemctl enable elasticsearch.service
systemctl start elasticsearch.service
