resource "aws_instance" "vm" {
  ami                           = var.ami
  instance_type                 = var.instance_type
  subnet_id                     = var.subnet_id
  key_name                      = var.key_name
  vpc_security_group_ids        = [var.security_group_id]
  #iam_instance_profile          = var.iam_instance_profile
  associate_public_ip_address   = var.public_ip   
  user_data                     = var.user_data

  tags                      = {
      Name                  = "${var.tags}"  
  } 
  
  }

resource "aws_ebs_volume" "ebs" {
  availability_zone = aws_instance.vm.availability_zone
  size              = var.ebs_volume_size
  type              = "gp3"
  iops              = "3000"
  depends_on        = [aws_instance.vm]

  tags = {
    Name = "${var.tags}-volume"
  }
}

resource "aws_volume_attachment" "ebs_att" {
  device_name = "/dev/xvdf"
  volume_id   = aws_ebs_volume.ebs.id
  instance_id = aws_instance.vm.id
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.vm.id
  allocation_id = var.eip_allocation_id
}


  resource "null_resource" "example" {
  triggers = {
    instance_id = aws_instance.vm.id
  }

  connection {
    type     = "ssh"
    host     = var.elastic_ip
    user     = "ec2-user"  # Replace with your SSH username
    private_key = file("${var.key_name}.pem")  # Replace with the path to your SSH private key
  }

  provisioner "remote-exec" {
    inline = [
      "sleep 300",      
      "cat '${var.output_file_path}'"  # Replace with the path to the file you want to retrieve
    ]
  }
}
