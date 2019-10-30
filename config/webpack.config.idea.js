const rootFolder = path.resolve(__dirname, '..');

module.exports = {
  resolve: {
    alias: {
      api: path.resolve(rootFolder, 'src/api'),
      client: path.resolve(rootFolder, 'src/client'),
      routes: path.resolve(rootFolder, 'src/routes'),
      actions: path.resolve(rootFolder, 'src/actions'),
      helpers: path.resolve(rootFolder, 'src/helpers'),
      reducers: path.resolve(rootFolder, 'src/reducers'),
      constants: path.resolve(rootFolder, 'src/constants'),
      components: path.resolve(rootFolder, 'src/components'),

      scss: path.resolve(rootFolder, 'src/scss'),
      images: path.resolve(rootFolder, 'src/images'),
      vars: path.resolve(rootFolder, 'src/scss/', '_vars.scss'),
      mixins: path.resolve(rootFolder, 'src/scss/', '_mixins.scss'),
    }
  }
};
