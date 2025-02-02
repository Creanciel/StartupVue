#!/bin/bash -e

this_directory="$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)"
frontend_directory="$this_directory/../../apps/frontend"

build_storybook() {
  cd "$frontend_directory"

  npm install --quiet

  npm run build-storybook
}

_help() {
  echo 'Command List'
  echo '    build_storybook'
  echo ''
}

_ci() {
  command="$1"
  [ $# -gt 0 ] && shift
  case "$command" in
    build_storybook )
      build_storybook
      ;;
    *)
      _help
      exit 0
  esac
}

_ci $@
