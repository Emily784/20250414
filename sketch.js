let iframe; // 用於嵌入網頁的 iframe
let clouds = []; // 儲存雲朵的資料
let subMenuButtons = []; // 儲存子選單按鈕

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 初始化雲朵
  for (let i = 0; i < 30; i++) {
    clouds.push({
      x: random(width), // 雲朵的初始 x 座標
      y: random(height), // 雲朵的初始 y 座標（分布在整個視窗）
      size: random(50, 150), // 雲朵的大小
      speed: random(0.5, 2), // 雲朵的移動速度
      curve: random(5, 15), // 雲朵的彎曲程度
    });
  }

  // 動態生成主選單按鈕
  createMenuButton("自我介紹", "https://emily784.github.io/20250324-2/", 10);
  createHoverMenuButton("作品集", 110, [
    { label: "作品一", url: "https://emily784.github.io/20250303-2/" },
    { label: "作品二", url: "https://emily784.github.io/20250317-1/" },
    { label: "作品三", url: "https://emily784.github.io/20250324-6/" },
  ]);
  createMenuButton("測驗卷", "https://emily784.github.io/20250310/", 190); // 調整位置
  createMenuButton("教學影片", "https://www.youtube.com/embed/oJk8I1QujN0", 270);
  createHoverMenuButton("筆記", 370, [
    { label: "作品一", url: "https://hackmd.io/@yayun/r1JyfcL01e" }, // 嵌入的目標 URL
    { label: "作品二", url: "https://hackmd.io/@yayun/ryRyBoI01l" },
    { label: "作品三", url: "https://hackmd.io/@yayun/BySGKjIRJg" }, // 更新作品三選項的 URL
    { label: "測驗卷", url: "https://hackmd.io/@yayun/HkKYyiUAke" }, // 測驗卷選項
    { label: "期中作品", url: "https://hackmd.io/@yayun/Hk7nynICkg" }, // 期中作品選項
  ]);

  // 新增背景按鈕
  createBackgroundButton();
}

function createMenuButton(label, url, xPosition) {
  let button = createButton(label);
  button.position(xPosition, 10);
  button.style("font-size", "20px");
  button.style("background-color", "#fb8500"); // 設定按鈕背景顏色
  button.style("color", "#ffffff"); // 設定文字顏色
  button.mousePressed(() => {
    if (label === "自我介紹") {
      // 如果按下的是「自我介紹」，顯示文字框
      if (iframe) iframe.remove(); // 移除現有的 iframe
      iframe = createDiv("大家好，我是蔡雅雲，我平常喜歡追劇、吃美食和睡覺，最喜歡的顏色為藍色，特別喜歡吃抹茶相關食物，例如:抹茶冰淇淋");
      iframe.style("font-size", "20px");
      iframe.style("color", "#ffffff");
      iframe.style("background-color", "#007BFF"); // 設定文字框背景顏色為藍色
      iframe.style("padding", "20px");
      iframe.style("border-radius", "10px");
      iframe.style("text-align", "center");
      iframe.style("width", "400px");
      iframe.style("height", "auto");
      iframe.style("overflow", "hidden"); // 確保文字不會超出框
      iframe.position((windowWidth - 400) / 2, (windowHeight - 200) / 2); // 將文字框置於螢幕中央
    } else {
      // 如果按下的是其他選單，顯示 iframe
      if (iframe) iframe.remove(); // 移除現有的 iframe
      iframe = createElement("iframe");
      iframe.attribute("src", url);

      // 設定 iframe 的大小為較大的視窗
      let iframeWidth = 1000; // 增加寬度
      let iframeHeight = 600;

      // 設定 iframe 的位置為視窗正中央
      iframe.position((windowWidth - iframeWidth) / 2, (windowHeight - iframeHeight) / 2);
      iframe.size(iframeWidth, iframeHeight);
      iframe.style("border", "none");
    }
  });
}

