#!/bin/bash
sudo -i
yum update -y
mkdir /data
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
cd /etc/yum.repos.d/ 
cat <<EOF>> elasticsearch.repo 
[elasticsearch]
name=Elasticsearch repository for 8.x packages
baseurl=https://artifacts.elastic.co/packages/8.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
autorefresh=1
type=rpm-md
EOF
yum install --enablerepo=elasticsearch elasticsearch-8.10.4 -y
mkfs -t ext4 /dev/nvme1n1
echo '/dev/nvme1n1 /data ext4 defaults 0 0' >> /etc/fstab
mount -a
chown -R elasticsearch:elasticsearch /data

