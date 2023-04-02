#!/bin/bash
run() {
	docker run -d \
--name node-app-again \

-v ./src:/app/src:ro \
--label-file ./labelfile \
--restart unless-stopped \
--env-file ./.env \
--cpus 1.0 \
--memory 4gb \
--workdir /app \
.

echo "Deploying the container"

}


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

				echo "cancelled" &&
        exit 1
        ;;
      *) # Anything else (including a blank) is invalid.
        ;;
    esac
  done

}




echo "Building container from dockerfile"
echo "Path = '.' | args = "NODE_ENV: development" "


echo "Starting docker run script"
echo "This will run the container with the following conditions:"
echo "Container: 'node-app'"
echo "restart: unless-stopped"
echo "command: npm run dev"
echo "label file: ./labelfile"
echo "attach to network: traefik-proxy"
echo "volumes: ./src:/app/src:ro - read only"
echo "resource limits: cpus - 1.0, memory - 4gb"

confirm

docker build . && sleep 1

echo "Starting docker run script"
echo "This will run the container with the following conditions:"
echo "Container: 'node-app'"
echo "restart: unless-stopped"
echo "command: npm run dev"
echo "label file: ./labelfile"
echo "attach to network: traefik-proxy"
echo "volumes: ./src:/app/src:ro - read only"
echo "resource limits: cpus - 1.0, memory - 4gb"

confirm \
&& \
run

confirm "Would you like to attach to the network 'traefik-proxy' ?" \
&& \
sleep 1

echo "Connecting to network"

docker network connect traefik-proxy node-app-again



