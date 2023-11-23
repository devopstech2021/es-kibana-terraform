locals {
  cluster_inputs = {    
  "${var.private_ips[0]}" ={    
    private_ip                = "${var.private_ips[0]}"    
    },
  "${var.private_ips[1]}" ={    
    private_ip                = "${var.private_ips[1]}"    
    },
  "${var.private_ips[2]}" ={    
    private_ip                = "${var.private_ips[2]}"    
    }, 
  "${var.private_ips[3]}" ={    
    private_ip                = "${var.private_ips[3]}"         
    } 
  }
}

  