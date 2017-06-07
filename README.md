## Masterlash site.
### Installation:
* yarn install
* yarn build
* yarn compose
* go on http:/localhost:3100/
* to run for development: yarn watch

### Deployment:
* on local: docker save masterlash > masterlash.tar;
* on remote: docker load -i masterlash.tar;
* setup remote nginx with: proxy_pass http://localhost:3100 and other important nginx configs;
* run dev mode: docker run masterlash dev;
* run prod mode: docker run masterlash prod;

