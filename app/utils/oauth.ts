
function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/auth'
  const options = {
    redirect_uri: 'http://localhost:3000/redirect',
    client_id: '1093787396713-g4mt6s0ful8afc380audvnsfs23pa5tq.apps.googleusercontent.com',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}

export const openGoogleLoginWindow = () => {
  window.open(getGoogleOAuthURL(), '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
}
