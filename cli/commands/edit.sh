#!/bin/bash

this_directory="$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)"

_select_editor() {
  # VSCode
  if command -v code > /dev/null; then
    vscode_available=true
  else
    vscode_available=false
  fi

  # Custom Editor
  if [ -n "$CR_EDITOR" ] && command -v "$CR_EDITOR" > /dev/null; then
    creditor_available=true
  else
    creditor_available=false
  fi

  if "$creditor_available"; then
    echo "$CR_EDITOR"
    return 0
  elif "$vscode_available"; then
    echo 'code'
    return 0
  else
    return 1
  fi
}

_edit() {
  editor="$(_select_editor)"

  if [ $? -ne 0 ]; then
    echo 'Editor not found. '
    echo 'Install VSCode or set the variable '\''CR_EDITOR'\''.' >&2
    exit 1
  fi

  if [ "$editor" = "code" ]; then
    project_name_string="$(echo "$PROJECT_NAME" | sed 's/.*/\L&/')"
    code_workspace="$this_directory/../../$project_name_string.code-workspace"
    "$editor" "$code_workspace"
  else
    "$editor" "$this_directory"
  fi
}

_edit $@
