variable "subscription_id" {
  type        = string
  description = "Azure subscription ID"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "centralindia"
}

variable "environment" {
  type        = string
  description = "Environment name: thaanees, qa, production"
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "aks_name" {
  type        = string
  description = "AKS cluster name"
}

variable "acr_name_prefix" {
  type        = string
  description = "ACR name prefix (alphanumeric)"
  default     = "treeplant"
}

variable "node_count" {
  type        = number
  description = "AKS node count"
  default     = 1
}

variable "vm_size" {
  type        = string
  description = "AKS VM size"
  default     = "Standard_B2s"
}

variable "monthly_budget_amount" {
  type        = number
  description = "Monthly budget in USD"
  default     = 200
}

variable "budget_alert_emails" {
  type        = list(string)
  description = "Email recipients for budget alerts"
  default     = []
}
