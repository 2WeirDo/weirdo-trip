// 根据当前模块的URL和提供的图像路径，获取图像的完整URL。
// 它使用当前模块的URL作为基本URL，然后将image作为相对路径，通过构造URL对象来获取完整的URL。
// 最后，函数将完整的URL作为结果返回。
export const getAssetURL = (image) => {
    return new URL(`../assets/img/${image}`, import.meta.url).href
}

