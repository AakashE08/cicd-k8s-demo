#!/bin/bash
echo "================================================"
echo "  EXPERIMENT 1 PROOF — Aakash E | RA2311026010022"
echo "================================================"

# Hardcoded Worker-1 public IP (update if changed after restart)
WORKER_IP="54.165.36.61"

echo ""
echo "--- 0. AUTO-FIXING KUBECONFIG ---"
MASTER_PRIVATE_IP="172.31.45.159"
sudo sed -i "s|https://.*:6443|https://${MASTER_PRIVATE_IP}:6443|" /var/lib/jenkins/.kube/config
sudo sed -i '/certificate-authority-data/d' /var/lib/jenkins/.kube/config
grep -q 'insecure-skip-tls-verify' /var/lib/jenkins/.kube/config || \
  sudo sed -i '/server:/a\    insecure-skip-tls-verify: true' /var/lib/jenkins/.kube/config
echo "Kubeconfig fixed!"

echo ""
echo "--- 1. KUBERNETES CLUSTER STATUS ---"
kubectl get nodes -o wide --kubeconfig=/var/lib/jenkins/.kube/config

echo ""
echo "--- 2. RUNNING PODS ---"
kubectl get pods -l app=cicd-demo-app -o wide --kubeconfig=/var/lib/jenkins/.kube/config

echo ""
echo "--- 3. SERVICE & PORT ---"
kubectl get svc cicd-demo-service --kubeconfig=/var/lib/jenkins/.kube/config

echo ""
echo "--- 4. DEPLOYMENT DETAILS ---"
kubectl get deployment cicd-demo-app --kubeconfig=/var/lib/jenkins/.kube/config

echo ""
echo "--- 5. ROLLOUT HISTORY (Jenkins builds) ---"
kubectl rollout history deployment/cicd-demo-app --kubeconfig=/var/lib/jenkins/.kube/config

echo ""
echo "--- 6. APP HEALTH CHECK ---"
echo "Using Worker IP: $WORKER_IP"
curl -s http://${WORKER_IP}:30080/health | python3 -m json.tool

echo ""
echo "--- 7. LIVE APP ---"
curl -s http://${WORKER_IP}:30080 | grep -o 'Aakash E\|RA2311026010022\|CI.CD Pipeline\|healthy'

echo ""
echo "--- 8. DOCKER IMAGE ---"
docker images | grep cicd-demo-app

echo ""
echo "--- 9. JENKINS STATUS ---"
sudo systemctl status jenkins | grep -E "Active|Main PID"

echo ""
echo "================================================"
echo "  ALL CHECKS COMPLETE"
echo "================================================"
