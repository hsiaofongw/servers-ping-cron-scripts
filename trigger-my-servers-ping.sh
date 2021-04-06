#!/bin/bash

curl -v --request POST \
--url 'https://servers-ping.vercel.app/api/cron' \
--header 'Authorization: ' \
--header 'User-Agent: Linux, CloudCone' | jq

