import BackendInstance from './instance'

const MintNft = async(body: any) => {
  try {
    const data = await BackendInstance.post('/mint', body)
    console.log(data)
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export {
  MintNft
}