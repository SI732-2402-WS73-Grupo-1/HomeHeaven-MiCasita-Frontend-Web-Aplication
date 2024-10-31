pipeline {
    agent any

    tools {
        maven 'MAVEN_3_6_3'
        jdk 'JDK_1_11'
    }

    environment {
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-11' // Set this to your Java 11 installation path
        PATH = "${env.JAVA_HOME}\\bin:${env.PATH}"
        FIREBASE_TOKEN = credentials('firebase-token') // Ensure the credential ID is 'firebase-token'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the Angular project
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run tests
                    sh 'npm test'
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    // Package the build artifacts
                    sh 'zip -r dist.zip dist/'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy to Firebase
                    sh 'npm install -g firebase-tools' // Install Firebase CLI
                    sh 'firebase deploy --token $1//0hHZlEfzYbDOYCgYIARAAGBESNwF-L9Irk-uk_82ufwmw4qWDM68eOaj219IM_IxAHGE9FVLvsf0yVr5j-AGOR0QtYXbp93r9kZg' 
                }
            }
        }
    }
}
