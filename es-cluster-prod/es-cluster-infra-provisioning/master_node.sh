#!/bin/bash
NODE1_IP=${data_node1_pvt_ip}
NODE2_IP=${data_node2_pvt_ip}
KIBANA_IP=${kibana_node_pvt_ip}
PRIVATE_KEY=${private_key}
systemctl daemon-reload
systemctl enable elasticsearch.service
IP_ADDR=$(hostname -I | awk '{print $1}')
HOST_NAME=$(uname -n)
sed -i '/path.data/d' /etc/elasticsearch/elasticsearch.yml
sed -i '/http.host/d' /etc/elasticsearch/elasticsearch.yml
echo -e "cluster.name: es \npath.data: /data \nnode.name: $HOST_NAME \nnetwork.host: $IP_ADDR \nhttp.port: 9200 \nnode.roles: [ data, master ] \nhttp.host: 0.0.0.0" >> /etc/elasticsearch/elasticsearch.yml
systemctl start elasticsearch.service
sleep 80
/usr/share/elasticsearch/bin/elasticsearch-reset-password auto -u elastic --batch >> /home/ec2-user/elastic_pass.txt
/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s node >> /home/ec2-user/node_token.txt
/usr/share/elasticsearch/bin/elasticsearch-reset-password auto -u kibana_system --batch >> /home/ec2-user/kibana_pass.txt
sleep 180
NODE_TOKEN=$(cat /home/ec2-user/node_token.txt)
chmod 400 /home/ec2-user/$PRIVATE_KEY
ssh -i "/home/ec2-user/$PRIVATE_KEY" -o StrictHostKeyChecking=no ec2-user@$NODE1_IP "yes | sudo /usr/share/elasticsearch/bin/elasticsearch-reconfigure-node --enrollment-token $NODE_TOKEN"
ssh -i "/home/ec2-user/$PRIVATE_KEY" -o StrictHostKeyChecking=no ec2-user@$NODE2_IP "yes | sudo /usr/share/elasticsearch/bin/elasticsearch-reconfigure-node --enrollment-token $NODE_TOKEN"
rsync -avrzh -e "ssh -i /home/ec2-user/$PRIVATE_KEY -o 'StrictHostKeyChecking no'" --progress /home/ec2-user/kibana_pass.txt ec2-user@$KIBANA_IP:/home/ec2-user/
echo "========================================================================================================"
cat /home/ec2-user/elastic_pass.txt
cat /home/ec2-user/kibana_pass.txt
cat /home/ec2-user/node_token.txt
echo "========================================================================================================"