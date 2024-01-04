@Library('COSM-Jenkins-libs') _

pipeline {

    agent none

    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }

    stages {
        
        stage('Preparation') {
            agent { node { label 'master' } }
            steps {
                step([$class: 'WsCleanup'])
    
                checkout scm

                sh '''#!/bin/bash
                    git log -n 1 | grep "commit " | sed 's/commit //g' > currenntVersion
                '''
                    
                stash name:'workspace', includes:'**'
            }
        }

        stage('Build application') {
            agent { docker {
                    image 'node:latest'
                    // Run the container on the node specified at the
                    // top-level of the Pipeline, in the same workspace,
                    // rather than on a new node entirely:
                    reuseNode true
                    args '-u root'
                } }
            environment {
                CI = false          // do not treat warnings as errors
            }
            steps {
                unstash 'workspace'
                sh '''#!/bin/bash
                     echo "----------------------"
                    pwd
                    echo "----------------------"
                    ls -la
                    apt-get update && apt-get install -y openssl ca-certificates
                    echo "----------------------"
                    npm install
                    echo "----------------------"
                    npm run build
                '''
            }
        }
        
        stage('Deploy artifacts') {
            agent { 
                docker {
                    image 'docker-builder'
                    // Run the container on the node specified at the
                    // top-level of the Pipeline, in the same workspace,
                    // rather than on a new node entirely:
                    reuseNode true
                    args '-u root --net="main_bridge" -v /var/run/docker.sock:/var/run/docker.sock'
                } 
            }
            steps {                
                withCredentials([string(credentialsId: 'HCVault-token', variable: 'HC_VAULT_TOKEN')]) {
                    sh '''#!/bin/bash
                        set -e
                        set +x
 		                GIT_REVISION=`cat currenntVersion`
 		                export HC_VAULT_HOST="secrets.cloud.cosm-lab.science"
 		                sed -i 's|#!/bin/sh|#!/bin/bash|g' ./Docker/buildAndRun.sh
                        chmod +x ./Docker/buildAndRun.sh
 		                #./Docker/buildAndRun.sh preprod "$GIT_REVISION"
                    '''
               }
            }
         }
    }

    post {
        always {
            node ('master') {
                script {
                    env.GIT_URL = env.GIT_URL_1
                    notifyRocketChat(
                        channelName: 'system_notifications_sdl',
                        minioCredentialsId: 'jenkins-minio-credentials',
                        minioHostUrl: 'https://minio.cloud.cosm-lab.science'
                    )
                }
            }
        }
    }
 }