import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class CategoriaService extends Api {
  constructor () {
    super('/categorias')
  }
}