/**
 * Created by folgerfan on 2018/11/13.
 */
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:"development",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};