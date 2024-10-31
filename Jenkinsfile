pipeline {
    agent any

    environment {
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-21' 
        PATH = "${env.JAVA_HOME}\\bin:${env.PATH}"
        FIREBASE_TOKEN = credentials('firebase-token')
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
                    sh 'firebase deploy --token $FIREBASE_TOKEN' // Deploy using the Firebase token
                }
            }
        }
    }
}
