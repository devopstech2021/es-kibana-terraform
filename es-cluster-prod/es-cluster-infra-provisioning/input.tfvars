#################### EC2 Details ###################
ami_id                      = "ami-0b1d960aa05c0ba45"
instance_type               = "t3.large"
key_name                    = "testserver"
security_group_id           = "sg-0890ef3a3242f01cd"
subnet_id                   = ["subnet-054327b091e0adc75", "subnet-0879843e4f7d4a120"]
associate_public_ip         = "true"            # "true" or "false"
#iam_role_name               = "ecsInstanceRole" # iam role for ecs
                                #-MasterNode-#                  #-DataNode1-#               #-DataNode2-#                   #-KibanaNode-#
eip_allocation_ids          = ["eipalloc-08da4be62fed552b9", "eipalloc-0a1963e52a6946c90", "eipalloc-0100a5015b977dafb", "eipalloc-0a7a673263a2f52fc"]
elastic_ip                  = ["3.220.16.77", "44.212.239.132", "54.80.59.114", "35.172.95.248"]
private_ips                 = ["10.10.1.51", "10.10.2.52", "10.10.2.53", "10.10.1.50"]
ebs_volume_size             = ["30", "30", "30", "1"]   
region                      = "us-east-1"
elastic_server_tag          = ["Elastic-Master", "Elastic-Data1", "Elastic-Data2"]
kibana_server_tag           = "Kibana-Server"
ssl_key_name                = "key.pem"
ssl_cert_name               = "cert.pem" 



