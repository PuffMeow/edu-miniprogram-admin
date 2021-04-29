const config = {
  production: '',
  develement: 'https://zhtc.mynatapp.cc'
}

export const BASE_URL = process.env.NODE_ENV === 'product' ? config.production : config.develement
