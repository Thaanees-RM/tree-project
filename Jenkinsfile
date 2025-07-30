pipeline {
    agent any

    tools {
        nodejs 'NodeJS_20'  // NodeJS configured in Jenkins global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'thaanees',
                    url: 'https://github.com/uvexzon-dev/Tree_Planting.git',
                    credentialsId: 'github-token2'
            }
        }

        stage('Build Client') {
            steps {
                dir('Client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                       // or 'npm test' or any backend-specific commands
                }
            }
        }

        stage('Build Admin') {
            steps {
                dir('admin') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'Client/dist/**', fingerprint: true
                archiveArtifacts artifacts: 'backend/**', fingerprint: true
                archiveArtifacts artifacts: 'admin/dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
