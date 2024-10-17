# Doc Editor

## Issues with CodeSandbox (solved)

Issue 1: mockServiceWorker.js is not running

* CodeSandbox has renamed their service worker file, so we need to change the `"/sandbox-service-worker.js"` to `"/csb-sw.js"` in order to use our own mockServiceWorker.js.

Issue 2: `TypeError: response2.headers.all is not a function`

* `msw@1.2.1` use headers-polyfill but vite deps and pnpm use `headers-polyfill@3.3.0` which no longer support .all(). ref: [https://github.com/mswjs/msw/discussions/1884](https://github.com/mswjs/msw/discussions/1884)
* So we need to force the program to use the old `headers-polyfill@3.2.5`.
* Add the following in `package.json` file

  ```
    "pnpm": {
      "overrides": {
        "headers-polyfill": "3.2.5"
      }
    }
  ```

* run the following

  ```
  pnpm store prune
  rm -rf node_modules
  rm pnpm-lock.yaml
  pnpm install
  ```
