#################### EC2 Details ###################
ami_id                      = "ami-01bc990364452ab3e"
instance_type               = "t3.medium"
key_name                    = "testserver"
security_group_id           = "sg-0890ef3a3242f01cd"
# enter subnet id's in the list 1st for elastic search & 2nd for kibana
subnet_id                   = ["subnet-054327b091e0adc75", "subnet-0879843e4f7d4a120"]
# enter ebs volume size in the list 1st for elastic search & 2nd for kibana 
ebs_volume_size             = ["30","1"]  
associate_public_ip         = "true"            # "true" or "false"
#iam_role_name               = "ecsInstanceRole" # iam role for ec2
# enter eip allocaton id's in the list 1st for elastic search & 2nd for kibana
eip_allocation_ids          = ["eipalloc-08da4be62fed552b9", "eipalloc-0a7a673263a2f52fc"]
# enter elastic ips corresponding to allocaton id's in the list above list & 1st for elastic search & 2nd for kibana
elastic_ip                  = ["3.220.16.77", "35.172.95.248"]    
region                      = "us-east-1"
elastic_server_tag          = "Elastic-Server"
kibana_server_tag           = "Kibana-Server"



