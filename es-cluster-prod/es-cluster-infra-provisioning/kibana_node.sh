#!/bin/bash
NODE1_IP=${master_node_pvt_ip}
NODE2_IP=${data_node1_pvt_ip}
NODE3_IP=${data_node2_pvt_ip}
mkdir /etc/kibana/certs
sleep 600
mv /home/ec2-user/cert.pem /etc/kibana/certs
mv /home/ec2-user/key.pem /etc/kibana/certs
chown -R kibana:kibana /etc/kibana/certs
KIBANA_PASS_LINE=$(cat /home/ec2-user/kibana_pass.txt)
KIBANA_PASSWORD=$(echo "$KIBANA_PASS_LINE" | awk -F 'New value: ' '{print $2}' | tr -d '"' | tr -d '[:space:]')
echo "$KIBANA_PASSWORD"
public_ip=$(curl icanhazip.com)
cat <<EOF>> /etc/kibana/kibana.yml 
server.host: "0.0.0.0"
server.port: 5601
server.publicBaseUrl: "https://$public_ip:5601/"
elasticsearch.hosts: ["https://$NODE1_IP:9200","https://$NODE2_IP:9200","https://$NODE3_IP:9200"]
elasticsearch.username: "kibana_system"
elasticsearch.password: "$KIBANA_PASSWORD"
server.ssl.enabled: true
server.ssl.certificate: /etc/kibana/certs/cert.pem
server.ssl.key: /etc/kibana/certs/key.pem
elasticsearch.ssl.verificationMode: none
EOF
systemctl restart kibana