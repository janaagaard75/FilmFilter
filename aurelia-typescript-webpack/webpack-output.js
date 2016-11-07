{
    "metadata": {
        "port": 9000,
        "host": "localhost",
        "ENV": "development",
        "HMR": false,
        "title": "Aurelia Navigation Skeleton",
        "baseUrl": "/",
        "root": "/Users/janaagaard/Projects/FilmFilter/aurelia-typescript-webpack",
        "src": "src",
        "extractTextInstances": {}
    },
    "entry": {
        "app": [],
        "aurelia-bootstrap": [
            "aurelia-bootstrapper-webpack",
            "aurelia-polyfills",
            "aurelia-pal",
            "aurelia-pal-browser",
            "regenerator-runtime",
            "bluebird"
        ],
        "aurelia": [
            "aurelia-binding",
            "aurelia-dependency-injection",
            "aurelia-event-aggregator",
            "aurelia-framework",
            "aurelia-history",
            "aurelia-history-browser",
            "aurelia-loader",
            "aurelia-loader-webpack",
            "aurelia-logging",
            "aurelia-logging-console",
            "aurelia-metadata",
            "aurelia-path",
            "aurelia-route-recognizer",
            "aurelia-router",
            "aurelia-task-queue",
            "aurelia-templating",
            "aurelia-templating-binding",
            "aurelia-templating-router",
            "aurelia-templating-resources"
        ]
    },
    "output": {
        "path": "dist",
        "filename": "[name].bundle.js",
        "sourceMapFilename": "[name].bundle.map",
        "chunkFilename": "[id].chunk.js"
    },
    "devtool": "cheap-module-inline-source-map",
    "devServer": {
        "port": 9000,
        "host": "localhost",
        "historyApiFallback": true,
        "watchOptions": {
            "aggregateTimeout": 300,
            "poll": 1000
        },
        "outputPath": "dist"
    },
    "plugins": [
        {
            "chunkNames": [
                "aurelia",
                "aurelia-bootstrap"
            ],
            "ident": "node_modules/webpack/lib/optimize/CommonsChunkPlugin.js0"
        },
        {
            "options": {
                "template": "index.html",
                "filename": "index.html",
                "hash": false,
                "inject": true,
                "compile": true,
                "favicon": false,
                "cache": true,
                "showErrors": true,
                "chunks": "all",
                "excludeChunks": [],
                "title": "Webpack App",
                "xhtml": false,
                "chunksSortMode": "dependency",
                "metadata": {
                    "port": 9000,
                    "host": "localhost",
                    "ENV": "development",
                    "HMR": false,
                    "title": "Aurelia Navigation Skeleton",
                    "baseUrl": "/",
                    "root": "/Users/janaagaard/Projects/FilmFilter/aurelia-typescript-webpack",
                    "src": "src",
                    "extractTextInstances": {}
                }
            }
        },
        {
            "definitions": {
                "regeneratorRuntime": "regenerator-runtime"
            }
        },
        {
            "definitions": {
                "$": "jquery",
                "jQuery": "jquery",
                "window.jQuery": "jquery"
            }
        },
        {
            "definitions": {
                "Promise": "bluebird"
            }
        },
        {
            "filename": "styles.css",
            "id": 1,
            "options": {
                "allChunks": true,
                "sourceMap": false
            }
        },
        {
            "options": {
                "root": "/Users/janaagaard/Projects/FilmFilter/aurelia-typescript-webpack",
                "src": "src",
                "title": "Aurelia Navigation Skeleton",
                "baseUrl": "/",
                "nameExternalModules": true,
                "nameLocalModules": true,
                "resourceRegExp": {},
                "customViewLoaders": {
                    ".css": [
                        "css"
                    ],
                    ".scss": [
                        "css",
                        "sass"
                    ],
                    ".less": [
                        "css",
                        "less"
                    ],
                    ".styl": [
                        "css",
                        "stylus"
                    ]
                }
            }
        },
        {
            "definitions": {
                "__DEV__": true,
                "ENV": "\"development\"",
                "HMR": false,
                "process.env": {
                    "ENV": "\"development\"",
                    "NODE_ENV": "\"development\"",
                    "HMR": false,
                    "WEBPACK_HOST": "\"localhost\"",
                    "WEBPACK_PORT": "9000"
                }
            }
        }
    ],
    "resolve": {
        "modules": [
            "src",
            "node_modules"
        ],
        "extensions": [
            ".ts",
            ".js"
        ]
    },
    "module": {
        "rules": [
            {
                "test": /\.ts$/,
                "loader": "awesome-typescript-loader",
                "exclude": [
                    "/node_modules"
                ]
            },
            {
                "test": /\.html$/,
                "loader": "html-loader",
                "exclude": [
                    "index.html"
                ]
            },
            {
                "test": {},
                "loaders": "node_modules/extract-text-webpack-plugin/loader.js?{\"id\":1,\"omit\":0,\"remove\":true,\"notExtractLoader\":\"style\"}!css"
            },
            {
                "test": {},
                "loader": "url-loader",
                "query": {
                    "limit": 8192
                }
            },
            {
                "test": {},
                "loader": "url-loader",
                "query": {
                    "limit": 10000,
                    "mimetype": "application/font-woff2"
                }
            },
            {
                "test": {},
                "loader": "url-loader",
                "query": {
                    "limit": 10000,
                    "mimetype": "application/font-woff"
                }
            },
            {
                "test": {},
                "loader": "file-loader"
            },
            {
                "test": {},
                "loader": "expose?Promise"
            },
            {
                "test": "node_modules/jquery/dist/jquery.js",
                "loader": "expose?$!expose?jQuery"
            }
        ]
    }
}