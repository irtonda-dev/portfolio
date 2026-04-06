pipeline {
    agent any

    environment {
        IMAGE_NAME = "portuga/portfolio"
        IMAGE_TAG  = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}"
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'svc-dockerhub') {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy stage — wired up once docker-compose is on the server.'
                // SSH into server and run:
                // docker-compose pull
                // docker-compose up -d
            }
        }

    }

    post {
        success {
            echo "Build ${env.BUILD_NUMBER} completed — ${IMAGE_NAME}:${IMAGE_TAG} is live."
        }
        failure {
            echo "Build ${env.BUILD_NUMBER} failed — check the logs above."
        }
    }
}
