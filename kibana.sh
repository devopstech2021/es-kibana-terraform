#!/bin/bash
sudo -i
yum update -y
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch 
cat <<EOF>> /etc/yum.repos.d/kibana.repo 
[kibana-8.x]
name=Kibana repository for 8.x packages
baseurl=https://artifacts.elastic.co/packages/8.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
EOF
yum install kibana-8.10.4 -y
systemctl daemon-reload
systemctl enable kibana.service
systemctl start kibana.service
cat <<EOF>> /etc/kibana/kibana.yml 
server.host: "0.0.0.0"
EOF
systemctl restart kibana
sleep 40
cd /usr/share/kibana/bin
./kibana-verification-code >> /home/ec2-user/kibana_output.txt
