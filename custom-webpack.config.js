import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export default {
  experiments: {
    topLevelAwait: true
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url/"),
      qs: require.resolve("qs/"),
      assert: false,
      util: false,
      net: false,
      tls: false,
    }
  }
}
