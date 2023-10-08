pipeline {
        agent { node { label 'sdCloud_docker_deploy' } }
        triggers {
            pollSCM('H/3 * * * *')
        }

        stages {
            stage('Preparation') {
                steps {
    		step([$class: 'WsCleanup'])
     	    	checkout scm
    	    }
            }

            stage('Build application') {
    	    steps {
     	    	sh '''#!/bin/bash
                            npm install
                            npm run build
                '''
    	    }
            }

            stage('Deploy artifacts') {
                steps {
    	    	withCredentials([string(credentialsId: 'sdcloud_vault_token', variable: 'HC_VAULT_TOKEN')]) {

                        sh '''#!/bin/bash
                            set -e
    			DEPLOY_PREFIX="preprod"
     		        GIT_REVISION=`git log -n 1 | grep "commit " | sed 's/commit //g'`
     		        ./Docker/buildAndRun.sh $DEPLOY_PREFIX "$GIT_REVISION"
                        '''
    		}
                 }
             }
        }

        post {
            always {
                script {
                statusColor = [SUCCESS: "green",
                               UNSTABLE: "yellow",
                               FAILURE: "red",
                               ABORTED: "pink"]

                logLines = currentBuild.rawBuild.getLog(1000);
                writeFile(file: 'build_log.txt', text: logLines.join('\n'))

                minio bucket: 'build-artifacts',
                  credentialsId: 'jenkins-minio-credentials',
                  excludes: '',
                  includes: 'build_log.txt',
                  host: 'https://minio.cloud.sdcloud.io',
                  targetFolder: "${env.JOB_BASE_NAME}/${env.BUILD_NUMBER}"

                rocketSend channel: 'system_notifications_crossroads',
                        message: 'Build result for **' + currentBuild.fullProjectName + '** with id **' + currentBuild.id + '**',
                        rawMessage: true,
                        attachments: [[
                            title: 'Job build log',
                            color: statusColor[currentBuild.result],
                            text: "**Status**: " + currentBuild.result + "   |   **Build time**: "   + currentBuild.durationString + "   |   **Changesets**: " + currentBuild.changeSets,
                            titleLinkDownload: true,
                            titleLink: "https://minio.cloud.sdcloud.io/build-artifacts/${env.JOB_BASE_NAME}/${env.BUILD_NUMBER}/build_log.txt",
                            ]]
                }
            }
        }
        }

