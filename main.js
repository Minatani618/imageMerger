const Jimp = require("jimp");

// 3つの画像ファイルのパス
const imagePaths = [
  "GACrobo展開2.png",
  "インストールリスト.png",
  "GACrobo展開用1.png",
];

// 画像を読み込む関数
const loadImage = async (path) => {
  return await Jimp.read(path);
};

// 画像を縦に連結する関数
const mergeImagesVertically = async (imagePaths) => {
  try {
    const images = [];
    for (const path of imagePaths) {
      const img = await loadImage(path);
      images.push(img);
    }

    const maxWidth = Math.max(...images.map((img) => img.getWidth()));
    const totalHeight = images.reduce((acc, img) => acc + img.getHeight(), 0);

    // 新しい画像を作成
    const mergedImage = new Jimp(maxWidth, totalHeight);

    // 画像を縦に配置
    let yPos = 0;
    for (const img of images) {
      mergedImage.composite(img, 0, yPos);
      yPos += img.getHeight();
    }

    // 保存
    mergedImage.write("merged_image.png", () => {
      console.log("画像が正常に連結されました。");
    });
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
};

// 画像を縦に連結する関数を呼び出す
mergeImagesVertically(imagePaths);
