// eslint-disable-next-line import/no-unresolved
import wretch, { FetchLike, WretchOptions, WretchResponse } from "wretch"
// eslint-disable-next-line import/no-unresolved
import { RetryOptions, retry } from "wretch/middlewares"

const basicWretchOptions = (): WretchOptions => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  }
}

const defaultRetryOptions: RetryOptions = {
  delayTimer: 500,
  delayRamp: (delay, nbOfAttempts) => delay * nbOfAttempts,
  maxAttempts: 5,
  until: (response) => {
    if (response) {
      if (response.ok || (response.status >= 400 && response.status <= 500)) {
        return true
      }
    }
    return false
  },
  retryOnNetworkError: true,
  resolveWithLatestResponse: false,
}

const responseInterceptorMiddleware =
  (next: FetchLike) =>
  async (url: string, opts: WretchOptions): Promise<WretchResponse> => {
    const response = await next(url, opts)
    return response
  }

export const $interceptedApi = (url: string) =>
  wretch(url, basicWretchOptions()).middlewares([
    responseInterceptorMiddleware,
    retry(defaultRetryOptions),
  ])
