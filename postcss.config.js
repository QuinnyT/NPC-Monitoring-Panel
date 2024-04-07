export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 192, // 设计稿宽度的1/10（基础分辨率 1920 * 1080）
      propList: ["*"]
    }
  },
}
