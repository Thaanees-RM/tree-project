pipeline {
    agent any

    environment {
        // If you use Node via Jenkins global tool, define it here
         PATH = "${tool 'NodeJS_20'}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/uvexzon-dev/Tree_Planting.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Security Scan - Trivy') {
            steps {
                dir('Client') {
                    sh 'docker run --rm -v $(pwd):/src -w /src aquasec/trivy:latest fs --exit-code 1 --severity HIGH,CRITICAL .'
                }
            }
        }

        stage('Static Code Analysis - SonarQube') {
            environment {
                SONARQUBE_SCANNER_HOME = tool 'SonarScanner'
            }
            steps {
                dir('Client') {
                    sh "${SONARQUBE_SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('Client') {
                    script {
                        def imageName = 'tree-planting-app:latest'
                        sh "docker build -t ${imageName} ."
                    }
                }
            }
        }

        stage('Archive Production Build') {
            steps {
                dir('Client/dist') {
                    archiveArtifacts artifacts: '**', fingerprint: true
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Kubernetes deployment step goes here (optional)'
            }
        }
    }
}
