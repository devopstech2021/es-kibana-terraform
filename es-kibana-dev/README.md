# es-kibana-terraform
Elasticsearch and kibana setup using with Terraform

To create AWS infrastructure using terraform template,

terraform init

terraform validate

terraform plan -var-file=input.tfvars

terraform apply -var-file=input.tfvars -auto-approve

To destroy AWS infrastructure using below command,

terraform destroy -var-file=input.tfvars -auto-approve
