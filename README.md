## Masterlash site.
### Installation:
* yarn install
* yarn build
* build container: yarn dcb
* up container: yarn dcu
* go on http:/localhost:3100/
* run for development: yarn watch
* clean dist directory: yarn wash

### Deployment:
* on local: docker save masterlash > masterlash.tar
* upload image on remote server, for example with rsync
* on remote: docker load -i masterlash.tar
* setup remote nginx with: proxy_pass http://localhost:3100 and other important nginx configs
* run dev mode: docker run -dp 3100:3100 --restart=always masterlash dev
* run prod mode: docker run -dp 3100:3100 --restart=always masterlash prod

