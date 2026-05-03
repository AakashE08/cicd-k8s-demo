#!/bin/bash
echo "================================================"
echo "  EXPERIMENT 1 PROOF — Aakash E | RA2311026010022"
echo "================================================"

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
curl -s http://98.86.229.154:30080/health | python3 -m json.tool

echo ""
echo "--- 7. LIVE APP RESPONSE ---"
curl -s http://98.86.229.154:30080 | grep -o '<title>.*</title>\|Aakash\|Version\|hostname'

echo ""
echo "--- 8. DOCKER IMAGE ON HOST ---"
docker images | grep cicd-demo-app

echo ""
echo "--- 9. JENKINS SERVICE STATUS ---"
sudo systemctl status jenkins | grep -E "Active|Main PID"

echo ""
echo "================================================"
echo "  ALL CHECKS COMPLETE ✅"
echo "================================================"
