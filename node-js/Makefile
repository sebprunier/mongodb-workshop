JSHINT="node_modules/jshint/bin/jshint"
YUIDOC="node_modules/yuidocjs/lib/cli.js"
ISTANBUL="node_modules/istanbul/lib/cli.js"
MOCHA="node_modules/mocha/bin/mocha"
_MOCHA="node_modules/mocha/bin/_mocha"

UNIT_TESTS_FILES="test/**/*.test.js"

clean:
	rm -rf reports

jshint:
	$(JSHINT) src test --show-non-errors || exit 0

checkstyle:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(JSHINT) src test --reporter=checkstyle > reports/checkstyle.xml || exit 0

test:
	$(MOCHA) $(UNIT_TESTS_FILES) --reporter spec

xunit:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(MOCHA) $(UNIT_TESTS_FILES) --reporter xunit > reports/TESTS-xunit.xml

coverage:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(ISTANBUL) cover --report cobertura --report lcov --dir ./reports $(_MOCHA) -- $(UNIT_TESTS_FILES)

doc:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(YUIDOC) src -o reports/docs

sonar:
	@# add the sonar sonar-runner executable to the PATH and run it
	./tools/sonar-runner-2.4/bin/sonar-runner

all: clean jshint test doc

ci: clean checkstyle xunit coverage doc sonar

.PHONY: clean test xunit coverage jshint checkstyle doc all ci sonar