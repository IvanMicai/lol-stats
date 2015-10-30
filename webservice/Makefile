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

NAME                 = lol-stats-webservice

DOCKER_IMAGE         = ivanmicai/lol-stats-webservice

DOCKER_NAME          = --name $(NAME)
DOCKER_VOLUME        = -v `pwd`:/app
DOCKER_MONGO_LINK    = --link lol-stats-mongoservice:lol-stats-mongoservice
DOCKER_PORT          = -p 3000:3000


#DEPENDENCES
MONGO_NAME                 = lol-stats-mongoservice
DOCKER_MONGO_IMAGE         = ivanmicai/lol-stats-mongoservice

DOCKER_MONGO_NAME          = --name $(MONGO_NAME)
DOCKER_MONGO_VOLUME        = -v /var/lol-stats/mongo:/data/db
DOCKER_MONGO_PORT          = -p 27017:27017

.PHONY: image-build image-push image-run image-command image-destroy run stop command npm-update

image-build:
	@$(RM) -rf node_modules
	@$(DOCKER_BUILD) -t $(DOCKER_IMAGE) --no-cache .

image-push:
	$(DOCKER_PUSH) $(DOCKER_IMAGE)

image-destroy:
	$(DOCKER_RMI) $(DOCKER_IMAGE)

run:
	@$(DOCKER_RUN) -d $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_PORT) $(DOCKER_MONGO_LINK) $(DOCKER_IMAGE) node server.js

run-debug:
	@$(DOCKER_RUN) --rm -t -t $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_PORT) $(DOCKER_MONGO_LINK) $(DOCKER_IMAGE) node server.js

stop:
	-@$(DOCKER_STOP) $(NAME)
	-@$(DOCKER_PS) -a | grep $(DOCKER_IMAGE) | awk '{ print $$1 }' | xargs $(DOCKER_RM)

dependence-run:
	@$(DOCKER_RUN) -d $(DOCKER_MONGO_NAME) $(DOCKER_MONGO_VOLUME) $(DOCKER_MONGO_PORT) $(DOCKER_MONGO_IMAGE) mongod --smallfiles --noscripting

dependence-stop:
	-@$(DOCKER_STOP) $(MONGO_NAME)
	-@$(DOCKER_PS) -a | grep $(DOCKER_MONGO_IMAGE) | awk '{ print $$1 }' | xargs $(DOCKER_RM)

command:
	@$(DOCKER_RUN) --rm -t -i $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_PORT) $(DOCKER_MONGO_LINK)  $(DOCKER_IMAGE) /bin/sh

npm-update:
	@$(DOCKER_RUN) --rm -t -i $(DOCKER_NAME) $(DOCKER_VOLUME) $(DOCKER_IMAGE) /bin/sh -c 'npm install'

mongo-console:
	@$(DOCKER_RUN) --rm -i -t --name lol-stats-mongoservice-script $(DOCKER_MONGO_LINK) $(DOCKER_MONGO_VOLUME) $(DOCKER_MONGO_IMAGE) mongo --host lol-stats-mongoservice
