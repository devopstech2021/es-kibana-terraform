# es-cluster setup using with terraform

Go To es-cluster-infra-provisioning directory and run below terraform commands for provision infrastructure,

cd es-cluster-infra-provisioning

terraform init

terraform apply -var-file=input.tfvars -auto-approve

once ec2 instances are launched successfully go to the es-cluster-configuration directory and run below terraform commands for configuring elasticsearch cluster and kibana setup.

cd ../es-cluster-configuration

terraform init

terraform apply -var-file=input.tfvars -auto-approve


To destroy the infrastructure, follow these steps:

cd es-cluster-configuration

terraform destroy -var-file=input.tfvars -auto-approve

cd ../es-cluster-infra-provisioning

terraform destroy -var-file=input.tfvars -auto-approve
