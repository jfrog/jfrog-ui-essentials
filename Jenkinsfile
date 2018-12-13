pipeline {
    agent any

    
stages{
    stage('Version verification and npm gulp build'){
        steps {
            echo '            * * * Version verification and npm gulp build * * *'
            build job: 'ui-essentials-ci-cd-pipeline-builder',
                parameters: [string(name: 'VERSION_NAME', value: "${VERSION_NAME}"),
                    string(name: 'GITHUB_BRANCH', value: "${GITHUB_BRANCH}")]
        }
    }
    stage('Build jfrog styleguide'){
        steps {
            echo '            * * * Build jfrog styleguide * * *'
            build job: 'DevOps/Jenkins/build-jfrog-styleguide', 
                parameters: [string(name: 'GITHUB_BRANCH', value:  "${GITHUB_BRANCH}")]
        }
    }
    stage('Deploy jfrog styleguide'){
        steps {
            echo '            * * * Deploy jfrog styleguide * * *'
            build job: ' ', 
                parameters: [string(name: '', value:  "${}")]
        }
    }
    stage('ui essentials test'){
        steps {
            echo '            * * * ui essentials test * * *'
            build job: ' ', 
                parameters: [string(name: '', value:  "${}")]
        }
    }
}
        