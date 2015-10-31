.PHONY: image-build image-push image-run image-command image-destroy run stop command npm-update

run:
	cd mongoservice; make run
	cd webservice; make run
	cd webapp; make run

stop:
	cd mongoservice; make stop
	cd webservice; make stop
	cd webapp; make stop