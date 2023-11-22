locals {
  cluster_inputs = {    
  "${var.public_ips[0]}" ={    
    private_ip                = "${var.private_ips[0]}"    
    public_ip                 = "${var.public_ips[0]}"              
    },
  "${var.public_ips[1]}" ={    
    private_ip                = "${var.private_ips[1]}"    
    public_ip                 = "${var.public_ips[1]}"         
    },
  "${var.public_ips[2]}" ={    
    private_ip                = "${var.private_ips[2]}"    
    public_ip                 = "${var.public_ips[2]}"       
    }, 
  "${var.public_ips[3]}" ={    
    private_ip                = "${var.private_ips[3]}"    
    public_ip                 = "${var.public_ips[3]}"      
    } 
  }
}

  