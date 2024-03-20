module.exports = {
  source: {
      include: ["src", "bin", "test"],
      exclude: ["node_modules"],
      includePattern: ".+\\.js(doc|x)?$",
      excludePattern: "(^|\\/|\\\\)_"
  },
  plugins: ["plugins/markdown"],
  templates: {
      cleverLinks: false,
      monospaceLinks: false,
      default: {
      outputSourceFiles: true,
      includeDate: false
      }
  },
  opts: {
      recurse: true,
      destination: "./docs",
      encoding: "utf8",
      template: "templates/default",
  }
};