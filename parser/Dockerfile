FROM jenkins/jenkins:lts

RUN jenkins-plugin-cli --plugins workflow-aggregator git docker-workflow

COPY jenkins_home/custom_config.xml /var/jenkins_home/config.xml

COPY scripts/init.groovy.d /usr/share/jenkins/ref/init.groovy.d/

EXPOSE 8080
EXPOSE 50000

