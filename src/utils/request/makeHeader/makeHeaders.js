import { md5 } from './md5'

const currentStamp = () => new Date() * 1

export const X_TOKEN = 'X-TOKEN'
export const X_AUTH = 'X-AUTH'

export function create_x_auth_sign ({ stamp, secret_key }) {
  return md5([ stamp, stamp ].join(':'), secret_key).toString()
}

export function create_x_token_sign ({ token, stamp, secret_key }) {
  return md5([ token, stamp, stamp ].join(':'), secret_key).toString()
}

export function make_api_headers ({ cmd, auth_type, access_key, secret_key, access_token }) {
  const stamp = currentStamp()
  let headers = {
    'X-APP-KEY': access_key,
    'X-MSG-ID': [ stamp, stamp ].join(','),
    'X-CMD': `youke.${cmd}`,
  }

  // console.debug('headers,', headers)

  if (auth_type === X_AUTH) {
    headers[ auth_type ] = create_x_auth_sign({ stamp, secret_key })
  }
  else if (auth_type === X_TOKEN) {
    let token_sign = create_x_token_sign({ token: access_token, stamp, secret_key })
    headers[ auth_type ] = [ access_token, token_sign ].join(',')
  }
  return headers
}
