import picgo from 'picgo'
import fs from 'fs'

interface ILocalUploaderConfig {
  root: string
  server: string
}

export = (ctx: picgo) => {
  const config = (ctx: picgo) => {
    let userConfig = ctx.getConfig<ILocalUploaderConfig>('picBed.local-uploader') || {
      root: '',
      server: ''
    };
    return [
      {
        name: 'root',
        type: 'input',
        alias: '根目录',
        default: userConfig.root,
        message: 'C:\\Users\\Public\\Images',
        required: true
      },
      {
        name: 'server',
        type: 'input',
        required: true,
        default: userConfig.server,
        message: 'https://example.com',
        alias: '服务器'
      }
    ]
  }

  const handle = async (ctx: picgo) => {
    let userConfig = ctx.getConfig<ILocalUploaderConfig>('picBed.local-uploader');
    let date = new Date();
    let relativePath = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
    let path = `${userConfig.root}/${relativePath}`;
    fs.mkdirSync(path, { recursive: true });
    ctx.output.forEach(output => {
      output.url = `${relativePath}/${output.fileName}`;
      output.imgUrl = `${userConfig.server}/${output.url}`;
      fs.writeFileSync(`${path}/${output.fileName}`, output.buffer);
    });
    return ctx;
  }

  const register = () => {
    ctx.helper.uploader.register('local-uploader', {
      config,
      handle,
      name: '本地上传'
    })
  }
  
  return {
    uploader: 'local-uploader',
    register
  }
}
