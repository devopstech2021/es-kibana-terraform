cluster_name                    = "demo_eks"
tag                             = "demo_dev"
subnet_ids                      = ["subnet-04d64d060cff50bcf", "subnet-0e6570d3b1d276855"]
endpoint_private_access         = true
endpoint_public_access          = false
instance_type                   = "t3.small"
disk_size                       = 20
source_security_group_ids       = ["sg-092cd116dd477fcee"]
node_ssh_key_name               = "testserver"
desired_size                    = 2
max_size                        = 2
min_size                        = 2
eks_cluster_role_arn            = "arn:aws:iam::906448665985:role/eksClusterRole"
worker_node_role_arn            = "arn:aws:iam::906448665985:role/EKSWorkernoderole"
cluster_log_types               = ["api", "scheduler"]
cluster_security_group_ids      = "sg-092cd116dd477fcee"
addon_name                      = ["kube-proxy", "coredns", "vpc-cni"]
addon_version                   = ["v1.28.2-eksbuild.2", "v1.10.1-eksbuild.4", "v1.15.1-eksbuild.1"]
