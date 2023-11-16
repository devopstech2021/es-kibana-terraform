locals {
  ec2_inputs = {    
  "${var.elastic_server_tag}" ={    
    tag                       = "${var.elastic_server_tag}"
    user_data                 = file("${path.module}/elastic.sh") 
    subnet_id                 = "${var.subnet_id[0]}"
    ebs_volume_size           = "${var.ebs_volume_size[0]}"
    eip_allocation_id         = "${var.eip_allocation_ids[0]}"
    elastic_ip                = "${var.elastic_ip[0]}"
    output_file_path          = "/home/ec2-user/elastic_output.txt"              
     
  }, 
  "${var.kibana_server_tag }" ={ 
    tag                       = "${var.kibana_server_tag}"
    user_data                 = file("${path.module}/kibana.sh")
    subnet_id                 = "${var.subnet_id[1]}"
    ebs_volume_size           = "${var.ebs_volume_size[1]}"
    eip_allocation_id         = "${var.eip_allocation_ids[1]}"
    elastic_ip                = "${var.elastic_ip[1]}"
    output_file_path          = "/home/ec2-user/kibana_output.txt" 
    }  
  }
}

  