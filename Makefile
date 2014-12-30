BIN = ./node_modules/.bin

.PHONY: bootstrap release lint test;

SRC = $(shell find ./app ./domain ./test -type f -name '*.js')

test: lint
	@$(BIN)/mocha

bootstrap: package.json
	@npm install

lint: bootstrap
	# @$(BIN)/jscs $(SRC);
	# @$(BIN)/jshint $(SRC);

release: test build
	@npm version patch
	@git push origin master && git push --tags
	@npm publish