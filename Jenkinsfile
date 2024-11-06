pipeline {
    agent any

    tools {
        maven 'MAVEN_3_6_3'
        jdk 'JDK_1_11'
    }


    /*stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
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
        }*/

        stage('Package') {
            steps {
                script {
                    // Package the build artifacts
                    sh 'zip -r dist.zip dist/'
                }
            }
        }

       /* stage('Deploy') {
            steps {
                script {
                    // Deploy to Firebase
                    sh 'npm install -g firebase-tools' // Install Firebase CLI
                    sh 'firebase deploy --token $1//0hHZlEfzYbDOYCgYIARAAGBESNwF-L9Irk-uk_82ufwmw4qWDM68eOaj219IM_IxAHGE9FVLvsf0yVr5j-AGOR0QtYXbp93r9kZg' 
                }
            }
        }*/
    }
}
