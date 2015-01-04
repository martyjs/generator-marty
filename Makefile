BIN = ./node_modules/.bin

.PHONY: bootstrap release test;

SRC = $(shell find ./app ./domain ./test -type f -name '*.js')

test:
	@$(BIN)/mocha

bootstrap: package.json
	@npm install

release: test
	@npm version patch
	@git push origin master && git push --tags
	@npm publish