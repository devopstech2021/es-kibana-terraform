#################### EC2 Details ###################
ami_id                      = "ami-0b1d960aa05c0ba45"
instance_type               = "t3.large"
key_name                    = "testserver"
security_group_id           = "sg-057691cfbcea8c39e"
                                   #Private-Subnet              #Private-Subnet             #Public-Subnet
subnet_id                   = ["subnet-04d64d060cff50bcf", "subnet-0e6570d3b1d276855", "subnet-0879843e4f7d4a120"]

                              #-MasterNode-# #-DataNode1-# #-DataNode2-# #-KibanaNode-#
private_ips                 = ["10.10.3.51", "10.10.4.52", "10.10.4.53", "10.10.2.50"]
ebs_volume_size             = ["30", "30", "30", "1"]   
region                      = "us-east-1"
elastic_server_tag          = ["Elastic-Master", "Elastic-Data1", "Elastic-Data2"]
kibana_server_tag           = "Kibana-Server"
ssl_key_name                = "key.pem"
ssl_cert_name               = "cert.pem" 



