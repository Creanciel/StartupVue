#!/bin/bash

this_directory="$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)"
project_name='startupvue'
command_path="${this_directory}/cli/commands"

_help() {
  echo "Command List"
  echo "    edit|code : Open in VSCode"
  echo ""
}

_startupvue() {
  script_name=""
  command="$1"
  [ $# -gt 0 ] && shift
  case "$command" in
    edit | code )
      script_name="${command_path}/edit.sh"
      ;;
    *)
      _help
      exit 0
  esac

  [ -n "$script_name" ] || exit 1

  PROJECT_NAME="$project_name" PROJECT_ROOT="$this_directory" "$script_name" "$@"
}

_startupvue "$@"
