pipeline {
    agent any
    tools { 
        maven 'MAVEN_3_6_3' 
        jdk 'JDK_1_11' 
    }
    environment {
        FIREBASE_TOKEN = credentials('firebase-token') // Asegúrate de que el ID de la credencial sea 'firebase-token'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Instalar dependencias de Node.js
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Construir el proyecto Angular
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Ejecutar pruebas
                    sh 'npm test'
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    // Empaquetar los artefactos de construcción
                    sh 'zip -r dist.zip dist/'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Desplegar en Firebase
                    sh 'npm install -g firebase-tools' // Instalar Firebase CLI
                    sh 'firebase deploy --token $1//0hHZlEfzYbDOYCgYIARAAGBESNwF-L9Irk-uk_82ufwmw4qWDM68eOaj219IM_IxAHGE9FVLvsf0yVr5j-AGOR0QtYXbp93r9kZg' 
                }
            }
        }
    }
}
