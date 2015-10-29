OSTYPE = $(shell uname)

ifeq ($(OSTYPE), Linux)

RM                          = sudo rm

DOCKER_STOP                 = sudo docker stop
DOCKER_PS                   = sudo docker ps
DOCKER_RM                   = sudo docker rm
DOCKER_RMI                  = sudo docker rmi

DOCKER_RUN                  = sudo docker run
DOCKER_BUILD                = sudo docker build
DOCKER_PUSH                 = sudo docker push

else
ifeq ($(OSTYPE), Darwin)

RM                          = rm

DOCKER_STOP                 = docker stop
DOCKER_PS                   = docker ps
DOCKER_RM                   = docker rm
DOCKER_RMI                  = docker rmi

DOCKER_RUN                  = docker run
DOCKER_BUILD                = docker build
DOCKER_PUSH                 = docker push

endif
endif

NAME                 = lol-stats-webapp

DOCKER_IMAGE         = ivanmicai/lol-stats-webapp

DOCKER_NAME          = --name $(NAME)
DOCKER_VOLUME        = -v `pwd`:/app
DOCKER_PORT          = -p 9000:9000
DOCKER_LIVERELOAD    = -p 35729:35729


.PHONY: image-build image-push image-run image-command image-destroy run command bower-update npm-update

image-build:
	@$(RM) -rf bower_components
	@$(RM) -rf node_modules
	@$(DOCKER_BUILD) -t $(DOCKER_IMAGE) --no-cache .

image-push:
	$(DOCKER_PUSH) $(DOCKER_IMAGE)

image-destroy:
	$(DOCKER_RMI) $(DOCKER_IMAGE)

run:
	@$(DOCKER_RUN) --rm -t -i $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_PORT) $(DOCKER_LIVERELOAD) $(DOCKER_IMAGE) grunt serve

command:
	@$(DOCKER_RUN) --rm -t -i $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_IMAGE) /bin/sh

bower-update:
	@$(DOCKER_RUN) --rm -t -i $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_IMAGE) /bin/sh -c 'bower install --allow-root'

npm-update:
	@$(DOCKER_RUN) --rm -t -i $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_IMAGE) /bin/sh -c 'npm install'
