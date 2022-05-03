import picgo from 'picgo'

export = (ctx: picgo) => {
  const register = () => {
    ctx.helper.uploader.register('local-uploader', {
      handle (ctx) {
        console.log(ctx)
      }
    })
  }
  return {
    uploader: 'local-uploader',
    register
  }
}