function createHoverMenuButton(label, xPosition, subItems) {
  let button = createButton(label);
  button.position(xPosition, 10);
  button.style("font-size", "20px");
  button.style("background-color", "#fb8500"); // 設定按鈕背景顏色
  button.style("color", "#ffffff"); // 設定文字顏色

  let isMouseOverMenu = false; // 用於追蹤滑鼠是否在主按鈕或子選單上

  // 當滑鼠移到主按鈕時顯示子選單
  button.mouseOver(() => {
    isMouseOverMenu = true;
    hideSubMenu(); // 隱藏其他子選單
    let yOffset = 40; // 子按鈕的垂直偏移
    subItems.forEach((item, index) => {
      let subButton = createButton(item.label);
      subButton.position(xPosition, 10 + yOffset * (index + 1));
      subButton.style("font-size", "16px");
      subButton.style("background-color", "#fb8500"); // 設定子按鈕背景顏色
      subButton.style("color", "#ffffff"); // 設定子按鈕文字顏色
      subButton.mousePressed(() => {
        if (iframe) iframe.remove(); // 移除現有的 iframe
        iframe = createElement("iframe");
        iframe.attribute("src", item.url);

        // 設定 iframe 的大小為較大的視窗
        let iframeWidth = 1000; // 增加寬度
        let iframeHeight = 600;

        // 設定 iframe 的位置為視窗正中央
        iframe.position((windowWidth - iframeWidth) / 2, (windowHeight - iframeHeight) / 2);
        iframe.size(iframeWidth, iframeHeight);
        iframe.style("border", "none");
      });

      // 當滑鼠移到子按鈕時，保持子選單顯示
      subButton.mouseOver(() => {
        isMouseOverMenu = true;
      });

      // 當滑鼠移出子按鈕時，檢查是否需要隱藏子選單
      subButton.mouseOut(() => {
        isMouseOverMenu = false;
        setTimeout(() => {
          if (!isMouseOverMenu) hideSubMenu();
        }, 300);
      });

      subMenuButtons.push(subButton); // 將子按鈕加入子選單陣列
    });
  });

  // 當滑鼠移出主按鈕時，檢查是否需要隱藏子選單
  button.mouseOut(() => {
    isMouseOverMenu = false;
    setTimeout(() => {
      if (!isMouseOverMenu) hideSubMenu();
    }, 300);
  });
}

function createBackgroundButton() {
  let button = createButton("背景");
  button.position(10, 50); // 設定按鈕位置
  button.style("font-size", "20px");
  button.style("background-color", "#fb8500"); // 設定按鈕背景顏色
  button.style("color", "#ffffff"); // 設定文字顏色
  button.mousePressed(() => {
    if (iframe) {
      iframe.remove(); // 移除現有的 iframe
      iframe = null; // 清空 iframe 變數
    }
  });
}

function hideSubMenu() {
  subMenuButtons.forEach((btn) => btn.remove()); // 移除所有子按鈕
  subMenuButtons = []; // 清空子選單陣列
}

function mouseMoved() {
  // 當滑鼠移動時，新增一個雲朵
  clouds.push({
    x: mouseX, // 雲朵的 x 座標為滑鼠的 x 座標
    y: mouseY, // 雲朵的 y 座標為滑鼠的 y 座標
    size: random(50, 150), // 雲朵的大小
    speed: random(0.5, 2), // 雲朵的移動速度
    curve: random(5, 15), // 雲朵的彎曲程度
  });

  // 限制雲朵的數量，避免過多
  if (clouds.length > 100) {
    clouds.shift(); // 移除最早的雲朵
  }
}

function draw() {
  background("#bbd0ff");

  // 繪製並移動雲朵
  noStroke();
  fill(255, 255, 255, 200); // 雲朵顏色（白色，帶透明度）
  for (let cloud of clouds) {
    beginShape();
    for (let i = -2; i <= 12; i++) { // 增加控制點範圍，讓雲朵更圓滑
      let offsetX = cloud.x + (i * cloud.size) / 10;
      let offsetY = cloud.y + sin(i * 0.5) * cloud.curve; // 使用正弦函數讓雲朵彎曲
      curveVertex(offsetX, offsetY);
    }
    endShape(CLOSE);

    cloud.x += cloud.speed; // 雲朵向右移動
    if (cloud.x - cloud.size / 2 > width) {
      // 如果雲朵超出畫布右側，從左側重新出現
      cloud.x = -cloud.size / 2;
      cloud.y = random(height); // 隨機新的 y 座標（分布在整個視窗）
    }
  }
}
