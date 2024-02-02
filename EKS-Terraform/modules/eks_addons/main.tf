resource "aws_eks_addon" "eks_addon" {
  cluster_name      =  var.cluster_name
  addon_name        = var.addon_name
  addon_version     = var.addon_version
  resolve_conflicts_on_create = "OVERWRITE"
  resolve_conflicts_on_update = "OVERWRITE"  
}