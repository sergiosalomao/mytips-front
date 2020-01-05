import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class TipService extends Api {
  constructor () {
    super('/tips')
  }
}