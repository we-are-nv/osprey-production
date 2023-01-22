#!/bin/bash
echo "GIT"
echo "setting git stuff"
eval $(ssh-agent -s)
ssh-add ~/.ssh/github