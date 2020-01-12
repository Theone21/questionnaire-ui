let path = require('path');
let console = require('console');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {

        config.plugin("define").tap(args => {
            args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });

        config.resolve.alias
            .set('@', resolve('src'))
    },
    devServer: {
        open: true,
        port: 8081
    }
};
