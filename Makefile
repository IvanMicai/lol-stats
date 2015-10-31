.PHONY: build run stop

credentials-apikey:
	@echo "/**"                  > webservice/config/credentials.js
	@echo " *  Credentials"     >> webservice/config/credentials.js
	@echo " */"                 >> webservice/config/credentials.js
	@echo ""                    >> webservice/config/credentials.js
	@echo "module.exports = {"  >> webservice/config/credentials.js
	@echo "	apiKey: '"$(key)"'" >> webservice/config/credentials.js
	@echo "}"                   >> webservice/config/credentials.js

build:
	cd webservice; make npm-update
	cd webapp; make npm-update; make bower-update

run:
	cd mongoservice; make run
	cd webservice; make run
	cd webapp; make run

stop:
	cd mongoservice; make stop
	cd webservice; make stop
	cd webapp; make stop