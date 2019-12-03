import * as webpack from "webpack";
import * as path from "path";

const rules: webpack.Rule[] = [
    {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "ts-loader"
            }
        ]
    },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    }
];

const webpackModule: webpack.Module = {
    rules: rules
};

const config: webpack.Configuration = {
    mode: "production",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    entry: {
        index: "./src/index.tsx",
        booklist: "./src/book-list.tsx",
        quizplayer: "./src/quiz-player.tsx",
        editbook: "./src/edit-book.tsx"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(process.cwd() + "/dist")
    },

    module: webpackModule,

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "ncmb": "NCMB"
    }
};

export default config;
