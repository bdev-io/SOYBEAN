cat package.json | grep -m 1 version | sed 's/[^0-9.]//g'
