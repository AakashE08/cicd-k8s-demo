pipeline {
    agent any
    environment {
        DOCKER_HUB_USERNAME = 'aakash888'
        IMAGE_NAME          = "${DOCKER_HUB_USERNAME}/cicd-demo-app"
        IMAGE_TAG           = "${BUILD_NUMBER}"
        FULL_IMAGE          = "${IMAGE_NAME}:${IMAGE_TAG}"
        KUBECONFIG          = '/var/lib/jenkins/.kube/config'
        MASTER_PRIVATE_IP   = '172.31.45.159'
    }
    stages {
        stage('Fix Kubeconfig') {
            steps {
                sh """
                    sudo sed -i "s|https://.*:6443|https://${MASTER_PRIVATE_IP}:6443|" ${KUBECONFIG}
                    sudo sed -i '/certificate-authority-data/d' ${KUBECONFIG}
                    grep -q 'insecure-skip-tls-verify' ${KUBECONFIG} || \
                        sudo sed -i '/server:/a\\    insecure-skip-tls-verify: true' ${KUBECONFIG}
                    kubectl get nodes --kubeconfig=${KUBECONFIG}
                """
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/AakashE08/cicd-k8s-demo.git'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${FULL_IMAGE} ."
                sh "docker tag ${FULL_IMAGE} ${IMAGE_NAME}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh "docker push ${FULL_IMAGE}"
                    sh "docker push ${IMAGE_NAME}:latest"
                    sh 'docker logout'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl apply --validate=false -f k8s/deployment.yaml --kubeconfig=${KUBECONFIG}
                    kubectl apply --validate=false -f k8s/service.yaml --kubeconfig=${KUBECONFIG}
                    kubectl set image deployment/cicd-demo-app \
                        cicd-demo-app=${FULL_IMAGE} --kubeconfig=${KUBECONFIG}
                    kubectl rollout status deployment/cicd-demo-app \
                        --timeout=300s --kubeconfig=${KUBECONFIG}
                """
            }
        }
        stage('Verify') {
            steps {
                sh """
                    kubectl get pods -l app=cicd-demo-app --kubeconfig=${KUBECONFIG}
                    kubectl get svc cicd-demo-service --kubeconfig=${KUBECONFIG}
                """
            }
        }
    }
    post {
        success {
            echo "SUCCESS! App is live at http://98.86.229.154:30080"
        }
        failure {
            sh "kubectl rollout undo deployment/cicd-demo-app --kubeconfig=${KUBECONFIG} || true"
        }
        always {
            sh 'docker rmi ${FULL_IMAGE} || true'
            cleanWs()
        }
    }
}
