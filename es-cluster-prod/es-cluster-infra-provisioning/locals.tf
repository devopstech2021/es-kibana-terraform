locals {
  cluster_inputs = {    
  "${var.elastic_server_tag[0]}"   ={    
    tag                         = "${var.elastic_server_tag[0]}"
    user_data                   = file("${path.module}/elastic_install.sh")
    ebs_volume_size             = "${var.ebs_volume_size[0]}" 
    subnet_id                   = "${var.subnet_id[0]}"
    private_ip                  = "${var.private_ips[0]}"
    script_file                 =  data.template_file.master_node.rendered  
  }, 
  "${var.elastic_server_tag[1]}" ={    
    tag                       = "${var.elastic_server_tag[1]}"
    user_data                 = file("${path.module}/elastic_install.sh")
    ebs_volume_size           = "${var.ebs_volume_size[1]}" 
    subnet_id                 = "${var.subnet_id[1]}"
    private_ip                = "${var.private_ips[1]}"
    script_file               =  data.template_file.data_node.rendered        
  },
  "${var.elastic_server_tag[2]}" ={    
    tag                       = "${var.elastic_server_tag[2]}"
    user_data                 = file("${path.module}/elastic_install.sh")
    ebs_volume_size           = "${var.ebs_volume_size[2]}" 
    subnet_id                 = "${var.subnet_id[1]}"
    private_ip                = "${var.private_ips[2]}"
    script_file                 =  data.template_file.data_node.rendered         
  },
   "${var.kibana_server_tag }" ={ 
    tag                       = "${var.kibana_server_tag}"
    user_data                 = file("${path.module}/kibana_install.sh")
    ebs_volume_size           = "${var.ebs_volume_size[3]}" 
    subnet_id                 = "${var.subnet_id[2]}"
    private_ip                = "${var.private_ips[3]}"
    script_file               =  data.template_file.kibana_node.rendered
    }
  }
}

  