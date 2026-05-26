#!/usr/bin/env sh
##############################################################################
##
##  Gradle start up script for UN*X
##
##############################################################################

set -e

# Determine the physical location of the script.
PRG="$0"
while [ -h "$PRG" ]; do
  ls=$(ls -ld "$PRG")
  link=$(expr "$ls" : '.*-> \(.*\)$')
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG="$(dirname "$PRG")/$link"
  fi
done

SAVED="$(pwd)"
cd "$(dirname "$PRG")"
PRG="$(pwd -P)/$(basename "$PRG")"
cd "$SAVED"

APP_HOME="$(dirname "$PRG")"
GRADLE_HOME=""
APP_NAME="Gradle"
APP_BASE_NAME="$(basename "$PRG")"

# Determine Java command to use.
if [ -n "$JAVA_HOME" ] && [ -x "$JAVA_HOME/bin/java" ]; then
  JAVA_CMD="$JAVA_HOME/bin/java"
else
  JAVA_CMD="java"
fi

CLASSPATH="$APP_HOME/gradle/wrapper/gradle-wrapper.jar"

exec "$JAVA_CMD" -classpath "$CLASSPATH" org.gradle.wrapper.GradleWrapperMain "$@"
