const module = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/global.scss";`
      },
      scss: {
        prependData: `@import "@/styles/global.scss";`
      }
    }
  }
};

export { module };