#!/bin/bash

confirm() {


  local _prompt _default _response

  if [ "$1" ]; then _prompt="$1"; else _prompt="Are you sure"; fi
  _prompt="$_prompt [y/n] ?"

  # Loop forever until the user enters a valid response (Y/N or Yes/No).
  while true; do
    read -r -p "$_prompt " _response
    case "$_response" in
      [Yy][Ee][Ss]|[Yy]) # Yes or Y (case-insensitive).
				echo "continuing"
				sleep 2
        return 0
        ;;
      [Nn][Oo]|[Nn])  # No or N.

				echo "cancelled" && \
        exit 1
        ;;
      *) # Anything else (including a blank) is invalid.
        ;;
    esac
  done

}




echo "Building container from dockerfile"
echo "Path = '.' | args = "NODE_ENV: development" "

confirm \
&& \
docker build \
--file ./Dockerfile \
--tag node-app:latest \
.

sleep 1

bash ./run-node.sh



