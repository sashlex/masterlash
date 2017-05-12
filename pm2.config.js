module.exports = {
   apps : [
      {
         name: 'masterlash',
         script: 'dist/server.js',
         watch: [
            "dist"
         ],
         ignore_watch : [
            "dist/node_modules"
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
