#!/bin/bash
sudo -i
yum update -y
mkdir /data
mkfs -t ext4 /dev/nvme1n1
echo '/dev/nvme1n1 /data ext4 defaults 0 0' >> /etc/fstab
mount -a
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
systemctl daemon-reload
systemctl enable elasticsearch.service
systemctl start elasticsearch.service
systemctl status elasticsearch.service
chown -R elasticsearch:elasticsearch /data
sed -i 's|^path.data: /var/lib/elasticsearch|path.data: /data|' /etc/elasticsearch/elasticsearch.yml
systemctl restart elasticsearch.service
/usr/share/elasticsearch/bin/elasticsearch-reset-password auto -u elastic --batch >> /home/ec2-user/elastic_output.txt
/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana >> /home/ec2-user/elastic_output.txt