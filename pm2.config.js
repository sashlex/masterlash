module.exports = {
   apps : [
      {
         name: 'masterlash',
         script: 'www/server.js',
         watch: [
            "www"
         ],
         ignore_watch : [
            "www/node_modules"
         ],
         watch_options: {
            followSymlinks: false
         },
         env: {
            NODE_ENV: 'development'
         },
         env_production : {
            NODE_ENV: 'production'
         }
      },
   ]
};
